import Vue from 'vue'
import App from './App.vue'
import store from './store'

export const eventBus = new Vue({})

new Vue({
  store,
  el: '#app',
  render: h => h(App)
})
