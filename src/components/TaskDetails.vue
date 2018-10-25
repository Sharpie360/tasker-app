<template>
  <div class="details">
    <div class="details-steps">
      <ul class="list-group">
        <li class="list-group-item steps-title">Task Steps</li>
        <li 
          v-for="(step, i) in steps" 
          :key="step[i]" 
          :class="{ 'step-optional': step.isOptionalStep }"
          class="list-group-item step-flex" >
          <div class="step-content">
            {{i + 1}}. {{ step.value }}
          </div>
          <!-- important icon -->
          <div 
            v-show="step.isImportantStep"
            class="important-icon mt-2">
            <svg 
              class="step-important-svg"  
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 192 512">
                <!-- Dynamic Styling of the ! icon fixed!!! vvvvv -->
                <path 
                  class="important-svg-path"
                  fill="currentColor" 
                  d="M176 432c0 44.112-35.888 80-80 80s-80-35.888-80-80 35.888-80 80-80 80 35.888 80 80zM25.26 25.199l13.6 272C39.499 309.972 50.041 320 62.83 320h66.34c12.789 0 23.331-10.028 23.97-22.801l13.6-272C167.425 11.49 156.496 0 142.77 0H49.23C35.504 0 24.575 11.49 25.26 25.199z">
                </path>
            </svg>
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
  import TaskList from './TaskList.vue'
  export default {
    data () {
      return {

      }
    },
    computed: {
      mediaQueries(){
        return {
          // 'details--mobile': this.$mq === 'mobile',
          // 'details': !this.$mq === 'mobile',
          // 'card-body--mobile': this.$mq === 'mobile',
          // 'card-body': !this.mq === 'mobile'
          // not quite finished! fix these! 
        }
      }
    },
    props: {
      due: String,
      contact: String,
      steps: Array,
    }
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
}

.step-important-svg {
  height: 1.6rem;
}
.important-svg-path {
  fill: #00D6A4;
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
