<template>
  <v-dialog max-width="600px" v-model="dialog">
    <v-btn flat slot="activator" class="success">Add New Book</v-btn>
    <v-card>
      <v-card-title>
        <h2>Add a New Book</h2>
      </v-card-title>
      <v-card-text>
        <v-form class="px-3" ref="form" @submit.prevent="submit">
          <v-text-field v-model="isbn" label="isbn" prepend-icon="edit" :rules="isbnField"></v-text-field>
          <v-text-field v-model="title" label="Title" prepend-icon="folder" :rules="inputRules"></v-text-field>
          <v-text-field v-model="Author" label="Author" prepend-icon="person" :rules="inputRules"></v-text-field>
          <v-text-field v-model="Bookvol" label="Bookvol" prepend-icon="folder" :rules="inputRules"></v-text-field>
          <v-spacer></v-spacer>
          <v-btn flat type="submit" class="success mx-0 mt-3" :loading="loading">Add Book</v-btn>
          <v-btn class="greycancel mt-3" @click.stop="$emit('close')">Cancel</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import axios from 'axios'
import format from 'date-fns/format'
const isbn = require( 'isbn-validate' )
import StackModal from '@innologica/vue-stackable-modal';

export default {
  data() {
    return {
      isbn: '',
      title: '',
      Author: '', 
      Bookvol: '',  
      userId: '', 
      inputRules: [
        v => !!v || 'This field is required',
        v => v.length >= 3 || 'Minimum length is 3 characters'
      ],
      isbnField: [
        v => !!v || 'This field is required', 
        v => isbn.Validate(v) || 'The value is not valid ISBN'
      ], 
      loading: false,
      dialog: false, 
      cancel: false, 
    }
  },
  methods: {
    submit() {
      console.log(localStorage.getItem('user'))
      if(this.$refs.form.validate()) {
        this.loading = true; 
        const book = { 
          isbn: this.isbn,
          name: this.title,
          bookauthor: this.Author,
          bookvol: this.Bookvol,
          userId: Number(localStorage.getItem('user'))
        } 
        console.log(book)
        this.axios.post('http://localhost:3000/books', book) .then(() => {
          this.loading = false
          this.dialog = false
        })
      }    
    }, 
    exit() {
     //
    }
  },
}
</script>

<style>
  .greycancel {
  float: right;
}
</style>
