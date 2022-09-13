import Echo from 'laravel-echo'
import Pusher from 'pusher-js'

const options = (() => {
  if (import.meta.env.VITE_BROADCAST_DRIVER === 'pusher') {
    return {
      broadcaster: 'pusher',
      key: import.meta.env.VITE_PUSHER_APP_KEY,
      cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
      forceTLS: true,
    }
  }

  throw new Error(
    'The Laravel Echo broadcast driver could not be found, please specify your own options. '
    + 'Currently supported drivers are pusher, ably, laravel-websockets and soketi.',
  )
})()

window.Pusher = Pusher
window.Echo = new Echo(options)
