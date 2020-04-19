<template>
  <v-content light class="white">
    <v-container align="start" justify="center" class="justify-center">
      <v-container>
        <v-row align="center" justify="center">
          <v-col v-for="book in books" :key="book.title" md3>
            <v-card class="pa-4" hover>
              <v-img :src="book.src" class="mx-auto" height="250" width="150"></v-img>
              <p class="text-center ma-0 mt-3">{{ book.title }}</p>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-container>
  </v-content>
</template>

<script>
export default {
  data() {
    return {
      books: [
        {
          src: './war-and-peace.jpg',
          title: 'War and peace'
        },
        {
          src: './children-bookcover.png',
          title: 'Children book'
        },
        {
          src: './harry-potter-and-the-sorcerers-stone.jpg',
          title: 'Harry potter'
        }
      ]
    };
  }
};
</script>
