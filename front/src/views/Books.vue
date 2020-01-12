<template>
  <div class="books">
    <h1 class="subheading grey--text">Books</h1>

    <v-container class="my-5">
      <v-expansion-panel>
        <v-expansion-panel-content v-for="book in myBooks" :key="book.books">
          <div slot="header" class="py-1">{{ book.books }}</div>
          <v-card>
            <v-card-text class="px-4 grey--text">
              <div class="font-weight-bold">Due by {{ book.books }}</div>
              <div>{{ book.content }}</div>
            </v-card-text>
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-container>
    
  </div>
</template>

<script>

export default {
  data() {
    return {
      books: []
    }
  },
  computed: {
    myBooks() {
      return this.books.filter(book => {
        return book.person === 'undraaaaaaaaaa' && book.status != 'complete'
      })
    }
  },
  created() {
    //
  }
}
</script>
