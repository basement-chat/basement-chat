// @ts-check

import axios from 'axios'
import Push from 'push.js'
import NotificationStatus from '../enums/notification-status'

/**
 * @returns {import('../@types').Components.ChatBoxComponent}
 */
export default () => ({
  isMinimized: true,
  isContactOpened: true,
  isMessageBoxOpened: false,
  isNotificationAllowed: window.localStorage.getItem('basement.notification') === NotificationStatus.Allowed,
  hasNotificationPermission: Push.Permission.has(),
  online: true,

  /**
   * Hook during the initialization phase of the current Alpine component.
   */
  init() {
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
  },

  /**
   * Request push notification permission to the browser.
   */
  requestNotificationPermission() {
    Push.Permission.request(() => {
      this.isNotificationAllowed = true
      this.hasNotificationPermission = true
    }, () => {
      this.hasNotificationPermission = false
    })
  },

  /**
   * Send push notification permission to the browser if allowed.
   */
  sendPushNotification(/** @type import('../@types').Events.PushNotificationEvent */ event) {
    if (this.isNotificationAllowed === false) {
      return
    }

    Push.create(event.detail.title, {
      body: event.detail.body,
      icon: event.detail.icon,
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
