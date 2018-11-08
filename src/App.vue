<template>
  <div id="app" class="container mb-5">
    <h1 class="display-4 shadow-white">RabbitWerks Tasker</h1>

    <app-task-list></app-task-list>

    <div id="secondary-focus-cmp-titles" class="mt-4">
      <h2 class="shadow-white pointer" @click="showCompletedTasksCmp = false">Add Task</h2>
      <h2 class="shadow-white pointer" @click="showCompletedTasksCmp = true">Completed</h2>
    </div>
    <div class="secondary-focus-cmps">
      <app-add-task  
        :showCompletedTasksCmp="showCompletedTasksCmp">
      </app-add-task>
      
      <app-completed-task-list 
        id="cmp--completed-task-list"
        :showCompletedTasksCmp="showCompletedTasksCmp">
      </app-completed-task-list>
    </div>



  </div>
</template>

<script>
import TaskList from './components/task-list/TaskList'
import AddTask from './components/add-task/AddTask'
import CompletedTaskList from './components/completed-tasks/CompletedTaskList'

export default {
  name: 'app',
  data () {
    return {
      showCompletedTasksCmp: false
    }
  },
  components: {
    'app-task-list': TaskList,
    'app-add-task': AddTask,
    'app-completed-task-list': CompletedTaskList
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


</style>
