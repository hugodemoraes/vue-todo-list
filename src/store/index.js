import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    loading: false,
    tasks: []
  },
  mutations: {
    setTasks (state, payload) {
      state.tasks = payload
    },
    setLoading (state, payload) {
      state.loading = payload
    }
  },
  actions: {
    loadTasks ({commit}, payload) {
      commit('setLoading', true)
      let tasks = localStorage.getItem('tasks')
      if (tasks !== null) {
        tasks = JSON.parse(tasks)
      } else {
        tasks = []
      }
      if (payload !== undefined && payload !== null && !payload) {
        tasks = tasks.filter((task) => {
          return !task.completed
        })
      }
      commit('setTasks', tasks)
      commit('setLoading', false)
    },
    addTask ({commit, getters}, payload) {
      commit('setLoading', true)
      let tasks = getters.tasks
      tasks.push({
        date: Date.now(),
        description: payload,
        completed: false
      })
      localStorage.setItem('tasks', JSON.stringify(tasks))
      commit('setTasks', tasks)
      commit('setLoading', false)
    },
    updateTask ({commit, getters}, payload) {
      commit('setLoading', true)
      const task = getters.tasks.find(task => {
        return task.date === payload.date
      })
      if (payload.description) {
        task.description = payload.description
      }
      localStorage.setItem('tasks', JSON.stringify(getters.tasks))
      commit('setTasks', getters.tasks)
      commit('setLoading', false)
    },
    setTasks ({commit}, payload) {
      commit('setLoading', true)
      localStorage.setItem('tasks', JSON.stringify(payload))
      commit('setTasks', payload)
      commit('setLoading', false)
    }
  },
  getters: {
    tasks (state) {
      return state.tasks.sort((taskA, taskB) => {
        return taskA.date > taskB.date
      })
    },
    loading (state) {
      return state.loading
    }
  }
})
