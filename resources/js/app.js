import './bootstrap'
import Alpine from 'alpinejs'
import intersect from '@alpinejs/intersect'
import basement from './plugins/basement'

window.Alpine = Alpine

Alpine.plugin(intersect)
Alpine.plugin(basement)
Alpine.start()
