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
        <div class="grid">
          <div class="form-group">
            <label for="due-date">Due Date</label>
            <input class="form-control" type="date" id="due-date" v-model="newTask.due">
          </div>
          <div class="form-group">
            <label for="contact">Contact Info</label>
            <input class="form-control" type="text" id="contact" v-model="newTask.contact">
          </div>
        </div> <!-- .grid end -->


        <div class="card">
          <h5 class="card-header">Add Task Step
            <button 
              class="btn btn-outline-primary py-1 px-3 float-right" 
              id="add-new-step-btn"
              @click="addStepToSteps"
            >Add Step</button>

          </h5>
          <div class="card-body p-0">
            <ul class="list-group list-group-flush">
              <li class="list-group-item py-2" v-for="(step, i) in newTask.steps" :key="step._id">
                <div class="form-group step-group mb-0">
                  <!-- add editmode with vshow -->
                  <label 
                    class="step-group--label mb-0" 
                    :for="newTask.steps[i]">Step {{ i + 1 }}.
                  </label>

                  <input 
                    class="form-control step-group--input" 
                    type="text" 
                    :id="step[i]" 
                    v-model="newTask.steps[i].value"
                  >

                  <div class="step-group--actionBtns">
                      <div class="">
                        <img src="../assets/exclamation-solid.svg" alt=""
                        class="actionBtn actionBtn-icon"
                        @click="setAsImportantStep">
                      </div>

                    <img 
                      src="../assets/times-solid.svg" 
                      alt="icon button delete step" 
                      class="actionBtn actionBtn-icon step-remove"
                      @click="deleteStep(i)"
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
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
  import { eventBus } from '../main.js'

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
        isImportantStep: false
      }
    },
    computed: {
      alertStyles () {
        return {
          'alert-success': this.alertMsg.isSuccess,
          'alert-danger': !this.alertMsg.isSuccess
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
        // console.log(this.newTask.addDetails_detailsShown)
        this.newTask.addDetails_detailsShown = !this.newTask.addDetails_detailsShown
      },
      addStepToSteps(){
        if(this.newTask.steps.length === 0){
            this.newTask.steps.push({
            value: '',
          })
        } else if (this.newTask.steps[this.newTask.steps.length - 1].value === ''){
          console.log('empty string')
          this.createAlert(false, 'Please fill out the current step')
          return
        } else {
          this.newTask.steps.push({
            value: '',
            isImportantStep: this.isImportantStep
          })
        }
      },
      setAsImportantStep(i){
        console.log('test', i)
        // this.newTask.isImportantStep = !this.newTask.isImportantStep
        // const svg = document.querySelector('.step-important')
        // console.log(svg)
      },
      deleteStep(i){
        console.log('deleteClicked', i)
        this.createAlert(true)
        this.newTask.steps.splice(i, 1)
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
    }
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

#add-new-step-btn {
  font-size: .9rem;
}

.step-group {
  display: flex;
  flex: 1;
  align-items: center;
}
.step-group--label {
  flex: 1;
}
.step-group--input {
  flex: 5;
}
.step-group--actionBtns {
  flex: 1;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}

.actionBtn-icon {
  height: 1.5rem;
  width: 1.5rem;
}

.step-remove {
  height: 2rem
}

#add-task-btn-div {
  display: flex;
}

#alert-box {
  flex: 1;
}
</style>
