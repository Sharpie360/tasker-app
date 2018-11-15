<template>
  <div class="flexbox-space-between">
    <div>
      <button
        v-show="task.completed"
        @click="archiveTask(i)"
        id="task-btn--archive"
        class="btn btn-primary mr-2 py-1">
          Archive Task
      </button>
    </div>
    <div>
      <button 
        id="task-btn--edit-details"
        class="btn btn-info mr-2 py-1">
        Edit Details
      </button>
      <button 
        @click="deleteTask(task, i)"
        id="task-btn--delete"
        class="btn btn-danger mr-0 py-1">
        Delete Task
      </button>
    </div>
  </div>
</template>

<script>
import { eventBus } from '../../main.js'

export default {
  data () {
    return {

    }
  },
  props: ['task', 'i'],
  methods: {
    deleteTask(task, i){
      if(confirm(`Are you sure you want to delete this task? Task: ${task.task}`)) {
        eventBus.$emit('deleteTask', i)
      }
    },
    archiveTask(i){
      eventBus.$emit('archiveTask', i)
    }
  }
}
</script>

<style>

</style>
