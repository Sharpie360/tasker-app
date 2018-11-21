<template>
  <div id="app" class="container mb-5 pt-4">
    <h1 class="display-4 shadow-white mb-4">RabbitWerks Tasker</h1>
    
    <app-add-task></app-add-task>

    <div id="secondary-focus-cmp-titles" class="mt-4">
      <h2 
        class="shadow-white pointer hoverfx" 
        :class="{ 'current-cmp-highlight': !showCompletedTasksCmp }"
        @click="showCompletedTasksCmp = false">Current Tasks
      </h2>
      <h2 
        class="shadow-white pointer hoverfx" 
        :class="{ 'current-cmp-highlight': showCompletedTasksCmp }"
        @click="showCompletedTasksCmp = true">Completed
      </h2>
    </div>

    <div class="secondary-focus-cmps">

      <app-task-list  
        :showCompletedTasksCmp="!showCompletedTasksCmp">
      </app-task-list>

      <app-completed-task-list 
        id="cmp--completed-task-list"
        :showCompletedTasksCmp="showCompletedTasksCmp">
      </app-completed-task-list>

    </div>



  </div>
</template>

<script>
import TaskList from './components/task-list/TaskList'
import CompletedTaskList from './components/completed-tasks/CompletedTaskList'
import AddTask from './components/add-task/AddTask'

export default {
  name: 'app',
  data () {
    return {
      showCompletedTasksCmp: false
    }
  },
  components: {
    'app-task-list': TaskList,
    'app-completed-task-list': CompletedTaskList,
    'app-add-task': AddTask,
  },
  methods: {
    
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Titillium+Web:200,300,400,600,700');

html {
  font-size: 20px;
}

.pointer {
  cursor: pointer;
}

/* .container {
  max-width: 95%;
} */
#app {
  font-family: 'Titillium Web', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  padding-top: 60px;
}

.shadow-white {
  text-shadow: 1px 1px 3px rgba(247, 247, 247, .75);
}
a {
  color: #42b983;
}

#secondary-focus-cmp-titles {
  display: flex;
  flex: 1;
  justify-content: space-between;
}

.hoverfx:hover {
  color: #0a0a0a;
}

.current-cmp-highlight {
  color: #212121;
}

</style>
