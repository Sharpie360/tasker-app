<template>
  <div class="card">
    <ul class="list-group">
      <li 
        v-for="task in taskList" 
        :key="task._id"
        :class="{ 'task-bg-completed': task.completed }"
        class="list-group-item task-group">
        <div class="task-header-group">
          <div class="task-header">
            <h3 :class="{ 'task-title-completed': task.completed }">
              {{ task.task }}
            </h3>
            <div class="" @click="showDetails(task)">
              <app-expander-svg
                :isExpanded="task.task_detailsShown">
              </app-expander-svg>
            </div>
          <!-- <img class="task-detail-expander expanded" 
            @click="showDetails(task)"
            src="../../assets/angle-left-solid.svg" alt=""> -->
          </div>
          <app-task-progress-bar :steps="task.details.steps"></app-task-progress-bar>
        </div>
        <keep-alive>
          <app-task-details 
            v-if="task.task_detailsShown"
            :_id="task._id" 
            :task-completed="task.completed"
            :due="task.details.due"
            :contact="task.details.contact"
            :steps="task.details.steps">
          </app-task-details>
        </keep-alive>
        <button 
          @click="deleteTask(task)"
          class="btn btn-danger">
            Delete Task
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
  import { eventBus } from '../../main.js'
  import TaskDetails from './TaskDetails.vue'
  import ProgressBar from './ProgressBar.vue'
  import ExpanderSVG from '../svgs/ExpanderSVG.vue'




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
        ],

      }
    },
    components: {
      'app-task-details': TaskDetails,
      'app-task-progress-bar': ProgressBar,
      'app-expander-svg': ExpanderSVG
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
          document.querySelector('.task-checkbox').checked = true
        } else {
          this.taskList[id].completed = false
          document.querySelector('.task-checkbox').checked = false
        }
      },
      deleteTask(task){
        if(confirm(`Are you sure you want to delete this task? Task: ${task.task}`)) {
          this.taskList.splice(task._id, 1)
          this.saveToLocalStorage()
        }
      },
      saveToLocalStorage(){
        const taskData = JSON.stringify(this.taskList)
        console.log('data is ', taskData)
        localStorage.setItem('task-data', taskData)
      }
    },
    created() {
      if(localStorage.getItem('task-data')){
        this.taskList = JSON.parse(localStorage.getItem('task-data'))
      } else {
        console.log('no data found....')
        return
      }
    },
    mounted() {
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
      // receiving end of CE from TaskDetails
      eventBus.$on('toggleStepCompleted', indexID => {
        this.toggleStepCompleted(indexID.i, indexID.id)
      })
      // receiving end of CE from TaskDetails
      eventBus.$on('setTaskAsCompleted', id => {
        this.taskList[id].completed = !this.taskList[id].completed
      })
      // save tasklist to local storage CE listener
      eventBus.$on('updateLS', () => {
        this.saveToLocalStorage()
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
    text-decoration-color: rgb(255, 255, 255);
  }

  .task-header {
    display: flex;
    flex: 1;
    justify-content: space-between;
    align-items: center;
  }

  h3 {
    margin-bottom: 0;
  }
  .checkbox {
    height: 1rem;
    width: 1rem;
  }

</style>
