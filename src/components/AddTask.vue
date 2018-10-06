<template>
  <div class="input-control">
    <h4>Add a Task</h4>
    <input type="text" name="" id="" v-model="newTask">
    <button 
      id="add" 
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
        newTask: ''
      }
    },
    methods: {
      addTask() {
        const taskToAdd = this.newTask
        eventBus.$emit('newTaskAdded', taskToAdd)
      }
    }
  }
</script>

<style>

</style>
