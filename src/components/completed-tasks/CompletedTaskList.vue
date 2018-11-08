<template>
  <div>
    <div class="card display-wrapper" v-show="showCompletedTasksCmp">
      <ul class="list-group">
        <li class="list-group-item">
          <h3>{{ completedTaskList[0].task }}</h3>
          <div class="card">
            <div class="card-body">
              <h5 class="flexbox-space-between">
                <span>Completed Steps</span>
                <span>Importance</span>
              </h5>
              <ul class="list-group list-group-flush mt-2">
                <li 
                  class="list-group-item py-2 flexbox-space-between" 
                  v-for="(step, i) in completedTaskList[0].details.steps" 
                  :key="i">
                  <span>{{ step.value }}</span> 
                  <span>{{ step.isImportantStep }}</span>
                </li>
              </ul>
              <div class="card-header">
                <div class="flexbox-space-between">
                  <h6 class="mb-0"> 
                    Date Due: {{ completedTaskList[0].details.due }}
                  </h6> 
                  <h6 class="mb-0">
                    Date Completed: {{ completedTaskList[0].completedDate }}
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
export default {
  data () {
    return {
      completedTaskList: [
        { 
          _id: 0,
          task: "Work on Tasker App", 
          completedDate: '11/6/18', 
          task_detailsShown: true,
          details: {
            due: '10/22/18',
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
  props: ['showCompletedTasksCmp']
}
</script>

<style>

.flexbox-space-between {
  display: flex;
  flex: 1;
  justify-content: space-between;
}


</style>
