<template>
  <v-main
    light
    class="white"
  >
    <v-container>
      <v-row>
        <v-col class="col-12 col-md-3">
          <v-row>
            <div class="col-3 col-md-12">
              <v-img
                :src="require('~/assets/img/cage.jpeg')"
                aspect-ratio="1"
                max-height="150"
                max-width="150"
                class="grey lighten-2 img-rounded"
              >
                <template v-slot:placeholder>
                  <v-row
                    class="fill-height ma-0"
                    align="center"
                    justify="center"
                  >
                    <v-progress-circular
                      indeterminate
                      color="grey lighten-5"
                    ></v-progress-circular>
                  </v-row>
                </template>
              </v-img>
            </div>
            <div class="col-9 col-md-12">
              <h3>{{ name }} {{ lastname }}</h3>
              <small>Telegram</small>
              <h5>
                <a
                  :href="`https://t.me/${telegram}`"
                  target="_blank"
                >
                  {{ '@' + telegram }}
                </a>
              </h5>
              <small>Email</small>
              <h5>
                <a
                  :href="`mailto:${email}`"
                  target="_blank"
                >
                  {{ email }}
                </a>
              </h5>
            </div>
            <div class="col-12">
              <h3>Recommendations</h3>
              <hlib-book-item
                :book-id="bookId"
                v-for="bookId in ['3klAPCIB3hQC', 'R9QnEAAAQBAJ', '9cIPCaHMRAcC']"
                :key="bookId"
              />
            </div>
          </v-row>
        </v-col>
        <v-col class="col-12 col-md-9">
          <div>
            <v-card>
              <v-tabs
                v-model="currentTab"
                color="brown"
                grow
                show-arrows
              >
                <v-tabs-slider color="brown"></v-tabs-slider>
                <v-tab
                  @click="selectTab"
                  v-for="tab in tabs"
                  :key="tab"
                >{{
                  tab
                }}</v-tab>
              </v-tabs>
            </v-card>
          </div>
          <div v-if="isDataLoaded">
            <div v-if="currentType === 'collection'">
              <div class="pa-2"></div>
              <hlib-collection-item
                v-for="collectionId in collectionIdList"
                :key="collectionId"
                :collectionId="collectionId"
              />
            </div>
            <v-flex
              v-else-if="currentType === 'book'"
              row
              class="ma-0"
            >
              <div
                class="col-6 col-sm-3"
                v-for="bookId in bookIdList"
                :key="bookId"
              >
                <nuxt-link :to="bookLink(bookId)">
                  <v-card
                    hover
                    class="py-3"
                  >
                    <hlib-book-item :book-id="bookId" />
                  </v-card>
                </nuxt-link>
              </div>
            </v-flex>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
export default {
  data() {
    return {
      currentTab: 'Collections',
      currentType: 'collection',
      name: 'Nicolas',
      lastname: 'Cage',
      telegram: 'nicolascageofficial',
      email: 'nicolasman@yahoo.com',
      tabs: ['Collections', 'Books'],
      collectionIdList: [],
      libraryIdList: [],
      bookIdList: [],
      isDataLoaded: false,
    };
  },
  created() {
    if (!this.$isServer) {
      this.$store
        .dispatch('collection/fetchCollectionsFromCache')
        .then(() => {
          this.$store.dispatch('library/fetchLibrariesFromCache');
        })
        .then(() => (this.isDataLoaded = true));
      this.collectionIdList = this.$store.getters['collection/getAll'].map(
        (col) => col.id
      );
      this.libraryIdList = this.$store.getters['collection/getAll'].map(
        (lib) => lib.id
      );
      this.bookIdList = this.$store.getters['collection/getAllBookIdList'];
    }
  },
  methods: {
    bookLink(id) {
      return '/book/' + id;
    },
    selectTab(e) {
      switch (e.target.textContent) {
        case 'Libraries':
          this.currentType = 'library';
          break;
        case 'Collections':
          this.currentType = 'collection';
          break;
        case 'Books':
          this.currentType = 'book';
          break;
      }
    },
  },
};
</script>

<style scoped>
.img-rounded {
  border-radius: 50%;
}
</style>
