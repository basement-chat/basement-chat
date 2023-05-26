import type { AlpineComponent } from 'alpinejs'
import Push from 'push.js'
import { delegate, type Instance } from 'tippy.js'
import NotificationStatus from '../enums/notification-status'
import type { ChatBoxComponent } from '../types/components'
import type { PushNotificationEvent } from '../types/events'

export default (): AlpineComponent<ChatBoxComponent> => ({
  isMinimized: true,
  isContactOpened: true,
  isMessageBoxOpened: false,
  isNotificationAllowed: window.localStorage.getItem('basement.notification') === NotificationStatus.Allowed,
  hasNotificationPermission: Push.Permission.has(),
  online: true,
  totalUnreadMessages: 0,

  /**
   * Hook during the initialization phase of the current Alpine component.
   */
  init(): void {
    void window.axios.get('/sanctum/csrf-cookie')

    window.addEventListener('online', (): void => {
      this.online = true
    })

    window.addEventListener('offline', (): void => {
      this.online = false
    })

    this.$watch('isNotificationAllowed', this.watchNotificationStatus.bind(this))
    this.$el.addEventListener('send-push-notification', this.sendPushNotification.bind(this))

    this.registerTippy()
  },

  /**
   * Request push notification permission to the browser.
   */
  requestNotificationPermission(): void {
    Push.Permission.request((): void => {
      this.isNotificationAllowed = true
      this.hasNotificationPermission = true
    }, (): void => {
      this.hasNotificationPermission = false
    })
  },

  /**
   * Send push notification permission to the browser if allowed.
   */
  sendPushNotification(event: CustomEvent<PushNotificationEvent>): void {
    if (this.isNotificationAllowed === false) {
      return
    }

    void Push.create(event.detail.title, {
      body: event.detail.body,
      icon: event.detail.icon,
      timeout: 4000,
      onClick(this: Notification): void {
        window.focus()
        this.close()
      },
    })
  },

  /**
   * Register tippy.js instance creation for child elements.
   */
  registerTippy(): void {
    delegate(this.$el, {
      animation: 'fade',
      arrow: true,
      target: '.basement [data-title]',
      onShow(instance: Instance): void {
        const title: string | null = instance.reference.getAttribute('data-title')

        if (title !== null) {
          instance.setContent(title)
        }
      },
    })
  },

  /**
   * Watch when the notification status changes.
   */
  watchNotificationStatus(newValue: boolean): void {
    const status: NotificationStatus = newValue === true ? NotificationStatus.Allowed
      : NotificationStatus.Muted

    window.localStorage.setItem('basement.notification', status)
  },
})
