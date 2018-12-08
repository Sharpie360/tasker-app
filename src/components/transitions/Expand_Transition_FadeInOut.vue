<template>
  <transition 
    name="expand" 
    type="transition"
    @before-enter="beforeEnter"
    @enter="enter"
    @after-enter="afterEnter"
    @before-leave="beforeLeave"
    @leave="leave"
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
function fadeIn_Children(el) {
  //console.log(el)
  const elemChildren = el.children
  //console.log(children)
  const children = Array.from(elemChildren)
  let round = 1;
  const interval = setInterval(() => {
    children.forEach(child => {
      child.style.opacity = round / 20
    })
    round++;
    if(round > 20) {
      clearInterval(interval)
    }
  }, 10)
}
function fadeOut_Children(el) {
  //console.log(el)
  const elemChildren = el.children
  //console.log(children)
  const children = Array.from(elemChildren)
  let round = 1;
  const roundMax = 20;
  const interval = setInterval(() => {
    children.forEach(child => {
      child.style.opacity = 1 / roundMax * (roundMax - round) 
    })
    round++;
    if(round > 20) {
      clearInterval(interval)
    }
  }, 10)
}

export default {
  methods: {
    beforeEnter: (el) => {
      setOpacity_Children(el, 0)
    },
    enter: (el, done) => {
      fadeIn_Children(el)
      done()
    },
    // for setOpacity
    afterEnter: el => {
    },
    
    beforeLeave: el => {
    },
    leave: (el, done)=> {
      fadeOut_Children(el)
      done()
    }
    
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