<template>
  <v-content>
    <v-container>
      <pre>{{ book }}</pre>
    </v-container>
  </v-content>
</template>

<script>
export default {
  data() {
    return {
      bookId: this.$route.params.id,
      book: {}
    };
  },
  async created() {
    this.book = await this.$books.getBook(this.bookId);
  }
};
</script>

<style>
</style>
