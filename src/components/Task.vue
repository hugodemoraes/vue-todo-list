<template>
  <v-flex xs12>
    <v-list class="mt-5">
      <v-list-tile avatar v-for="task in tasks" :key="task.id">
        <v-list-tile-action>
          <v-checkbox v-model="task.completed" @change="onCompleteTask" ></v-checkbox>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title :class="task.completed ? 'completedTask' : null">{{ task.description }}</v-list-tile-title>
        </v-list-tile-content>
        <v-list-tile-action v-if="!task.completed">
          <app-edit-dialog :task="task"></app-edit-dialog>
        </v-list-tile-action>
      </v-list-tile>
    </v-list>    
  </v-flex>
</template>

<script>
  export default {
    props: ['tasks'],
    data () {
      return {
        dialog: false
      }
    },
    methods: {
      onCompleteTask () {
        this.$store.dispatch('setTasks', this.tasks)
      }
    }
  }
</script>
