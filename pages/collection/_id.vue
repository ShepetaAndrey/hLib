<template>
  <v-content>
    <v-container>
      <v-flex class="text-center display-1 justify-center">{{ collectionId }}</v-flex>
      <v-divider class="my-5"></v-divider>
      <v-flex justify-center row>
        <v-btn nuxt to="/search" class="d-flex my-3">Add book</v-btn>
        <v-switch class="d-flex ml-3" v-model="removeProcess" light label="Remove mode"></v-switch>
      </v-flex>
      <v-divider class="my-5"></v-divider>
      <v-flex row>
        <div class="col-6 col-sm-3 col-md-2 col-lg-2" v-for="id in listOfBookIds" :key="id">
          <nuxt-link :to="bookLink(id)">
            <v-card hover class="py-3">
              <v-img height="150px" contain :src="$books.getCover({ id: id })"></v-img>
              <v-btn
                v-if="removeProcess"
                @click.prevent="removeBookFromCollection(id)"
                rounded
                small
                fab
                class="red delete-btn"
              >
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </v-card>
          </nuxt-link>
        </div>
      </v-flex>
    </v-container>
  </v-content>
</template>

<script>
export default {
  data() {
    return {
      collectionId: this.$route.params.id,
      books: [],
      removeProcess: false
    };
  },
  computed: {
    listOfBookIds() {
      const data = this.$store.getters['collection/getById'](this.collectionId);
      if (typeof data !== 'undefined') {
        return this.$store.getters['collection/getById'](this.collectionId)
          .books;
      } else {
        return [];
      }
    }
  },
  mounted() {
    this.$store.commit('collection/initState', {
      collections: localStorage.getItem('collections')
    });
  },
  methods: {
    async getBookInfo(bookId) {
      return await this.$books.getBook(bookId);
    },
    bookLink(id) {
      return '/book/' + id;
    },
    removeBookFromCollection(bookId) {
      this.$store.commit('collection/deleteBook', {
        bookId: bookId,
        collectionId: this.collectionId
      });
    }
  }
};
</script>

<style>
.delete-btn {
  position: absolute;
  top: -10px;
  right: -10px;
}
</style>
