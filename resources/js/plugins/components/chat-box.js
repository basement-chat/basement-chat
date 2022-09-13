// @ts-check

import Push from 'push.js'
import NotificationStatus from '../enums/notification-status'

export const LISTENERS = {
  PUSH_NOTIFICATION: 'push-notification',
}

/**
 * @returns {import('../../@types').Components.ChatBoxComponent}
 */
export const chatBoxComponent = () => ({
  isMinimized: true,
  isContactOpened: true,
  isMessageBoxOpened: false,
  isNotificationAllowed: window.localStorage.getItem('basement.notification') === NotificationStatus.Allowed,
  hasNotificationPermission: Push.Permission.has(),

  init() {
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

  sendPushNotification(event) {
    if (this.isNotificationAllowed === false) {
      return
    }

    const pushNotificationEvent = /** @type {import('../../@types').Events.PushNotificationEvent} */ (event)

    Push.create(pushNotificationEvent.detail.sender.name, {
      body: pushNotificationEvent.detail.value,
      icon: pushNotificationEvent.detail.sender.avatar,
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
