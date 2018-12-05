<template>
  <div>
    <div class="card display-wrapper">
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
              <div 
                class="card-header"
                :class="{ 'completed-late': !checkIfCompletedOnTime(taskIndex), 'on-time': checkIfCompletedOnTime(taskIndex) }">
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
    checkIfCompletedOnTime(index) {
      const dueDone = new Date(this.completedTaskList[index].details.due)
      const dueTime = dueDone.getTime()

      const actualDone = new Date(this.completedTaskList[index].details.completedDate)
      const actualTime = actualDone.getTime()
      const timeDiff = dueTime - actualTime
      if(timeDiff > 0) {
        console.log('on time')
        return true
      }
      else {
        console.log('late')
        return
      }
    },
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

.on-time {
  background-color: rgba(0, 214, 164, .5);
}
.completed-late {
  background-color: rgba(214, 35, 35, .3);
}

</style>
