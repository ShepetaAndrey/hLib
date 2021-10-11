<template>
  <nuxt-link :to="collectionLink(collectionId)" style="text-decoration: none">
    <v-card hover tile class="my-5">
      <v-flex row wrap class="ma-0 brown lighten-1 white--text">
        <v-col class="d-flex title font-weight-bold">{{ collectionId }}</v-col>
        <v-col class="d-flex justify-end font-weight-regular">
          Books: {{ getById(collectionId).books.length }}
        </v-col>
      </v-flex>
      <v-col>
        <v-flex row justify-center align-self-center class="ma-0">
          <hlib-book-item
            v-for="bookId in getPreviewBooks(collectionId)"
            :key="bookId"
            :bookId="bookId"
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
