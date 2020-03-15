<template>
  <div class="dashboard">
    <h1 class="subheading grey--text">Dashboard</h1>
    <v-container class="my-5">
      <v-layout row justify-start class="mb-3">
        <v-toolbar dense>
          <v-text-field hide-details prepend-icon="search" v-model="searchValue" @change="() => search()" placeholder="Search title.."></v-text-field>
        </v-toolbar> 
      </v-layout>
      <v-card flat v-for="book in books" :key="book.id">
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

            <v-btn type="button" v-on:click="exchange(`${book.id}`)" rounded color="purple" dark>Book Exchange</v-btn>
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
      searchValue: '',
      isExchange: false,
      userId: '', 
    }
  },
  methods : {
    async search(){  
      if(this.searchValue != null){
        axios.get('http://localhost:3000/books?filter=' + this.searchValue)
        .then(response =>  {
          this.books = response.data;
          console.log(this.books)
        })
        .catch(function(error){
          console.log('error'); 
        })
      }
    }, 
    async exchange(bookId){
        this.isExchange = true;
        const values = {
          userId: Number(localStorage.getItem('user')), 
          bookId: Number(bookId)
        }
        this.axios.post('http://localhost:3000/exchanges', values) .then(() => {
          this.isExchange = false
        })
      }
  }, 
  beforeMount(){
    this.search(); 
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