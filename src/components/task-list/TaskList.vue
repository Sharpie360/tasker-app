<template>
  <div class="card">
    <ul class="list-group">
      <li 
        v-for="task in taskList" 
        :key="task._id"
        :class="{ 'task-bg-completed': task.completed }"
        class="list-group-item task-group">
        <div class="task-header">
          <h3 :class="{ 'task-title-completed': task.completed }">
            {{ task.task }}
          </h3>
        <img class="task-detail-expander expanded" 
          @click="showDetails(task)"
          src="../../assets/angle-left-solid.svg" alt="">
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
  import { eventBus } from '../../main.js'
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
                  editMode: false,
                  isImportantStep: true,
                  isOptionalStep: false,
                  stepCompleted: false
                }, 
                {
                  value: 'style stuff',
                  editMode: false,
                  isImportantStep: false,
                  isOptionalStep: true,
                  stepCompleted: false

                }, 
                {
                  value: 'groove out',
                  editMode: false,
                  isImportantStep: false,
                  isOptionalStep: false,
                  stepCompleted: false

                }
              ]
            } 
          },
         
        ]
      }
    },

    methods: {
      showDetails(task) {
        task.task_detailsShown = !task.task_detailsShown
      },
      toggleStepCompleted(i, id){
        //console.log(i, id)
        this.taskList[id].details.steps[i].stepCompleted = !this.taskList[id].details.steps[i].stepCompleted
        this.checkStepsCompleted(i, id)
        //console.log(this.taskList[id].details.steps[i].stepCompleted)
      },
      checkStepsCompleted(i, id){
        let checkIfComplete = []
        checkIfComplete.push(...this.taskList[id].details.steps)
        if(checkIfComplete.every(step => step.stepCompleted === true)){
          this.taskList[id].completed = true
        } else {
          this.taskList[id].completed = false
        }
        
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
        //console.log('Step index = ', indexID.i)
        //console.log('taskID = ', indexID.id)
        this.toggleStepCompleted(indexID.i, indexID.id)
      })

    }
  }
</script>

<style scoped>
  ul {
    list-style-type: none;
  }

  .task-group {
    transition: all .2s ease-in-out;
  }

  .task-bg-completed {
    background-color: rgba(0, 214, 164, .5);
  }
  .task-title-completed {
    text-decoration: line-through;
    text-decoration-color: rgb(100, 100, 100);
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
