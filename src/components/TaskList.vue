<template>
  <div class="card">
    <ul class="list-group">
      <li 
        v-for="task in taskList" 
        :key="task"
        class="list-group-item">
        <div class="task-header">
          <h3> {{ task.task }}</h3>
        <!-- <input 
          type="checkbox" 
          name="completed"
          class="checkbox"
          v-model="task.completed"
        > -->
        <p class="mb-0 task-detail-expander" @click="showDetails(task)"><span v-if="!task.task_detailsShown">more</span><span v-else>less</span></p>
        </div>
        <app-task-details 
          v-if="task.task_detailsShown" 
          :due="task.details.due"
          :contact="task.details.contact"
          :steps="task.details.steps">
        </app-task-details>
        
      </li>
    </ul>
  </div>
</template>

<script>
  import { eventBus } from '../main.js'
  import TaskDetails from './TaskDetails.vue'

  export default {
    data () {
      return {
        taskList: [
          { 
            task: "Work on Tasker App", 
            completed: true, 
            task_detailsShown: true,
            details: {
              due: '10/22/18',
              contact: 'n/a' , 
              steps: [
                'write code', 'style stuff', 'groove out'
              ]
            } 
          },
          { 
            task: "Livestream Tasker coding", 
            completed: false,
            task_detailsShown: false,
            details: {
              due: '10/21/18',
              contact: 'Youtube Peeps!' , 
              steps: [
                'write code', 'style stuff', 'groove out'
              ]
            } 
          },
          { 
            task: "Take over the world!!", 
            completed: false,
            task_detailsShown: false,
            details: {
            }
          },
        ]
      }
    },
    methods: {
      showDetails(task) {
        task.task_detailsShown = !task.task_detailsShown
      }
    },
    components: {
      'app-task-details': TaskDetails
    },
    created() {
      eventBus.$on('newTaskAdded', newTaskData => {
        this.taskList.push({
          task: newTaskData.task,
          task_detailsShown: false,
          details: {
            due: newTaskData.due,
            contact: newTaskData.contact,
            steps: newTaskData.steps
          },
          completed: false
        })
      })
    }
  }
</script>

<style scoped>
  ul {
    list-style-type: none;
  }
  .task-header {
    display: flex;
    flex: 1;
    justify-content: space-between;
    align-items: center;
  }
  .task-detail-expander {
    cursor: pointer; 
  }

  h3 {
    margin-bottom: 0;
  }
  .checkbox {
    height: 1rem;
    width: 1rem;
  }

</style>
