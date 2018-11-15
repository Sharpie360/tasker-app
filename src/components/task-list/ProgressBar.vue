<template>
  <div class="progress mt-2 mb-3">
    <div 
      class="progress-bar bg-danger" 
      role="progressbar"
      :style="progressValue"
      :aria-valuenow="progressValue.width"
      aria-valuemin="0"
      aria-valuemax="100">

    </div>
  </div>
</template>

<script>
export default {
  props: ['steps'],
  computed: {
    progressValue(){
      let numOfStepsCompleted = 0
      this.steps.forEach(step => {
        if(step.stepCompleted) {
          numOfStepsCompleted++
          // console.log(numOfStepsCompleted)
        }
      })
      if(numOfStepsCompleted === this.steps.length){
        return { 'width': `100%` }
      } else {
        let progress = Math.floor(100 / this.steps.length) * numOfStepsCompleted
        return { 'width': `${progress}%`}
      }

    }
  }
}
</script>

<style>

.progress {
  height: 1rem;
}
.progress-bar {
  transition: width .3s ease-in-out forward;
}

</style>
