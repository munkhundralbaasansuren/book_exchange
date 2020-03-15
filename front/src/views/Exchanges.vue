<template>
  <div class="dashboard">
    <h1 class="subheading grey--text">Book Exchange</h1>
    <v-container class="my-5">
      <v-card flat v-for="book in books" :key="book.id">
        <v-layout row wrap :class="`pa-3 book`">
          <!-- <v-flex xs4 sm4 md2> -->
            <v-flex md4>
            <div class="caption grey--text">User Id</div>
            <div>{{ book.userId }}</div>
          </v-flex>
          <v-flex md2>
            <div class="caption grey--text">Book Name</div>
            <div>{{ book.name }}</div>
          </v-flex>
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
      books: [],
      bookId: [],
      userId: '', 
    }
  }, 
  created() {
    const values = {
      userId: Number(localStorage.getItem('user'))
    }

    axios.post('http://localhost:3000/exchanges_data', values)
    .then(response => this.books = response.data);
  },
  methods : {
   //
  },  
}

</script>