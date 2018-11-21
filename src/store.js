export const store = new Vue({
  data () {
    return {
      num_CurrentTasks: 0,
      num_CompletedTasks: 0,
      num_TotalStepsCompleted: 0,
      num_CompletedTaskOnTime: 0,
      num_CompletedTaskLate: 0,
      completedOnTimeRatio: getRatio()
    }
  },
  methods: {
    getRatio() {
      
    }
  }
})
