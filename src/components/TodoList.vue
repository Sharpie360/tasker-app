<template>
  <div class="todo-list card">
    <ul class="list-group">
      <li 
        v-for="todo in todos" 
        :key="todo"
        class="list-group-item">
        <h3> {{ todo.task }}</h3>
        <input 
          type="checkbox" 
          name="completed"
          class="checkbox"
          v-model="todo.completed"
          >
        
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        todos: [
          { task: "Work on Todo App", completed: true },
          { task: "Livestream Bloginator colorizing", completed: false },
          { task: "Take over the world!!", completed: false },
        ]
      }
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
