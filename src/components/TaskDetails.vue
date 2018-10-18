<template>
  <div class="details card-body">
    <div class="details-steps">
      <ul class="list-group">
        <li class="list-group-item steps-title">Task Steps</li>
        <li v-for="(step, i) in steps" :key="step" class="list-group-item">
          {{i + 1}}. {{ step }}
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
    props: {
      due: String,
      contact: String,
      steps: []
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

li {
  list-style: none;
  border: 1px solid rgba(33, 33, 33, .4);
}
.steps-title {
  background-color: #00D6A4;
  font-weight: 600;
  font-size: 1.2rem;
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
</style>
