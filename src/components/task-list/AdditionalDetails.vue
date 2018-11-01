<template>
  <div class="details-info card">
    <h5 class="card-header addtl-details-title">Additional Details</h5>
    <div class="card-body">
      <p class="card-text">Contact Info: {{ contact }}</p>
      <p class="card-text">Due Date: {{ due }}</p>
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
  font-weight: 300;
  font-size: 1.35rem;
  padding: 1rem;
  border-bottom: 1px solid rgba(33, 33, 33, .2);
}
.card {
  border: 1px solid rgba(33, 33, 33, .4);
}
</style>
