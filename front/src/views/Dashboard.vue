<template>
  <div class="dashboard">
    <h1 class="subheading grey--text">Dashboard</h1>
    <v-container class="my-5">
      <v-layout row justify-start class="mb-3">
        <v-toolbar dense>
          <v-text-field hide-details prepend-icon="search" single-line placeholder="Search title.."></v-text-field>
        </v-toolbar> 
      </v-layout>
      <v-card flat v-for="book in books" :key="book.books">
        <v-layout row wrap :class="`pa-3 book ${book.status}`">
          <!-- <v-flex xs4 sm4 md2> -->
            <v-flex md4>
            <div class="caption grey--text">Номны нэр</div>
            <div>{{ book.name }}</div>
          </v-flex>
          <v-flex md2>
            <div class="caption grey--text">Зохиолч</div>
            <div>{{ book.bookauthor }}</div>
          </v-flex>
          <v-flex md2>
            <div class="caption grey--text">Боть, Төрөл</div>
            <div>{{ book.bookvol }}</div>
          </v-flex>
          <v-flex md2>
            <div class="caption grey--text">ISBN</div>
            <div>{{ book.isbn }}</div>
          </v-flex>
          <v-btn rounded color="purple" dark>Book Exchange</v-btn>
          <!-- <v-flex xs2 sm4 md2>
            <div class="right">
              <v-chip small :class="`${book.status} white--text my-2 caption`">{{ book.status }}</v-chip>
            </div>
          </v-flex> -->
        </v-layout>
        <v-divider></v-divider>
      </v-card>

    </v-container>
   
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      books: []
    }
  },
  created() {
    axios.get('http://localhost:3000/books').then(response => this.books = response.data);
  },
  methods : {
    SearchContacts : function () {
      axios.get('http://localhost:3000/books', {
          params: {
              //
          }
      })
      .then(response => this.contacts = response.data)
      .catch(function (error) {
          console.log(error);
      });
    },
  }
}
</script>

<style>

.project.complete{
  border-left: 4px solid #3cd1c2;
}
.project.ongoing{
  border-left: 4px solid #ffaa2c;
}
.project.overdue{
  border-left: 4px solid #f83e70;
}
.v-chip.complete{
  background: #3cd1c2;
}
.v-chip.ongoing{
  background: #ffaa2c;
}
.v-chip.overdue{
  background: #f83e70;
}

</style>
