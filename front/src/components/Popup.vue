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
          <v-text-field v-model="Author" label="Author" prepend-icon="folder" :rules="inputRules"></v-text-field>
          <v-text-field v-model="Bookvol" label="Bookvol" prepend-icon="folder" :rules="inputRules"></v-text-field>
          <!-- <v-file-input v-model="File" label="File input" filled prepend-icon="mdi-camera" :rules="inputRules"></v-file-input> -->

          <v-menu v-model="menu" :close-on-content-click="false">
            <!-- <v-text-field slot="activator" :rules="inputRules"
              :value="formattedDate" clearable label="Due date" prepend-icon="date_range">
            </v-text-field>  -->
            <v-date-picker v-model="due" @change="menu = false"></v-date-picker>
          </v-menu>
          <v-spacer></v-spacer>
          <v-btn flat type="submit" class="success mx-0 mt-3" :loading="loading">Add Book</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import axios from 'axios'
import format from 'date-fns/format'
const isbn = require( 'isbn-validate' );

export default {
  data() {
    return {
      isbn: '',
      title: '',
      Author: '', 
      Bookvol: '', 
      // File:'', 
      due: null,
      menu: false,
      inputRules: [
        v => !!v || 'This field is required',
        v => v.length >= 3 || 'Minimum length is 3 characters'
      ],
      isbnField: [
        v => !!v || 'This field is required', 
        v => isbn.Validate(v) || 'The value is not valid ISBN'
      ], 
      loading: false,
      dialog: false
    }
  },
  methods: {
    submit() {
      if(this.$refs.form.validate()) {
        this.loading = true
        const book = { 
          isbn: this.isbn,
          name: this.title,
          bookauthor: this.Author,
          bookvol: this.Bookvol,
          // File: this.File, 
          // due: format(this.due, 'Do MMM YYYY'),
          // person: 'undraaaaaaaaaa',
        } 
        console.log(book)
        this.axios.post('http://localhost:3000/books', book) .then(() => {
          this.loading = false
          this.dialog = false
          this.$emit('booktAdded')
        })
      }    
    }
  },
  // computed: {
  //   formattedDate () {
  //     console.log(this.due)
  //     return this.due ? format(this.due, 'Do MMM YYYY') : ''
  //   }
  // }
}
</script>
