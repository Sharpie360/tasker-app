<template>
  <div class="card">
    <ul class="list-group">
      <li 
        v-for="task in taskList" 
        :key="task"
        class="list-group-item">
        <h3> {{ task.task }}</h3>
        <!-- <input 
          type="checkbox" 
          name="completed"
          class="checkbox"
          v-model="task.completed"
        > -->
        <p class="mb-0">Details</p>
        
        
      </li>
    </ul>
  </div>
</template>

<script>
  import { eventBus } from '../main.js'

  export default {
    data () {
      return {
        taskList: [
          { 
            task: "Work on Tasker App", completed: true, details: {
              due: '10/22/18',
              contact: 'n/a' , 
              steps: [
                'write code', 'style stuff', 'groove out'
              ]
            } 
          },
          { 
            task: "Livestream Tasker coding", completed: false,
            details: {
              due: '10/21/18',
              contact: 'Youtube Peeps!' , 
              steps: [
                'write code', 'style stuff', 'groove out'
              ]
            } 
          },
          { task: "Take over the world!!", completed: false },
        ]
      }
    },
    methods: {

    },
    created() {
      eventBus.$on('newTaskAdded', newTaskData => {
        this.taskList.push({
          task: newTaskData,
          completed: false
        })
      })
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
