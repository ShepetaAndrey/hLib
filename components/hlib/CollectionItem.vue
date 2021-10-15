<template>
  <nuxt-link :to="collectionLink(collectionId)" style="text-decoration: none">
    <v-card hover tile class="mb-5">
      <v-flex row wrap class="ma-0 brown lighten-1 white--text">
        <v-col class="d-flex title font-weight-bold">{{ collectionId }}</v-col>
        <v-col class="d-flex justify-end font-weight-regular">
          Books: {{ getById(collectionId).books.length }}
        </v-col>
      </v-flex>
      <v-col>
        <v-flex row justify-center align-self-center>
          <hlib-book-item
            v-for="bookId in getPreviewBooks(collectionId)"
            :key="bookId"
            :bookId="bookId"
            class="ma-1 ma-sm-1 ma-md-0 col-5 col-sm-3 col-md-4 col-lg-2"
          />
        </v-flex>
      </v-col>
    </v-card>
  </nuxt-link>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  props: {
    collectionId: {
      type: String,
      required: true,
    },
  },
  computed: {
    ...mapGetters('collection', ['getById', 'getPreviewBooks']),
  },
  methods: {
    collectionLink(collectionId) {
      return '/collection/' + collectionId;
    },
  },
};
</script>
