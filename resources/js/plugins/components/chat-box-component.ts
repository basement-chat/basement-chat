import Push from 'push.js'
import NotificationStatus from '../enums/notification-status'
import type * as Alpine from '../types/alpine'
import type { ChatBoxComponent, ChatBoxComponentData } from '../types/components'
import type { PushNotificationEvent } from '../types/events'

export default (): Alpine.Component & ChatBoxComponent => ({
  isMinimized: true,
  isContactOpened: true,
  isMessageBoxOpened: false,
  isNotificationAllowed: window.localStorage.getItem('basement.notification') === NotificationStatus.Allowed,
  hasNotificationPermission: Push.Permission.has(),
  online: true,

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
    });

    (this.$watch as Alpine.Watch<ChatBoxComponentData>)('isNotificationAllowed', (val: boolean): void => {
      const status: NotificationStatus = val === true ? NotificationStatus.Allowed
        : NotificationStatus.Muted

      window.localStorage.setItem('basement.notification', status)
    });

    (this.$el as Alpine.Element).addEventListener('send-push-notification', this.sendPushNotification.bind(this))
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
})
