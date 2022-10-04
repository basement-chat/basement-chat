import Alpine from 'alpinejs'
import axios from 'axios'
import Echo from 'laravel-echo'
import Pusher from 'pusher-js'

const container = document.querySelector('.chat-box__container--main')!
const options = JSON.parse(container.getAttribute('data-echo-options') as string)

window.Alpine = Alpine

window.axios = axios
window.axios.defaults.withCredentials = true

window.Pusher = Pusher
window.Echo = new Echo(options)
