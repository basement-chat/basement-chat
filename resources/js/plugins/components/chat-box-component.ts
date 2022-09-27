import { AlpineComponent } from 'alpinejs'
import axios from 'axios'
import Push from 'push.js'
import NotificationStatus from '../enums/notification-status'
import { PushNotificationEvent } from '../types/event'

interface ComponentData {
  isMinimized: boolean
  isContactOpened: boolean
  isMessageBoxOpened: boolean
  isNotificationAllowed: boolean
  hasNotificationPermission: boolean
  online: boolean
}

class ChatBoxComponent extends AlpineComponent<ComponentData> implements ComponentData {
  public isMinimized = true

  public isContactOpened = true

  public isMessageBoxOpened = false

  public isNotificationAllowed = (
    window.localStorage.getItem('basement.notification') === NotificationStatus.Allowed
  )

  public hasNotificationPermission = Push.Permission.has()

  public online = true

  /**
   * Hook during the initialization phase of the current Alpine component.
   */
  public init(): void {
    axios.get('/sanctum/csrf-cookie')

    window.addEventListener('online', () => {
      this.online = true
    })

    window.addEventListener('offline', () => {
      this.online = false
    })

    this.$watch('isNotificationAllowed', (val) => {
      const status = val === true ? NotificationStatus.Allowed : NotificationStatus.Muted

      window.localStorage.setItem('basement.notification', status)
    })

    this.$el.addEventListener('send-push-notification', this.sendPushNotification.bind(this))
  }

  /**
   * Request push notification permission to the browser.
   */
  public requestNotificationPermission(): void {
    Push.Permission.request(() => {
      this.isNotificationAllowed = true
      this.hasNotificationPermission = true
    }, () => {
      this.hasNotificationPermission = false
    })
  }

  /**
   * Send push notification permission to the browser if allowed.
   */
  protected sendPushNotification(event: CustomEvent<PushNotificationEvent>): void {
    if (this.isNotificationAllowed === false) {
      throw new Error('Notifications are not allowed')
    }

    Push.create(event.detail.title, {
      body: event.detail.body,
      icon: event.detail.icon,
      timeout: 4000,
      onClick(this: Notification) {
        window.focus()
        this.close()
      },
    })
  }
}

export default (): ChatBoxComponent => new ChatBoxComponent()
