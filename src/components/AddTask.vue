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


        <div class="card">
          <h5 class="card-header">Add Task Step
            <button 
              class="btn btn-outline-primary py-1 px-3 float-right" 
              id="add-new-step-btn"
              @click="addStepToSteps"
            >Add Step</button>

          </h5>
          <div class="card-body p-0">
            <ul class="list-group list-group-flush" id="steps-list">
              <li class="list-group-item py-2 pr-1" v-for="(step, i) in newTask.steps" :key="i">
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
                      <div 
                        class="action-btn-outer" 
                        @click="setAsImportantStep(i)"> 
                        <svg 
                          class="step-important-svg"  
                          xmlns="http://www.w3.org/2000/svg" 
                          viewBox="0 0 192 512">
                            <!-- Dynamic Styling of the ! icon fixed!!! vvvvv -->
                            <path 
                              class="important-svg-path"
                              :class="{ 'important-true': newTask.steps[i].isImportantStep }"
                              fill="currentColor" 
                              d="M176 432c0 44.112-35.888 80-80 80s-80-35.888-80-80 35.888-80 80-80 80 35.888 80 80zM25.26 25.199l13.6 272C39.499 309.972 50.041 320 62.83 320h66.34c12.789 0 23.331-10.028 23.97-22.801l13.6-272C167.425 11.49 156.496 0 142.77 0H49.23C35.504 0 24.575 11.49 25.26 25.199z">
                            </path>
                        </svg>
                      </div>
                      <div 
                        class="action-btn-outer"
                        @click="setAsOptionalStep(i)"
                        >
                        <svg 
                          class="step-optional-svg" 
                          xmlns="http://www.w3.org/2000/svg" 
                          viewBox="0 0 384 512">
                            <path 
                              class="optional-svg-path"
                              :class="{ 'optional-true': newTask.steps[i].isOptionalStep }"
                              fill="currentColor" 
                              d="M202.021 0C122.202 0 70.503 32.703 29.914 91.026c-7.363 10.58-5.093 25.086 5.178 32.874l43.138 32.709c10.373 7.865 25.132 6.026 33.253-4.148 25.049-31.381 43.63-49.449 82.757-49.449 30.764 0 68.816 19.799 68.816 49.631 0 22.552-18.617 34.134-48.993 51.164-35.423 19.86-82.299 44.576-82.299 106.405V320c0 13.255 10.745 24 24 24h72.471c13.255 0 24-10.745 24-24v-5.773c0-42.86 125.268-44.645 125.268-160.627C377.504 66.256 286.902 0 202.021 0zM192 373.459c-38.196 0-69.271 31.075-69.271 69.271 0 38.195 31.075 69.27 69.271 69.27s69.271-31.075 69.271-69.271-31.075-69.27-69.271-69.27z">
                            </path>
                        </svg>
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
      }
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
      addStepToSteps(i){
        if(this.newTask.steps.length === 0){
            this.newTask.steps.push({
            value: '',
            isImportantStep: false,
            isOptionalStep: false
          })
        } else if (this.newTask.steps[this.newTask.steps.length - 1].value === ''){
          console.log('empty string')
          this.createAlert(false, 'Please fill out the current step')
          return
        } else {
          this.newTask.steps.push({
            value: '',
            isImportantStep: false,
            isOptionalStep: false
          })
        }
      },
      setAsImportantStep(currentStep){
        console.log(currentStep)
        // console.log('before: ', this.newTask.steps[currentStep].isImportantStep)
        this.newTask.steps[currentStep].isImportantStep = !this.newTask.steps[currentStep].isImportantStep
        // console.log('after ', this.newTask.steps[currentStep].isImportantStep, this.showIf_isImportant)
      },
      setAsOptionalStep(i) {
        console.log('test')
        this.newTask.steps[i].isOptionalStep = !this.newTask.steps[i].isOptionalStep
        console.log('new val: ', this.newTask.steps[i].isOptionalStep)
      },
      deleteStep(i){
        console.log('deleteClicked', i)
        this.createAlert(true, `Step ${i + 1} was removed..`)
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
/* .grid--mobile {
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 1rem;
    /* not quite finished! fix these! *
} */

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
.action-btn-outer {
  width: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
.step-important-svg, .step-optional-svg {
  flex: 1;
  height: 1.75rem;
  width: 1.75rem
}
.important-svg-path, .optional-svg-path {
  fill: #000;
  transition: fill 0.1s ease-in-out;
}
.step-important-svg .important-true {
  fill: #00D6A4;
}
.step-optional-svg .optional-true {
  fill: #006473;
}

.step-remove {
  height: 2.25rem;
  width: 2.25rem;
}

#add-task-btn-div {
  display: flex;
}

#alert-box {
  flex: 1;
}

</style>
