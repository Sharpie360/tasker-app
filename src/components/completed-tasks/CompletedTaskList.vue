<template>
  <div>
    <div class="card display-wrapper" v-show="showCompletedTasksCmp">
      <ul class="list-group">
        <li 
          v-for="(task, taskIndex) in completedTaskList"
          :key="taskIndex"
          class="list-group-item">
          <h3>{{ task.task }}</h3>
          <div class="card">
            <div class="card-body">
              <h5 class="flexbox-space-between">
                <span>Completed Steps</span>
                <span>Importance</span>
              </h5>
              <ul class="list-group list-group-flush mt-2">
                <li 
                  class="list-group-item py-2 flexbox-space-between" 
                  v-for="(step, i) in task.details.steps" 
                  :key="i">
                  <span>{{ step.value }}</span> 
                  <span>{{ checkStepImportance(step) }}</span>
                </li>
              </ul>
              <div class="card-header">
                <div class="flexbox-space-between">
                  <h6 class="mb-0"> 
                    Date Due: {{ task.details.due }}
                  </h6> 
                  <h6 class="mb-0">
                    Date Completed: {{ task.details.completedDate }}
                  </h6>
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { eventBus } from '../../main.js'
export default {
  data () {
    return {
      completedTaskList: [
        { 
          _id: 0,
          task: "Work on Tasker App", 
          task_detailsShown: true,
          details: {
            due: '10/22/18',
            completedDate: '11/6/18',
            contact: 'n/a' , 
            steps: [
              { 
                value: 'write code in VUE!',
                editMode: false,
                isImportantStep: true,
                isOptionalStep: false,
                stepCompleted: false
              }, 
              {
                value: 'style stuff',
                editMode: false,
                isImportantStep: false,
                isOptionalStep: true,
                stepCompleted: false

              }, 
              {
                value: 'groove out',
                editMode: false,
                isImportantStep: false,
                isOptionalStep: false,
                stepCompleted: false

              }
            ]
          } 
        },
      ]
    }
  },
  props: ['showCompletedTasksCmp'],
  methods: {
    getCurrentDate(){
      const today = new Date();
      const cleanedDate = today.toLocaleDateString()
      return cleanedDate
    },
    checkStepImportance(step) {
      let word = 'Normal';
      if(step.isImportantStep && !step.isOptionalStep) {
        word = 'Important'
      } else if(!step.isImportantStep && step.isOptionalStep) {
        word = 'Optional'
      } else if (step.isImportantStep && step.isOptionalStep) {
        word = 'Important/Optional'
      }
      return word
    },
    saveCompletedTaskListData() {
      const completedTaskData = JSON.stringify(this.completedTaskList);
      localStorage.setItem('completed-task-data', completedTaskData)
    }
  },
  created() {
    if(localStorage.getItem('completed-task-data')) {
      console.log(localStorage.getItem('completed-task-data'))
      this.completedTaskList = JSON.parse(localStorage.getItem('completed-task-data'))
    } else {
      console.log('no completed task data found...')
    }
  },
  mounted() {
    eventBus.$on('sendTaskToCompletedList', task => {
      console.log(task)
      this.completedTaskList.push({
        _id: task._id,
        task: task.task,
        details: {
          due: task.details.due,
          completedDate: this.getCurrentDate(),
          contact: task.details.contact,
          steps: task.details.steps
        }
      })
      this.saveCompletedTaskListData()
    })
  },
}
</script>

<style>

.flexbox-space-between {
  display: flex;
  flex: 1;
  justify-content: space-between;
}


</style>
