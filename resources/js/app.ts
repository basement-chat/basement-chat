import '../css/app.css'
import './bootstrap'
import intersect from '@alpinejs/intersect'
import basement from './plugins/basement'

window.Alpine.plugin(intersect)
window.Alpine.plugin(basement)
window.Alpine.start()
