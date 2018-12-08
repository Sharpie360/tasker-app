<template>
  <div class="card">
    <h5 class="card-header steps-header">
      <div class="steps-header-title">Add Task Step</div>
      <button 
        class="btn btn-outline-primary py-1 px-3 add-steps-btn pointer" 
        id="add-new-step-btn"
        @click="addStepToSteps"
      >Add Step</button>
    </h5>
    <div class="card-body p-0">
      <ul class="list-group list-group-flush" id="steps-list">
        <transition-group name="slide-down-up" type="transition" mode="out-in">
          <li class="list-group-item py-2 pr-2" v-for="(step, i) in steps" :key="i">
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
                    class="pointer"
                    :important="steps[i].isImportantStep">
                  </app-important-svg>
                </div>
                <div 
                  @click="setAsOptionalStep(i)"
                  class="action-btn-outer">
                  <app-optional-svg
                    :optional="steps[i].isOptionalStep">
                  </app-optional-svg>
                </div>

                <div 
                  @click="deleteStep(i)"
                  class="action-btn-outer">
                  <app-delete-svg></app-delete-svg>
                </div>

              </div>
            </div>
          </li>
        </transition-group>
      </ul>
    </div>
  </div>
</template>

<script>
  import { eventBus } from '../../main.js'
  import AddTask from './AddTask'

  import ImportantSVG from '../svgs/ImportantSVG'
  import OptionalSVG from '../svgs/OptionalSVG'
  import DeleteSVG from '../svgs/DeleteSVG'

  export default {
    data () {
      return {
        steps: []
      }
    },
    components: {
      'app-important-svg': ImportantSVG,
      'app-optional-svg': OptionalSVG,
      'app-delete-svg': DeleteSVG
    },
    methods: {
      addStepToSteps(i){
        // for empty steps array, 0 steps
        if(this.steps.length === 0){
            this.steps.push({
            value: '',
            editMode: false,
            isImportantStep: false,
            isOptionalStep: false,
            stepCompleted: false
          })
          // check if current step is empty
        } else if (this.steps[this.steps.length - 1].value === ''){
          console.log('empty string')
          eventBus.$emit('createNewAlert', { isSuccess: false, message: 'Please fill out the current step' })
          return
          // add blank step to steps array
        } else {
          this.steps.push({
            value: '',
            editMode: false,
            isImportantStep: false,
            isOptionalStep: false,
            stepCompleted: false
          })
        } 
      },
      // send steps array to tasklist steps array
      submitSteps(){
        if(this.steps.length > 0){
          if (this.steps[this.steps.length - 1].value === '') {
            this.steps.pop()
          }
          eventBus.$emit('updatedSteps', this.steps)
          this.steps = []
        } else {
          return
        }
      },
      // toggle important property for step[i]
      setAsImportantStep(i){
        this.steps[i].isImportantStep = !this.steps[i].isImportantStep
      },
      // toggle optional property for step[i]
      setAsOptionalStep(i) {
        this.steps[i].isOptionalStep = !this.steps[i].isOptionalStep
        console.log('new val: ', this.steps[i].isOptionalStep)
      },
      // delete step[i] and send alert to be displayed
      deleteStep(i){
        console.log('deleteClicked', i)
        eventBus.$emit('createNewAlert', {isSuccess: true, message: `Step ${i + 1} has been deleted`})
        this.steps.splice(i, 1)
      },
    },
    // listens for event "grabSteps" from AddTask cmp
    created(){
      eventBus.$on('grabSteps', this.submitSteps)
      eventBus.$on('clearFormSteps', () => {
        this.steps = []
      })
    }
  }
</script>

<style>

.steps-header {
  display: flex;
  align-items: center;
}
.steps-header-title {
  flex: 1;
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
  height: 2.35rem;
  width: 2.35rem;
}


@media screen and (max-width: 480px) {
  .step-group {
    display: grid;
    grid-template-areas: 
      "label . . actions"
      "input input input input";
  }
  .step-group--label {
    grid-area: label;
  }
  .step-group--actionBtns {
    grid-area: actions;
  }
  .step-group--input {
    grid-area: input;
  }
}


.slide-down-up-enter {
  transform: scaleY(0);
  opacity: 0;
}
.slide-down-up-enter-active {
  transition: all .2s ease-in-out;
}
.slide-down-up-leave-active {
  transition: all .2s ease-in-out;
}
.slide-down-up-leave-to {
  transform: scaleY(0);
  opacity: 0;
}
.slide-down-up-move {
  transition: transform .3s;
}



</style>
