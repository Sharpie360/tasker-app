<template>
  <div class="details">
    <div class="details-steps">
      <ul class="list-group">
        <li class="list-group-item steps-title">Task Steps</li>
        <li 
          v-for="(step, i) in steps" 
          :key="step[i]" 
          :class="{ 'step-optional': step.isOptionalStep }"
          class="list-group-item">
          <div class="step-flex">
            <div class="step-content">
              {{i + 1}}. {{ step.value }}
            </div>
            <!-- important icon -->
            <div 
              class="important-icon mt-2"
              v-show="step.isImportantStep">
              <app-important-svg
                :important="step.isImportantStep"
              ></app-important-svg>
            </div>
            <div class="complete-wrapper">
              <input 
                type="checkbox" 
                class="complete-checkbox"
                @click="toggleCompleted(i, _id)"
                 >
            </div>
          </div>

        </li>

      </ul>
    </div>
    <div class="details-info card">
      <h5 class="card-header addtl-details-title">Adtl. Details</h5>
      <div class="card-body">
        <p class="card-text">Contact Info: {{ contact }}</p>
        <p class="card-text">Due Date: {{ due }}</p>
      </div>
    </div>
  </div>
</template>

<script>
  import { eventBus } from '../main.js'

  import TaskList from './TaskList.vue'
  import ImportantSVG from './svgs/ImportantSVG.vue'
  export default {
    data () {
      return {

      }
    },
    methods: {
      toggleCompleted(i, id) {
        eventBus.$emit('toggleStepCompleted', {i, id})
      }
    },
    props: {
      _id: Number,
      due: String,
      contact: String,
      steps: Array,
    },
    components: {
      'app-important-svg': ImportantSVG
    }
  }
</script>

<style scoped>

.details {
  display: grid;
  grid-template-columns: 1fr;
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
}
.step-optional {
  background-color: rgba(0, 100, 115, .4);
}
.steps-title {
  background-color: #00D6A4;
  font-weight: 600;
  font-size: 1.2rem;
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

.addtl-details-title {
  background-color: #03D8CB;
  font-weight: 600;
  font-size: 1.2rem;
  padding: 1rem;
  border-bottom: 1px solid rgba(33, 33, 33, .2);
}
.card {
  border: 1px solid rgba(33, 33, 33, .4);
}

.card-body--mobile {
  padding: 0;
}
</style>
