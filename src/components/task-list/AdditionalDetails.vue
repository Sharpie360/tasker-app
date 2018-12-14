<template>
  <div class="details-info card">
    <h5 class="card-header addtl-details-title">Additional Details</h5>
    <div class="card-body">
      <div class="addtl-details-group">
        <span class="addtl-details-label">Contact Info:</span>
        <div 
          v-show="!editMode"
          class="
            addtl-details-content 
            alert 
            alert-info 
            py-1 pl-3 mb-2"
          >{{ contact }}</div>
        <input 
          v-show="editMode"
          v-model="newContactInfo"
          type="text" 
          class="form-control" 
        >
      </div>
      <div class="addtl-details-group">
        <span class="addtl-details-label">Due Date:</span>
        <div 
          v-show="!editMode"
          class="
            addtl-details-content 
            alert 
            alert-info 
            py-1 pl-3 mb-2"
          >{{ due }}</div>
        <input 
          v-show="editMode"
          v-model="newDueDate"
          
          type="date" 
          class="form-control">
      </div>
    </div>
  </div>
</template>

<script>
import { eventBus } from '../../main.js'
import moment from 'moment'

function formatDate(date) {
  const newDate = moment
  // const formattedDate = newDate.toLocaleDateString()
  return formattedDate
}

function changeFormatForDatePicker(date){
  const newDate = moment(date)
  console.log(newDate)
}

export default {
  data () {
    return {
      newContactInfo: this.contact,
      newDueDate: changeFormatForDatePicker(this.due),
      editMode: false
    }
  },
  props: ['_id', 'due', 'contact'],
  created() {
    eventBus.$on('editDetailsCE', () => {
      this.editMode = true
      
    })
    eventBus.$on('saveEditsCE', () => {
      const newDetails = {
        _id: this._id,
        newContact: this.newContactInfo,
        newDue: this.newDueDate 
      }
      eventBus.$emit('updateNewDetails', newDetails)
      this.editMode = false
    })
  },
  methods: {

  }
}
</script>

<style>
.addtl-details-title {
  background-color: #03D8CB;
  font-weight: 400;
  font-size: 1.35rem;
  padding: 1rem;
  border-bottom: 1px solid rgba(33, 33, 33, .2);
}
.addtl-details-label {
  font-weight: 600;
}
.card {
  border: 1px solid rgba(33, 33, 33, .4);
}


</style>
