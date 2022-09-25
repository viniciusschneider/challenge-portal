import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import { format } from 'date-fns'
import '@/scss/index.scss'

Vue.config.productionTip = false

Vue.filter('date', (date: Date, dateFormat: string): string => {
  if (!date) return ''

  if (!dateFormat) return date.toString()

  return format(date, dateFormat)
})

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App)
}).$mount('#app')
