<template>
  <div>
    <v-flex
      :v-if="collectionIdList.length"
      column
      v-for="id in collectionIdList"
      :key="id"
    >
      <nuxt-link :to="collectionLink(id)" style="text-decoration: none">
        <v-card hover tile class="my-5">
          <v-flex row wrap class="ma-0 brown lighten-1 white--text">
            <v-col class="d-flex title font-weight-bold">{{ id }}</v-col>
            <v-col class="d-flex justify-end font-weight-regular">
              Books: {{ getById(id).books.length }}
            </v-col>
          </v-flex>
          <v-col>
            <v-flex row justify-center align-self-center class="ma-0">
              <v-img
                class="ma-1 ma-sm-1 ma-md-0 col-5 col-sm-3 col-md-4 col-lg-2"
                contain
                aspect-ratio="1"
                max-height="200px"
                max-width="150px"
                v-for="bookId in getPreviewBooks(id)"
                :key="bookId"
                :src="$books.getCover({ id: bookId }, (zoom = 2))"
              />
            </v-flex>
          </v-col>
        </v-card>
      </nuxt-link>
    </v-flex>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  props: {
    collectionIdList: {
      type: Array,
      required: true,
    },
  },
  computed: {
    ...mapGetters('collection', ['getById', 'getPreviewBooks']),
  },
  methods: {
    collectionLink(id) {
      return '/collection/' + id;
    },
  },
};
</script>
