<template>
  <div class="details-info card">
    <h5 class="card-header addtl-details-title">Additional Details</h5>
    <div class="card-body">
      <div class="addtl-details-group">
        <span class="addtl-details-label">Contact Info:</span>
        <div class="addtl-details-content alert alert-info py-1 pl-3 mb-2">{{ contact }}</div>
      </div>
      <div class="addtl-details-group">
        <span class="addtl-details-label">Due Date:</span>
        <div class="addtl-details-content alert alert-info py-1 pl-3 mb-2">{{ due }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['due', 'contact']
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
