<template>
    <svg 
      class="step-optional-svg pointer" 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 430 512"
      >
        <path 
          class="optional-svg-path"
          :class="{ 'optional-true': this.optional }"
          fill="currentColor" 
          d="M202.021 0C122.202 0 70.503 32.703 29.914 91.026c-7.363 10.58-5.093 25.086 5.178 32.874l43.138 32.709c10.373 7.865 25.132 6.026 33.253-4.148 25.049-31.381 43.63-49.449 82.757-49.449 30.764 0 68.816 19.799 68.816 49.631 0 22.552-18.617 34.134-48.993 51.164-35.423 19.86-82.299 44.576-82.299 106.405V320c0 13.255 10.745 24 24 24h72.471c13.255 0 24-10.745 24-24v-5.773c0-42.86 125.268-44.645 125.268-160.627C377.504 66.256 286.902 0 202.021 0zM192 373.459c-38.196 0-69.271 31.075-69.271 69.271 0 38.195 31.075 69.27 69.271 69.27s69.271-31.075 69.271-69.271-31.075-69.27-69.271-69.27z">
        </path>
    </svg>
</template>

<script>
  export default {
    props: ['optional']
  }
</script>

<style>
  .step-optional-svg {
    flex: 1;
    height: 1.75rem;
    width: 1.75rem
  }
  .optional-svg-path {
    fill: rgba(0, 0, 0, .25);
    transition: fill 0.1s ease-in-out;
  }
  .optional-svg-path.optional-true {
    fill: #006473;
  }
</style>
