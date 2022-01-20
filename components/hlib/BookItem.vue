<template>
  <div style="max-width: 150px; max-height: 200px">
    <v-img
      contain
      aspect-ratio="1"
      :src="bookCoverLink"
    />
    <p class="text-center text-truncate mb-0">{{ title }}</p>
    <div class="d-flex justify-center">
      <v-rating
        color="warning"
        dense
        hover
        length="5"
        size="18"
        :value="rating"
      ></v-rating>
    </div>
  </div>
</template>

<script>
import { getBook } from '@/services/api/google-books';

import BookMapper from '@/utils/mappers/book';
import { getCoverLink } from '@/utils/mappers/bookCover';

export default {
  props: {
    bookId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      book: undefined,
      rating: Math.floor(Math.random() * 5),
    };
  },
  computed: {
    title() {
      return this.book?.title;
    },
    bookCoverLink() {
      return getCoverLink(this.bookId);
    },
  },
  async created() {
    if (!this.$isServer) {
      const result = await getBook(this.bookId);
      this.book = new BookMapper(result);
    }
  },
};
</script>
