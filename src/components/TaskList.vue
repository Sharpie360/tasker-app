<template>
  <div class="card">
    <ul class="list-group">
      <li 
        v-for="task in taskList" 
        :key="task._id"
        class="list-group-item">
        <div class="task-header">
          <h3> {{ task.task }}</h3>
        <img class="task-detail-expander expanded" 
          @click="showDetails(task)"
          src="../assets/angle-left-solid.svg" alt="">
        </div>
        <app-task-details 
          v-if="task.task_detailsShown"
          :_id="task._id" 
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
            _id: 0,
            task: "Work on Tasker App", 
            completed: false, 
            task_detailsShown: true,
            details: {
              due: '10/22/18',
              contact: 'n/a' , 
              steps: [
                { 
                  value: 'write code in VUE!',
                  isImportantStep: true,
                  isOptionalStep: false,
                  stepCompleted: false
                }, 
                {
                  value: 'style stuff',
                  isImportantStep: false,
                  isOptionalStep: true,
                  stepCompleted: false

                }, 
                {
                  value: 'groove out',
                  isImportantStep: false,
                  isOptionalStep: false,
                  stepCompleted: false

                }
              ]
            } 
          },
          // { 
          //   _id: 1,
          //   task: "Livestream Tasker coding", 
          //   completed: false,
          //   task_detailsShown: false,
          //   details: {
          //     due: '10/21/18',
          //     contact: 'Youtube Peeps!' , 
          //     steps: [
          //       'write code', 'style stuff', 'groove out'
          //     ]
          //   } 
          // }
         
        ]
      }
    },
    methods: {
      showDetails(task) {
        task.task_detailsShown = !task.task_detailsShown
      },
      toggleStepCompleted(i, id){
        console.log(i, id)
        this.taskList[id].details.steps[i].stepCompleted = !this.taskList[id].details.steps[i].stepCompleted
        console.log(this.taskList[id].details.steps[i].stepCompleted)
      }
    },
    components: {
      'app-task-details': TaskDetails
    },
    created() {
      eventBus.$on('newTaskAdded', newTaskData => {
        this.taskList.push({
          _id: this.taskList.length,
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
      eventBus.$on('toggleStepCompleted', indexID => {
        console.log('Step index = ', indexID.i)
        console.log('taskID = ', indexID.id)
        this.toggleStepCompleted(indexID.i, indexID.id)
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
    height: 2.5rem;
  }
  .task-detail-expander .expanded {
    transform: rotate(-90deg)
  }

  h3 {
    margin-bottom: 0;
  }
  .checkbox {
    height: 1rem;
    width: 1rem;
  }

</style>
