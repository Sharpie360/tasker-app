<template>
  <div class="input-control form-group mt-5">
    <h3>Add Task</h3>
    <input 
      type="text" 
      id="addInput" 
      class="form-control mb-3" 
      v-model="newTask.task"
    >
    <div class="card">
      <h5 class="card-header add-details-header">Add Additional Details
        <span 
          class="add-details-expander" 
          v-on:click="showAddDetailsCmp">+</span>
      </h5>
      
      <div class="card-body" v-show="newTask.addDetails_detailsShown">
        <div class="grid">
          <div class="form-group">
            <label for="due-date">Due Date</label>
            <input class="form-control" type="date" id="due-date" v-model="newTask.due">
          </div>
          <div class="form-group">
            <label for="contact">Contact Info</label>
            <input class="form-control" type="text" id="contact" v-model="newTask.contact">
          </div>
        </div> <!-- .grid end -->


        <div class="card">
          <h5 class="card-header">Add Task Step
            <button 
              class="btn btn-outline-primary py-1 px-3 float-right" 
              id="add-new-step-btn"
              @click="addStepToSteps"
            >Add Step</button>

          </h5>
          <div class="card-body p-0">
            <ul class="list-group list-group-flush">
              <li class="list-group-item py-2" v-for="(step, i) in newTask.steps" :key="step._id">
                <div class="form-group step-group mb-0">
                  <!-- add editmode with vshow -->
                  <label 
                    class="step-group--label mb-0" 
                    :for="newTask.steps[i]">Step {{ i + 1 }}.
                  </label>

                  <input 
                    class="form-control step-group--input" 
                    type="text" 
                    :id="step[i]" 
                    v-model="newTask.steps[i]"
                  >

                  <div class="step-group--actionBtns">
                    <img 
                      src="../assets/exclamation-solid.svg" 
                      alt="icon button important step" 
                      class="actionBtn actionBtn-icon" 
                      id="step-ab-important"
                    >
                    <img 
                      src="../assets/times-solid.svg" 
                      alt="icon button delete step" 
                      class="actionBtn actionBtn-icon"
                      id="step-ab-remove"
                      @click="deleteStep(i)"
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="action-btns mt-3">
      <button 
        id="add" 
        class="btn btn-info"
        @click="addNewTask()">
        <h5 class="mb-0">Add New Task</h5>
      </button>
    </div>
  </div>
</template>

<script>
  import { eventBus } from '../main.js'

  export default {
    data () {
      return {
        newTask: {
          addDetails_detailsShown: false,
          task: '',
          due: '',
          contact: '',
          steps: []
        }
      }
    },
    methods: {
      addNewTask() {
        const newTaskData = this.newTask
        eventBus.$emit('newTaskAdded', newTaskData)
        this.newTask.task = ''
        this.newTask.due = ''
        this.newTask.contact = ''
        this.newTask.steps = []
        this.newTask.addDetails_detailsShown = false
      },
      showAddDetailsCmp(){
        console.log(this.newTask.addDetails_detailsShown)
        this.newTask.addDetails_detailsShown = !this.newTask.addDetails_detailsShown
      },
      addStepToSteps(){
        this.newTask.steps.push('')
      },
      deleteStep(i){
        console.log('deleteClicked', i)
        this.newTask.steps.splice(i, 1)
      }
    }
  }
</script>

<style scoped>
.add-details-header {
  display: flex;
  flex: 1;
  justify-content: space-between
}
.add-details-expander {
  font-size: 2rem;
  margin: -.3rem 0 -.5rem 0;
  cursor: pointer;
}

.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 1rem;
}

#add-new-step-btn {
  font-size: .9rem;
}

.step-group {
  display: flex;
  flex: 1;
  align-items: center;
}
.step-group--label {
  flex: 1;
}
.step-group--input {
  flex: 5;
}
.step-group--actionBtns {
  flex: 1;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}

.actionBtn-icon {
  height: 1.5rem;
  width: 1.5rem;
}
#step-ab-remove {
  height: 2rem
}
</style>
