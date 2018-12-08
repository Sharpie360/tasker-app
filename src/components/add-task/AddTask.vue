<template>
  <div class="input-control form-group mb-0">
    <h2 class="shadow-white">Add Task</h2>
    <div class="task-title-wrapper">
      <input 
        type="text" 
        placeholder="new task title"
        id="addInput" 
        class="form-control mb-3 mr-3" 
        v-model="newTask.task"
      >
      <button 
        @click="clearForm"
        class="btn btn-danger mb-3"
        >Clear Form
      </button>
    </div>

      <div class="card">
        <h5 class="card-header add-details--header">Add Additional Details
          <span 
            class="add-details--expander" 
            v-on:click="showAddDetailsCmp">+</span>
        </h5>
        
        <expand-transition>
          <div class="card-body expand-default" v-show="newTask.addDetails_detailsShown">
            <div 
              class="add-details--grid"
              >
              <div class="form-group">
                <label for="due-date">Due Date</label>
                <input class="form-control" type="date" id="due-date" v-model="newTask.due">
              </div>
              <div class="form-group">
                <label for="contact">Contact Info</label>
                <input class="form-control" type="text" id="contact" v-model="newTask.contact">
              </div>
            </div> <!-- .grid end -->
            <app-add-steps></app-add-steps>
          </div>
        </expand-transition>

      </div>

    <div id="add-task-btn-div" class="mt-3">
      <button 
        id="add" 
        class="btn btn-info pointer"
        @click="addNewTask()">
        <h5 class="mb-0">Add New Task</h5>
      </button>

      <transition name="alert" type="animation">
        <div 
          id="alert-box" 
          class="alert py-2 ml-3 mb-0 text-center" 
          :class="alertStyles"
          v-show="alertMsg.isAlert">
          <p 
            class="mb-0" 
            id="alert-msg">
            {{ alertMsg.message }}
          </p>
        </div>
      </transition>

    </div>
  </div>

</template>

<script>
  import { eventBus } from '../../main.js'
  import AddSteps from './AddSteps.vue'

  import Expand_Transition_setOpacity from '../../components/transitions/Expand_Transition_setOpacity.vue'

  export default {
    data () {
      return {
        newTask: {
          addDetails_detailsShown: false,
          task: '',
          due: '',
          contact: '',
          steps: [
  
          ],
        },
        alertMsg: {
          isAlert: false,
          isSuccess: true,
          message: ''
        },
      }
    },
    props: ['showCompletedTasksCmp'],
    components: {
      'app-add-steps': AddSteps,
      'expand-transition': Expand_Transition_setOpacity
    },
    computed: {
      alertStyles () {
        return {
          'alert-success': this.alertMsg.isSuccess,
          'alert-danger': !this.alertMsg.isSuccess
        }
      },
    },
    methods: {

      addNewTask() {
        if(this.newTask.task === '') {
          console.log('Task must have a title')
          this.createAlert(false, 'Your task should have a title')
          return
        } else {
          eventBus.$emit('grabSteps')
          const newTaskData = this.newTask
          eventBus.$emit('newTaskAdded', newTaskData)
          this.newTask.task = ''
          this.newTask.due = ''
          this.newTask.contact = ''
          this.newTask.steps = []
          this.newTask.addDetails_detailsShown = false
        }
      },
      showAddDetailsCmp(){
        this.newTask.addDetails_detailsShown = !this.newTask.addDetails_detailsShown
      },
      clearForm(){
        this.newTask.task = ''
        this.newTask.due = ''
        this.newTask.contact = ''
        this.newTask.steps = []
        eventBus.$emit('clearFormSteps')
      },
      createAlert(tF, msg) {
        this.alertMsg.isAlert = true
        this.alertMsg.isSuccess = tF
        this.alertMsg.message = msg
        setTimeout(() => {
          this.alertMsg.isAlert = false
        }, 3000)
      }
    },
    created() {
      eventBus.$on('createNewAlert', alertDetails => {
        this.createAlert(alertDetails.isSuccess, alertDetails.message)
      }),
      eventBus.$on('updatedSteps', newSteps => {
        console.log(newSteps)
        this.newTask.steps.push(...newSteps)
      })
    },

  }


</script>

<style>

.task-title-wrapper {
  display: flex;
}

.add-details--body {
  max-height: 30rem;
  height: auto;
}



.alert-enter-active {
  animation: alert-in .3s ease-in-out forwards;
}
.alert-leave-active {
  animation: alert-out .3s ease-in-out forwards;
}



.add-details--header {
  display: flex;
  flex: 1;
  justify-content: space-between
}
.add-details--expander {
  font-size: 2.5rem;
  margin: -1rem 0 -.5rem 0;
  cursor: pointer;
}

.add-details--grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 1rem;
}

#add-new-step-btn {
  font-size: .9rem;
}

#add-task-btn-div {
  display: flex;
}

#alert-box {
  flex: 1;
}




@media screen and (max-width: 480px) {
  .grid {
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 0rem;
  }
}


@keyframes alert-in {
  from {
    opacity: 0;
    transform: scale(.8)
  }
  75% {
    opacity: 1;
    transform: scale(1.05)
  }
  to {
    transform: scale(1)
  }
}
@keyframes alert-out {
  from {
    opacity: 1;
    transform: scale(1)
  }
  25% {
    opacity: 1;
    transform: scale(1.05)
  }
  to {
    opacity: 0;
    transform: scale(.8)
  }
}





</style>
