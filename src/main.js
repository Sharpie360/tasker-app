import Vue from 'vue'
import App from './App.vue'
import TaskList from './components/TaskList.vue'

Vue.component('app-task-list', TaskList)

export const eventBus = new Vue({})

new Vue({
  el: '#app',
  render: h => h(App)
})
