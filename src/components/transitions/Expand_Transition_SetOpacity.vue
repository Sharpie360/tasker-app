<template>
  <transition 
    name="expand" 
    type="transition"
    @before-enter="beforeEnter"
    @after-enter="afterEnter"
    @before-leave="beforeLeave"
    :css="true"
    >
    <slot></slot>
  </transition>
</template>

<script>

function setOpacity_Children(el, opacity) {
  //console.log(el)
  const elemChildren = el.children
  //console.log(children)
  const children = Array.from(elemChildren)
  children.forEach(child => {
    child.style.opacity = opacity
  })
}


export default {
  methods: {
    beforeEnter: (el) => {
      setOpacity_Children(el, 0)
    },
    // for setOpacity
    afterEnter: el => {
      setOpacity_Children(el, 1)
    },
    
    beforeLeave: el => {
      setOpacity_Children(el, 0)
    },
    
  }
}
</script>

<style>

.expand-default {
  max-height: 30rem;
  height: auto;
}

.expand-enter {
  max-height: 0;
}
.expand-enter-active {
  transition: max-height .1s ease-in-out;
}
.expand-leave-active {
  transition: max-height .1s ease-in-out;
}
.expand-leave-to {
  max-height: 0;
}

</style>


<!--

1. build markup
  1.1 transition cmp
  1.2 slot

2. set up classes

3. set up JS hooks

4. TEST IT!

-->