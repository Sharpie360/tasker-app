<template>
  <div class="input-control form-group mt-5">
    <h4>Add Task</h4>
    <input 
      type="text" 
      id="addInput" 
      class="form-control mb-3" 
      v-model="newTask"
    >
    <button 
      id="add" 
      class="btn btn-info"
      @click="addTask()">
      Add New Task
    </button>
  </div>
</template>

<script>
  import { eventBus } from '../main.js'

  export default {
    data () {
      return {
        newTask: '',
        due: '',
        contact: '',
        steps: []
      }
    },
    methods: {
      addTask() {
        const taskToAdd = this.newTask
        eventBus.$emit('newTaskAdded', taskToAdd)
        this.newTask = ''
      }
    }
  }
</script>

<style>



</style>
