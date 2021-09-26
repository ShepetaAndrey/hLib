<template>
  <v-main light class="white">
    <v-row justify="center" align="center" class="mx-auto pa-6">
      <v-icon size="4em">mdi-magnify</v-icon>
      <span class="display-3">Search for a book</span>
    </v-row>
    <v-row justify="center">
      <v-col style="max-width: 650px">
        <search-input stand-alone-page :srollable="false" />
      </v-col>
    </v-row>
  </v-main>
</template>

<script>
import Search from '~/components/Search.vue';
export default {
  components: {
    'search-input': Search,
  },
  data() {
    return {
      books: this.$store.state.books,
      rating: this.$store.state.rating,
    };
  },
};
</script>
