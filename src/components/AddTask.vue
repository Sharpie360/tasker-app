<template>
  <div class="input-control form-group mt-5">
    <h3>Add Task</h3>
    <input 
      type="text" 
      id="addInput" 
      class="form-control mb-3" 
      v-model="newTask"
    >
    <div class="card">
      <h5 class="card-header add-details-header">Add Additional Details
        <span 
          class="add-details-expander" 
          v-on:click="showAddDetailsCmp">+</span>
      </h5>
      
      <div class="card-body" v-show="detailsShown">
        <div class="grid">
          <div class="form-group">
            <label for="due-date">Due Date</label>
            <input class="form-control" type="date" id="due-date">
          </div>
          <div class="form-group">
            <label for="contact">Contact Info</label>
            <input class="form-control" type="text" id="contact">
          </div>
        </div> <!-- .grid end -->
        <div class="card">
          <h6 class="card-header">Add Task Step</h6>
          <div class="card-body py-1 px-0">
            <ul class="list-group list-group-flush">
              <li class="list-group-item py-2" v-for="(step, i) in steps" :key="step">
                <div class="form-group step-group">
                  <label class="step-group--label" :for="steps[i].i">Step {{ ++i }}.</label>
                  <input class="form-control step-group--input" type="text" :id="step[i].i" :value="step">
                  <div class="step-group--actionBtns">
                    <img src="" alt="icon button delete step" class="actionBtn actionBtn-icon">
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
        <h5>Add New Task</h5>
      </button>
    </div>
  </div>
</template>

<script>
  import { eventBus } from '../main.js'

  export default {
    data () {
      return {
        detailsShown: false,
        newTask: '',
        due: '',
        contact: '',
        steps: ["a test step", "another damn test step!"]
      }
    },
    methods: {
      addNewTask() {
        const taskToAdd = this.newTask
        eventBus.$emit('newTaskAdded', taskToAdd)
        this.newTask = ''
      },
      addDetailsToNewTask() {

      },
      showAddDetailsCmp(){
        console.log(this.detailsShown)
        this.detailsShown = !this.detailsShown
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

.step-group {
  display: flex;
  flex: 1;
}
.step-group--label {
  flex: 1;
}
.step-group--input {
  flex: 4;
}
.step-group--actionBtns {

}
</style>
