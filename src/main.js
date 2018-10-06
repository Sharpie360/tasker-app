import Vue from 'vue'
import App from './App.vue'
import TodoList from './components/TodoList.vue'

Vue.component('app-todo-list', TodoList)

export const eventBus = new Vue({})

new Vue({
  el: '#app',
  render: h => h(App)
})
