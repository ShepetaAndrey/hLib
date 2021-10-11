<template>
  <v-img
    class="ma-1 ma-sm-1 ma-md-0 col-5 col-sm-3 col-md-4 col-lg-2"
    contain
    aspect-ratio="1"
    max-height="200px"
    max-width="150px"
    :src="$books.getCover({ id: bookId }, (zoom = 2))"
  />
</template>

<script>
export default {
  props: {
    bookId: {
      type: String,
      required: true,
    },
  },
};
</script>
