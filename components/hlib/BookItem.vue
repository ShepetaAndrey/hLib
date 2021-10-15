<template>
  <div>
    <v-img
      contain
      aspect-ratio="1"
      max-height="200px"
      max-width="150px"
      :src="bookCoverLink"
    />
    <p class="text-center text-truncate mb-0">{{ title }}</p>
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
