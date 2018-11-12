<template>
  <svg 
    aria-hidden="true" 
    data-prefix="fas" 
    data-icon="angle-left" 
    class="task-detail-expander pointer " 
    role="img" 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 256 512">
      <path 
        class="expander-svg-path"
        :class="{ 'expanded':isExpanded }"
        fill="currentColor" 
        d="M31.7 239l136-136c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9L127.9 256l96.4 96.4c9.4 9.4 9.4 24.6 0 33.9L201.7 409c-9.4 9.4-24.6 9.4-33.9 0l-136-136c-9.5-9.4-9.5-24.6-.1-34z">
      </path>
  </svg>
</template>

<script>
export default {
  props: ['isExpanded']
}
</script>

<style>
  .task-detail-expander {
    height: 2.5rem;
    width: 2rem;
  }
  .expander-svg-path {
    transform-origin: 50%;
    transition: transform .1s cubic-bezier(0.55, 0.085, 0.68, 0.53);
  }
  .expander-svg-path.expanded {
    transform: rotate(-90deg)
  }
</style>
