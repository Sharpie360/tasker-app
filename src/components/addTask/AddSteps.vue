<template>
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
        <li class="list-group-item py-2 pr-1" v-for="(step, i) in steps" :key="i">
          <div class="form-group step-group mb-0">
            <!-- add editmode with vshow -->
            <label 
              class="step-group--label mb-0" 
              :for="steps[i]">Step {{ i + 1 }}.
            </label>

            <input 
              class="form-control step-group--input" 
              type="text" 
              :id="steps[i]" 
              v-model="steps[i].value">

            <div class="step-group--actionBtns">
              <div 
                v-on:click="setAsImportantStep(i)"
                class="action-btn-outer">
                <app-important-svg 
                  :important="steps[i].isImportantStep">
                </app-important-svg>
              </div>
              <div 
                @click="setAsOptionalStep(i)"
                class="action-btn-outer">
                <app-optional-svg></app-optional-svg>
              </div>
                
              <img 
                src="../../assets/times-solid.svg" 
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
</template>

<script>
  import { eventBus } from '../../main.js'
  import AddTask from './AddTask'

  import ImportantSVG from '../svgs/ImportantSVG'
  import OptionalSVG from '../svgs/OptionalSVG'

  export default {
    data () {
      return {
        steps: []
      }
    },
    components: {
      'app-important-svg': ImportantSVG,
      'app-optional-svg': OptionalSVG
    },
    methods: {
      addStepToSteps(i){
        if(this.steps.length === 0){
            this.steps.push({
            value: '',
            isImportantStep: false,
            isOptionalStep: false,
            stepCompleted: false
          })
        } else if (this.steps[this.steps.length - 1].value === ''){
          console.log('empty string')
          eventBus.$emit('createNewAlert', { isSuccess: false, message: 'Please fill out the current step' })
          return
        } else {
          this.steps.push({
            value: '',
            isImportantStep: false,
            isOptionalStep: false,
            stepCompleted: false
          })
        } 
      },
      submitSteps(){
        console.log('test submit')
        if (this.steps[this.steps.length - 1].value === '') {
          this.steps.pop()
        }
        eventBus.$emit('updatedSteps', this.steps)
        this.steps = []
      },
      setAsImportantStep(i){
        console.log(i)
        // console.log('before: ', this.newTask.steps[i].isImportantStep)
        this.steps[i].isImportantStep = !this.steps[i].isImportantStep
        // console.log('after ', this.newTask.steps[i].isImportantStep, this.showIf_isImportant)
      },
      setAsOptionalStep(i) {
        console.log('test')
        this.steps[i].isOptionalStep = !this.steps[i].isOptionalStep
        console.log('new val: ', this.steps[i].isOptionalStep)
      },
      deleteStep(i){
        console.log('deleteClicked', i)
        eventBus.$emit('createNewAlert', {isSuccess: true, message: `Step ${i + 1} has been deleted`})
        this.steps.splice(i, 1)
      },
    },
    created(){
      eventBus.$on('grabSteps', this.submitSteps)
    }
  }
</script>

<style>

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
  height: 2.35rem;
  width: 2.35rem;
}


</style>
