import Vue from 'vue'
import App from './App.vue'
//import db from './datastore'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')

//Vue.prototype.$db = db