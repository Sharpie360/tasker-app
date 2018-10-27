<template>
    <svg 
      class="step-important-svg"  
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 192 512">
        <!-- Dynamic Styling of the ! icon fixed!!! vvvvv -->
        <path 
          class="important-svg-path"
          :class="{ 'important-true': this.important }"
          fill="currentColor" 
          d="M176 432c0 44.112-35.888 80-80 80s-80-35.888-80-80 35.888-80 80-80 80 35.888 80 80zM25.26 25.199l13.6 272C39.499 309.972 50.041 320 62.83 320h66.34c12.789 0 23.331-10.028 23.97-22.801l13.6-272C167.425 11.49 156.496 0 142.77 0H49.23C35.504 0 24.575 11.49 25.26 25.199z">
        </path>
    </svg>
</template>

<script>
  export default {
    props: ['important'],
  }
</script>

<style>

  .step-important-svg {
    flex: 1;
    height: 1.75rem;
    width: 1.75rem
  }
  .important-svg-path {
    fill: #000;
    transition: fill 0.1s ease-in-out;
  }
  .step-important-svg .important-true {
    fill: #00D6A4;
  }
</style>
