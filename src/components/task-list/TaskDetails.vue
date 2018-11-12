<template>
  <div class="details">
    <div class="details-steps">
      <ul class="list-group">
        <li class="list-group-item steps-title">
          <div class="steps-title-text">Task Steps</div>
          <div class="complete-wrapper">
            <input 
              type="checkbox" 
              class="complete-checkbox task-checkbox"
              @change="setTaskAsCompleted(_id)"
              >
          </div>
        </li>
        <li 
          v-for="(step, i) in steps" 
          :key="step[i]" 
          :class="{ 'step-optional': step.isOptionalStep, 'pl-1': step.isImportantStep }"
          class="list-group-item">
          <div class="step-flex">
            <!-- important icon -->
            <div 
              class="important-icon mt-1"
              v-show="step.isImportantStep">
              <app-important-svg
                :important="step.isImportantStep"
              ></app-important-svg>
            </div>
            <div 
              class="step-content" 
              @dblclick="step.editMode = true"
              v-show="!step.editMode">
              {{i + 1}}. {{ step.value }}
            </div>
            <div 
              class="step-content-edit" 
              v-show="step.editMode">
              <input 
                type="text"  
                @blur="saveNewValueOfEditedStep(step)"
                v-model="step.value"
                autofocus>
            </div>
            
            <div class="complete-wrapper">
              <input 
                type="checkbox" 
                class="complete-checkbox step-checkbox"
                @change="toggleStepCompleted(i, _id)"
                :disabled="taskCompleted">
            </div>
          </div>
        </li>
      </ul>
    </div>
    
    <task-additional-details 
      :due="due" 
      :contact="contact">
    </task-additional-details>

  </div>
</template>

<script>
  import { eventBus } from '../../main.js'

  import TaskList from './TaskList.vue'
  import ImportantSVG from '../svgs/ImportantSVG.vue'
  import AdditionalDetails from './AdditionalDetails.vue'

  export default {
    data () {
      return {
      }
    },
    props: {
      _id: Number,
      taskCompleted: Boolean,
      due: String,
      contact: String,
      steps: Array,
    },
    components: {
      'app-important-svg': ImportantSVG,
      'task-additional-details': AdditionalDetails

    },
    methods: {
      toggleStepCompleted(i, id) {
        eventBus.$emit('toggleStepCompleted', {i, id})
      },
      setTaskAsCompleted(id) {
        const checkboxes = document.querySelectorAll
        ('.step-checkbox')
        checkboxes.forEach(checkbox => {
          if(!this.taskCompleted){
            checkbox.checked = true
          } else {
            checkbox.checked = false
          }
        })
        this.steps.forEach(step => {
          if(!this.taskCompleted){
            step.stepCompleted = true
          } else {
            step.stepCompleted = false
          }
        });
        eventBus.$emit('setTaskAsCompleted', id)
      },
      saveNewValueOfEditedStep(step){
        step.editMode = false
        eventBus.$emit('updateLS')
      }
    },
  }
</script>

<style scoped>

.details {
  display: grid;
  grid-template-columns: 3fr 2fr;
  grid-gap: 20px;
  padding: 1rem 0;
}
/* .details--mobile {
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 1rem;
  /* not quite finished! fix these! *
} */

li {
  list-style: none;
  border: 1px solid rgba(33, 33, 33, .4);
  background-color: rgb(243, 243, 243);
}
.step-optional {
  background-color: rgba(0, 100, 115, .4);
}
.steps-title {
  background-color: #00D6A4;
  font-weight: 400;
  font-size: 1.35rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.steps-title-text {
  flex: 23;
}

.step-flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.step-content {
  font-size: 1.2rem;
  flex: 23
}
.step-content-edit {
  font-size: 1.2rem;
  flex: 23
}
.step-content-edit input {
  width: 96%;
}
.important-icon {
  flex: 2;
}
.complete-wrapper {
  flex: 1;
  display: flex;
  justify-content: center; 
}
.complete-checkbox {
  width: 1.5rem;
  height: 1.5rem;
}



.card-body--mobile {
  padding: 0;
}
</style>
