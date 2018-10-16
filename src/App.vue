<template>
  <div id="app" class="container">
    <h1 class="display-5">RabbitWerks Tasker</h1>
    <app-task-list></app-task-list>
    <app-add-task></app-add-task>
  </div>
</template>

<script>
import TaskList from './components/TaskList'
import AddTask from './components/AddTask'

export default {
  name: 'app',
  data () {
    return {

    }
  },
  components: {
    'app-task-list': TaskList,
    'app-add-task': AddTask
  },
  methods: {
    
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  padding-top: 60px;
}


a {
  color: #42b983;
}
</style>
