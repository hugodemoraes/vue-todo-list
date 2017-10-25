<template>
  <v-dialog v-model="editDialog" persistent max-width="350px">
    <v-btn icon slot="activator">
      <v-icon class="secondary--text">fa-pencil</v-icon>
    </v-btn>
    <v-card>
      <v-card-title class="headline">Edit task</v-card-title>
      <v-card-text>
        <v-container grid-list-md>
          <v-layout wrap>
            <v-flex xs12>
              <v-text-field label="Description" v-model="editedDescription" required></v-text-field>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" flat @click.native="editDialog = false">Cancel</v-btn>
        <v-btn color="primary" flat @click="update(task)">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    props: ['task'],
    data () {
      return {
        editDialog: false,
        editedDescription: this.task.description
      }
    },
    methods: {
      update () {
        if (this.editedDescription === '') {
          return
        }
        this.$store.dispatch('updateTask', {
          date: this.task.date,
          description: this.editedDescription
        })
        this.editDialog = false
      }
    }
  }
</script>
