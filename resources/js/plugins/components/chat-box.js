// @ts-check

import Push from 'push.js'
import NotificationStatus from '../enums/notification-status'

export const LISTENERS = {
  PUSH_NOTIFICATION: 'push-notification',
}

/**
 * @returns {import('../@types').Components.ChatBoxComponent}
 */
export const chatBoxComponent = () => ({
  isMinimized: true,
  isContactOpened: true,
  isMessageBoxOpened: false,
  isNotificationAllowed: window.localStorage.getItem('basement.notification') === NotificationStatus.Allowed,
  hasNotificationPermission: Push.Permission.has(),
  online: true,

  init() {
    window.addEventListener('online', () => {
      this.online = true
    })

    window.addEventListener('offline', () => {
      this.online = false
    })

    this.$watch('isNotificationAllowed', (val) => (
      window.localStorage.setItem(
        'basement.notification',
        val === true ? NotificationStatus.Allowed : NotificationStatus.Muted,
      )
    ))

    this.$el.addEventListener(LISTENERS.PUSH_NOTIFICATION, this.sendPushNotification)
  },

  requestNotificationPermission() {
    Push.Permission.request(() => {
      this.isNotificationAllowed = true
      this.hasNotificationPermission = true
    }, () => {
      this.hasNotificationPermission = false
    })
  },

  sendPushNotification(/** @type import('../@types').Events.PushNotificationEvent */ event) {
    if (this.isNotificationAllowed === false) {
      return
    }

    Push.create(event.detail.sender.name, {
      body: event.detail.value,
      icon: event.detail.sender.avatar,
      timeout: 4000,
      /**
       * @this {Notification}
       */
      onClick() {
        window.focus()
        this.close()
      },
    })
  },
})
