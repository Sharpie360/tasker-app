<template>
  <div id="app" class="container">
    <h1 class="display-5">RabbitWerks Tasker</h1>
    <app-todo-list></app-todo-list>
    <div class="input-control">
      <h4>Add a Todo</h4>
    <input type="text" name="" id="" v-model="newTodo">
    <button 
      id="add" 
      @click="addTodo()">
      Add New Todo
      </button>
    </div>
  </div>
</template>

<script>
import TodoList from './components/TodoList'

export default {
  name: 'app',
  data () {
    return {
      newTodo: '',
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
  color: #2c3e50;
  text-align: center;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}




a {
  color: #42b983;
}
</style>
