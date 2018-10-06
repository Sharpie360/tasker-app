<template>
  <div class="card">
    <ul class="list-group">
      <li 
        v-for="task in taskList" 
        :key="task"
        class="list-group-item">
        <h3> {{ task.task }}</h3>
        <input 
          type="checkbox" 
          name="completed"
          class="checkbox"
          v-model="task.completed"
        >
        
      </li>
    </ul>
  </div>
</template>

<script>


  export default {
    data () {
      return {
        taskList: [
          { task: "Work on Todo App", completed: true },
          { task: "Livestream Bloginator colorizing", completed: false },
          { task: "Take over the world!!", completed: false },
        ]
      }
    },
    methods: {

    },
    created() {
      
    }
  }
</script>

<style scoped>
  ul {
    list-style-type: none;
  }
  li {
    display: flex;
    flex: 1;
    justify-content: space-between;
    align-items: center
  }
  h3 {
    margin-bottom: 0;
  }
  .checkbox {
    height: 1rem;
    width: 1rem;
  }

</style>
