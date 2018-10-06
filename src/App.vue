<template>
  <div id="app">
    My Own Todo
    <div class="input-control">
      <h4>Add a Todo</h4>
    <input type="text" name="" id="" v-model="newTodo">
    <button id="add" @click="addTodo()">Add New Todo</button>
    </div>
    <app-todo-list></app-todo-list>
  </div>
</template>

<script>
import TodoList from './components/TodoList'

export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      newTodo: '',
      todos: []
    }
  },
  components: {
    'app-todo-list': TodoList
  },
  methods: {
    addTodo(){
      this.todos.push({
        item: this.newTodo,
        completed: false
      })
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
