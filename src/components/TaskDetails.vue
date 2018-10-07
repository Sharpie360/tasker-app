<template>
  <div class="details card-body">
    <div class="details-steps">
      <ul>
        <li v-for="(step, i) in steps" :key="step">
          {{i + 1}}. {{ step }}
        </li>

      </ul>
    </div>
    <div class="details-info">
      <p >Contact Info: {{ contact }}</p>
      <p >Due Date: {{ due }}</p>
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
  padding-left: 0;
}

.details > div {
  border: 1px solid #ccc
}

li {
  margin-left: -1rem;
  list-style: none;
}
p {
  margin-left: 1rem;
}
</style>
