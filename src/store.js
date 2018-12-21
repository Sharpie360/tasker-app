import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    num_currentTasks: 0,
    num_completeTasks: 0,
    num_onTime: 0,
    num_late: 0,
    percentOnTime: ''
  },
  mutations: {
    updateCurrentTaskCount(state, value) {
      state.num_currentTasks = value
    },
    updateCompleteTaskCount(state, value) {
      state.num_completeTasks = value
    },
    updateOnTimeCount(state) {
      state.num_onTime++
    }
  },
  actions: {
    updateCurrentTaskCount(context, value) {
      context.commit('updateCurrentTaskCount', value)
    },
    updateCompleteTaskCount(context, value) {
      context.commit('updateCompleteTaskCount', value)
    },
    updateOnTimeCount(context) {
      context.commit('updateOnTimeCount')
    }

  }
})

export default store