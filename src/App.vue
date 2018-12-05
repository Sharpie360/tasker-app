<template>
  <div id="app" class="container mb-5 pt-3">
    <h1 
      id="app-title" 
      class="display-4 shadow-white mb-0"
      >RabbitWerks Tasker
    </h1>
    <hr>
    
    <app-add-task class="mt-4"></app-add-task>

    <div id="secondary-focus-cmp-titles" class="mt-4">
      <h2 
        class="shadow-white pointer hoverfx" 
        :class="{ 'current-cmp-highlight': !showCompletedTasksCmp }"
        @click="showCompletedTasksCmp = false">Current
      </h2>
      <h2 
        class="shadow-white pointer hoverfx" 
        :class="{ 'current-cmp-highlight': showCompletedTasksCmp }"
        @click="showCompletedTasksCmp = true">Complete
      </h2>
    </div>

    <div class="secondary-focus-cmps">

      <transition name="fade" type="transition" mode="out-in">
        <app-task-list  
          v-if="!showCompletedTasksCmp"
          :showCompletedTasksCmp="!showCompletedTasksCmp"
          key="current">
        </app-task-list>

        <app-completed-task-list 
          v-else
          id="cmp--completed-task-list"
          :showCompletedTasksCmp="showCompletedTasksCmp"
          key="completed">
        </app-completed-task-list>
      </transition>

    </div>


  </div>
</template>

<script>
import { store } from './store.js'
import TaskList from './components/task-list/TaskList'
import CompletedTaskList from './components/completed-tasks/CompletedTaskList'
import AddTask from './components/add-task/AddTask'
import { eventBus } from './main.js';

export default {
  name: 'app',
  data () {
    return {
      showCompletedTasksCmp: false,
      storeData: {
        currentTasks: store.num_CurrentTasks
      }
    }
  },
  components: {
    'app-task-list': TaskList,
    'app-completed-task-list': CompletedTaskList,
    'app-add-task': AddTask,
  },

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


.fade-enter {
  opacity: 0;
}
.fade-enter-active {
  transition: opacity 0.1s ease-in-out;
}
.fade-leave-active {
  transition: all 0.1s ease-in-out;
  opacity: 1;
}
.fade-leave-to {
  opacity: 0;
}



@media screen and (max-width: 480px) {
  html {
    font-size: 16px;
  }

  #app-title {
    font-size: 2.8rem;
  }
}

</style>
