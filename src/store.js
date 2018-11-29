import Vue from 'vue'
import { eventBus } from './main'

export const store = new Vue({
  data () {
    return {
      num_CurrentTasks: 0,
      num_CompletedTasks: 0,
      num_TotalStepsCompleted: 0,
      num_CompletedTaskOnTime: 0,
      num_CompletedTaskLate: 0,
      completedOnTimeRatio: this.getRatio
    }
  },
  computed: {
    getRatio() {
      
    }
  },
  methods: {
    updateNum_CurrentTasks(numOfTasks) {
      this.num_CurrentTasks = numOfTasks
      console.log(this.num_CurrentTasks)
      eventBus.$emit('updatedCurrentTasksCount', this.num_CurrentTasks)
    }
  }
})
