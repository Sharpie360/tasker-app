<template>
  <div class="input-control form-group mt-5">
    <h3>Add Task</h3>
    <input 
      type="text" 
      placeholder="new task title"
      id="addInput" 
      class="form-control mb-3" 
      v-model="newTask.task"
    >
    <div class="card">
      <h5 class="card-header add-details-header">Add Additional Details
        <span 
          class="add-details-expander" 
          v-on:click="showAddDetailsCmp">+</span>
      </h5>
      
      <div class="card-body" v-show="newTask.addDetails_detailsShown">
        <div 
          class="grid"
          :class="mediaQueries">
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
    </div>
    <div id="add-task-btn-div" class="mt-3">
      <button 
        id="add" 
        class="btn btn-info"
        @click="addNewTask()">
        <h5 class="mb-0">Add New Task</h5>
      </button>
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
    </div>
  </div>
</template>

<script>
  import { eventBus } from '../../main.js'
  import AddSteps from './AddSteps.vue'

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
    components: {
      'app-add-steps': AddSteps
    },
    computed: {
      alertStyles () {
        return {
          'alert-success': this.alertMsg.isSuccess,
          'alert-danger': !this.alertMsg.isSuccess
        }
      },
      mediaQueries(){
        // not quite finished! fix these! 
        return {
          // 'grid--mobile': this.$mq === 'mobile',
          // 'grid': !this.mq === 'mobile'
        }

      }
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
      createAlert(tF, msg) {
        const vm = this
        this.alertMsg.isAlert = true
        this.alertMsg.isSuccess = tF
        this.alertMsg.message = msg
        setTimeout(() => {
          vm.alertMsg.isAlert = false
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

<style scoped>


.add-details-header {
  display: flex;
  flex: 1;
  justify-content: space-between
}
.add-details-expander {
  font-size: 2rem;
  margin: -.3rem 0 -.5rem 0;
  cursor: pointer;
}

.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 1rem;
}
/* .grid--mobile {
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 1rem;
    /* not quite finished! fix these! *
} */

#add-new-step-btn {
  font-size: .9rem;
}





#add-task-btn-div {
  display: flex;
}

#alert-box {
  flex: 1;
}

</style>
