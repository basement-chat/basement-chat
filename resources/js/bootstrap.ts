import Alpine from 'alpinejs'
import axios from 'axios'
import Echo from 'laravel-echo'
import Pusher from 'pusher-js'
import echoOptions from './plugins/echo-options'

window.Alpine = Alpine

window.axios = axios

window.Pusher = Pusher
window.Echo = new Echo(echoOptions)
