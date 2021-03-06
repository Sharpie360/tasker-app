<template>

  <div class="card display-wrapper">
    <ul class="list-group">
      <transition-group name="delete-fade">
        <li 
          v-for="(task, i) in taskList" 
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
            </div>

            <app-task-progress-bar 
              :steps="task.details.steps">
            </app-task-progress-bar>
          </div>

          <keep-alive>
            <expand-transition>
              <app-task-details 
                v-if="task.task_detailsShown"
                :_id="task._id" 
                :task-completed="task.completed"
                :due="task.details.due"
                :contact="task.details.contact"
                :steps="task.details.steps"
                class="expand-default">
              </app-task-details>
            </expand-transition>
          </keep-alive>

          <app-task-manage-buttons
            :task="task" :i="i">
          </app-task-manage-buttons>

        </li>
      </transition-group>
    </ul>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'

  import { eventBus } from '../../main.js'
  import ExpanderSVG from '../svgs/ExpanderSVG.vue'
  import ProgressBar from './ProgressBar.vue'
  import TaskDetails from './TaskDetails.vue'
  import ManageButtons from './ManageButtons.vue'

  import Expand_Transition_setOpacity from '../../components/transitions/Expand_Transition_setOpacity.vue'
  import Expand_Transition_fadeInOut from '../../components/transitions/Expand_Transition_FadeInOut.vue'



  function formatDate(date) {
    const newDate = new Date(date)
    const formattedDate = newDate.toLocaleDateString()
    return formattedDate
  }
 

  export default {
    data () {
      return {
        taskList: [
          { 
            _id: 0,
            task: "Welcome to Tasker!", 
            completed: false, 
            task_detailsShown: true,
            details: {
              due: '10/22/18',
              contact: 'RabbitWerks.js' , 
              steps: [
                { 
                  value: 'Add A New Task!',
                  editMode: false,
                  isImportantStep: true,
                  isOptionalStep: false,
                  stepCompleted: false
                }, 
                {
                  value: 'Double Click Me To Edit!',
                  editMode: false,
                  isImportantStep: false,
                  isOptionalStep: true,
                  stepCompleted: false

                }, 
                {
                  value: 'Track Progress and Archive Complete',
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
      'app-expander-svg': ExpanderSVG,
      'app-task-progress-bar': ProgressBar,
      'app-task-details': TaskDetails,
      'app-task-manage-buttons': ManageButtons,
      'expand-transition': Expand_Transition_setOpacity,
      'expand-transition-f': Expand_Transition_fadeInOut
    },
    props: ['showCompletedTasksCmp'],
    computed: {
      tasklistLength() {
        return this.taskList.length
      }
    },
    methods: {
      // VUEX 
      ...mapActions(['updateCurrentTaskCount']),

      // component methods
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
      saveToLocalStorage(){
        const taskData = JSON.stringify(this.taskList)
        // console.log('data is ', taskData)
        localStorage.setItem('task-data', taskData)
      }
    },
    created() {
      if(localStorage.getItem('task-data')){
        this.taskList = JSON.parse(localStorage.getItem('task-data'))
        // Vuex store
        this.updateCurrentTaskCount(this.taskList.length)
      } else {
        console.log('no data found....') 
        // Vuex store
        this.updateCurrentTaskCount(this.taskList.length)
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
            due: formatDate(newTaskData.due),
            contact: newTaskData.contact,
            steps: newTaskData.steps
          },
          completed: false
        })
        this.saveToLocalStorage()
        // Vuex store
        this.updateCurrentTaskCount(this.taskList.length)
      })
      // receiving end of CE from TaskDetails
      eventBus.$on('toggleStepCompleted', indexID => {
        this.toggleStepCompleted(indexID.i, indexID.id)
      })
      // receiving end of CE from TaskDetails
      eventBus.$on('setTaskAsCompleted', id => {
        this.taskList[id].completed = !this.taskList[id].completed
      })
      // delete task CE from buttons cmp
      eventBus.$on('deleteTask', index => {
        this.taskList.splice(index, 1)
        this.saveToLocalStorage()
        // VUEX store
        this.updateCurrentTaskCount(this.taskList.length)
      })
      // save tasklist to local storage CE listener
      eventBus.$on('updateLS', () => {
        this.saveToLocalStorage()
      })
      // archive completed task, send to completedtaskcmp then update LS 
      eventBus.$on('archiveTask', index => {
        eventBus.$emit('sendTaskToCompletedList', this.taskList[index])
        console.log(this.taskList[index])
        this.taskList.splice(index, 1)
        this.saveToLocalStorage()
        // store
      })
      // update additional details receiving CE
      eventBus.$on('updateNewDetails', newDetails => {
        console.log(newDetails)
        this.taskList[newDetails._id].details.contact = newDetails.newContact
        this.taskList[newDetails._id].details.due = formatDate(newDetails.newDue)
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

  .delete-fade-leave-active {
    transition: opacity .2s ease-out;
  }
  .delete-fade-leave-to {
    opacity: 0;
  }

  
</style>
