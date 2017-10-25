<template>
  <v-app light>
    <v-toolbar fixed app clipped-left>
      <v-toolbar-title class="primary--text">{{ title }}</v-toolbar-title>
    </v-toolbar>
    <main>
      <v-content>
        <v-container fluid>
          <v-slide-y-transition mode="out-in">
            <v-layout row wrap>
              <v-flex xs12 v-if="loading">
                <v-progress-linear v-bind:indeterminate="loading"></v-progress-linear>
              </v-flex>
              <v-flex xs12 md10 lg8 offset-md1 offset-md2>
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                      name="newTask"
                      label="Add a task"
                      prepend-icon="fa-plus"
                      v-model="newTask"
                      single-line
                      v-if="!loading"
                      v-on:keyup.enter="addTask"></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <v-switch v-bind:label="'Show completed tasks'" v-model="showCompleted" @change="loadTasks"></v-switch>
                  </v-flex>
                </v-layout>
                <v-layout row v-if="tasks !== null && tasks.length > 0">
                  <app-tasks :tasks="tasks"></app-tasks>
                </v-layout>
              </v-flex>
            </v-layout>
          </v-slide-y-transition>
        </v-container>
      </v-content>
    </main>
    <v-footer fixed app>
      <v-spacer></v-spacer>
      <span>Made with <v-icon color="red darken-3" style="font-size: 16px">fa-heart</v-icon> by <b>Hugo de Moraes</b></span>
    </v-footer>
  </v-app>
</template>

<script>
  export default {
    data () {
      return {
        title: 'TODO LIST',
        newTask: '',
        showCompleted: true
      }
    },
    computed: {
      loading () {
        return this.$store.getters.loading
      },
      tasks () {
        return this.$store.getters.tasks
      },
      isValidTask () {
        return this.newTask !== ''
      }
    },
    methods: {
      addTask () {
        if (!this.isValidTask) {
          return
        }
        this.$store.dispatch('addTask', this.newTask)
        this.newTask = ''
      },
      loadTasks (newValue) {
        this.$store.dispatch('loadTasks', newValue)
      }
    }
  }

</script>

<style lang="stylus">
  @import './stylus/theme'
  @import './stylus/main'
</style>
