<template>
  <v-content light class="white">
    <v-row
      justify="center"
      align="center"
      class="mx-auto pa-6"
      style="max-width: 600px;"
    >
      <v-icon size="4em">mdi-magnify</v-icon>
      <span class="display-3">Search for a book</span>
    </v-row>
    <v-row justify="center">
      <v-col style="max-width: 650px;">
        <search-input />
      </v-col>
    </v-row>
    <v-row
      justify="center"
      align="center"
      class="mx-auto d-flex flex-column"
      style="max-width: 600px;"
    >
      <v-card
        v-for="book in books"
        :key="book.title"
        width="100%"
        class="mb-1 d-flex flex-row"
        outlined
      >
        <v-col class="col-md-3" lg3>
          <v-img
            :src="book.src"
            width="100"
            height="150"
            class="mx-auto"
          ></v-img>
          <v-rating v-model="rating" size="25" dense></v-rating>
        </v-col>
        <v-col class="col-md-9" lg9>
          <p>{{ book.title }}</p>
          <p style="overflow: hide;">
            <i>{{ book.description }}</i>
          </p>
        </v-col>
      </v-card>
    </v-row>
  </v-content>
</template>

<script>
import Search from '~/components/Search.vue';
export default {
  components: {
    'search-input': Search
  },
  data() {
    return {
      books: this.$store.state.books,
      rating: this.$store.state.rating
    };
  }
};
</script>
