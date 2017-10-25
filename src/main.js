import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App'
import { store } from './store'

import TasksComponent from './components/Task.vue'
import EditDialog from './components/EditDialog.vue'

Vue.use(Vuetify)

Vue.config.productionTip = false

Vue.component('app-tasks', TasksComponent)
Vue.component('app-edit-dialog', EditDialog)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  render: h => h(App),
  created () {
    this.$store.dispatch('loadTasks')
  }
})
