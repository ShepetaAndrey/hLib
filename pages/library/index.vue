<template>
  <v-main>
    <v-container>
      <p class="display-3 regular text-center">Libraries</p>
      <v-flex row justify-center class="ma-0">
        <div class="col-12 col-sm-6 col-md-3">
          <v-dialog v-model="dialogCreateLib" scrollable max-width="300px">
            <template v-slot:activator="{ on }">
              <v-btn width="100%" v-on="on">
                <v-icon left>mdi-plus</v-icon>Create Library
              </v-btn>
            </template>
            <v-card>
              <v-card-title>Create library</v-card-title>
              <v-divider></v-divider>
              <v-text-field
                class="pa-3"
                placeholder="Library name"
                hint="Write name of new library"
                outlined
                v-model="libraryName"
              />
              <v-card-actions>
                <v-btn
                  color="brown darken-1"
                  text
                  @click="dialogCreateLib = false"
                  >Close</v-btn
                >
                <v-btn
                  color="brown darken-1"
                  :disabled="!libraryName"
                  text
                  @click="createLibrary"
                  >Create</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>
        <div class="col-12 col-sm-6 col-md-3">
          <v-dialog v-model="dialogDeleteLib" scrollable max-width="300px">
            <template v-slot:activator="{ on }">
              <v-btn width="100%" v-on="on">
                <v-icon left>mdi-delete</v-icon>Delete Library
              </v-btn>
            </template>
            <v-card>
              <v-card-title>Delete Library</v-card-title>
              <v-divider></v-divider>
              <v-card-text style="height: 300px">
                <v-radio-group
                  v-if="libraries.length"
                  v-model="dialogDeleteLibModel"
                  column
                >
                  <v-radio
                    :label="lib.id"
                    :value="lib.id"
                    v-for="lib in libraries"
                    :key="lib.id"
                  ></v-radio>
                </v-radio-group>
              </v-card-text>
              <v-card-actions>
                <v-btn
                  color="brown darken-1"
                  text
                  @click="dialogDeleteLib = false"
                  >Close</v-btn
                >
                <v-btn
                  color="brown darken-1"
                  :disabled="!dialogDeleteLibModel"
                  text
                  @click="deleteLibrary"
                  >Delete</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>
        <v-flex class="col-12" v-if="libraries.length">
          <v-card>
            <v-tabs v-model="tab" color="brown" grow show-arrows>
              <v-tabs-slider color="brown"></v-tabs-slider>
              <v-tab
                @click="changeTab"
                v-for="lib in libraries"
                :key="lib.id"
                >{{ lib.id }}</v-tab
              >
            </v-tabs>
          </v-card>
        </v-flex>
      </v-flex>
      <v-flex
        v-if="currentLibId !== null"
        row
        justify-space-around
        class="ma-0"
      >
        <!-- add begin -->
        <v-dialog v-model="dialogAddCol" scrollable max-width="300px">
          <template v-slot:activator="{ on }">
            <v-btn
              v-on="on"
              class="d-none d-sm-none d-md-flex"
              color="light-green lighten-1"
            >
              <v-icon left>mdi-plus</v-icon>Add Collection
            </v-btn>
            <v-btn
              v-on="on"
              class="d-sm-flex d-md-none col-6"
              color="light-green lighten-1"
            >
              <v-icon left>mdi-plus</v-icon>Add
            </v-btn>
          </template>
          <v-card>
            <v-card-title>Add Collection</v-card-title>
            <v-divider></v-divider>
            <v-card-text class="d-flex" style="height: 300px">
              <v-radio-group
                v-if="collectionsNotInLibrary.length"
                v-model="dialogAddColModel"
                column
              >
                <v-radio
                  :label="col"
                  :value="col"
                  v-for="col in collectionsNotInLibrary"
                  :key="col"
                ></v-radio>
              </v-radio-group>
              <div
                v-else
                class="d-flex display-1 align-center text-center justify-center row"
              >
                <div class="d-flex">
                  No more collections left for adding to this library :(
                </div>
                <v-btn class="d-flex" to="/collection" nuxt>
                  <v-icon left>mdi-plus</v-icon>Create new collection
                </v-btn>
              </div>
            </v-card-text>
            <v-card-actions>
              <v-btn color="brown darken-1" text @click="dialogAddCol = false"
                >Close</v-btn
              >
              <v-btn
                color="brown darken-1"
                :disabled="!dialogAddColModel"
                text
                @click="addCollectionToLibrary"
                >Add</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>
        <!-- add end -->
        <!-- remove begin -->
        <v-dialog v-model="dialogRemoveCol" scrollable max-width="300px">
          <template v-slot:activator="{ on }">
            <v-btn
              v-on="on"
              class="d-none d-sm-none d-md-flex overflow-hidden"
              color="red lighten-3"
            >
              <v-icon left>mdi-delete</v-icon>Remove Collection
            </v-btn>
            <v-btn
              v-on="on"
              class="d-block d-md-none col-6 overflow-hidden"
              color="red lighten-3"
            >
              <v-icon left>mdi-delete</v-icon>Remove
            </v-btn>
          </template>
          <v-card>
            <v-card-title>Remove Collection</v-card-title>
            <v-divider></v-divider>
            <v-card-text class="d-flex" style="height: 300px">
              <v-radio-group
                v-if="libraryCollectionList.length"
                v-model="dialogRemoveColModel"
                column
              >
                <v-radio
                  :label="col"
                  :value="col"
                  v-for="col in libraryCollectionList"
                  :key="col"
                ></v-radio>
              </v-radio-group>
              <div v-else class="d-flex display-2 align-center text-center">
                nothing to remove :(
              </div>
            </v-card-text>
            <v-card-actions>
              <v-btn
                color="brown darken-1"
                text
                @click="dialogRemoveCol = false"
                >Close</v-btn
              >
              <v-btn
                color="brown darken-1"
                :disabled="!dialogRemoveColModel"
                text
                @click="removeCollectionFromLibrary"
                >Remove</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>
        <!-- remvoe end -->
      </v-flex>
      <hlib-collection-list
        v-if="libraries.length"
        :collectionIdList="collectionIdList"
      />
      <div v-else class="pt-10 text-center display-1">
        No libraries were found!
        <br />Try to create one!
      </div>
    </v-container>
  </v-main>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  data() {
    return {
      dialogAddCol: false,
      dialogAddColModel: '',
      dialogRemoveCol: false,
      dialogRemoveColModel: '',
      dialogCreateLib: false,
      tab: 0,
      libraryName: '',
      currentLibId: null,
      dialogDeleteLib: false,
      dialogDeleteLibModel: '',
    };
  },
  computed: {
    ...mapGetters('library', ['getAll', 'getById', 'getFirstLibId']),
    ...mapGetters('collection', { getAllCollections: 'getAll' }),
    libraries() {
      return this.getAll;
    },
    collectionIdList() {
      if (this.currentLibId === null) return [];
      const library = this.getById(this.currentLibId);
      return library.collections;
    },
    libraryCollectionList() {
      if (!this.currentLibId) {
        return [];
      }
      return this.getById(this.currentLibId).collections;
    },
    collectionsNotInLibrary() {
      if (this.currentLibId === null) return [];
      const collectionIdList = this.getAllCollections.map((c) => c.id);
      const library = this.getById(this.currentLibId);
      return collectionIdList.filter(
        (col) => !library.collections.includes(col)
      );
    },
  },
  mounted() {
    this.fetchLibrariesFromCache();
    this.fetchCollectionsFromCache();
    this.currentLibId = this.getFirstLibId;
  },
  methods: {
    ...mapActions('collection', ['fetchCollectionsFromCache']),
    ...mapActions('library', [
      'fetchLibrariesFromCache',
      'addLibrary',
      'removeLibrary',
      'addCollection',
      'removeCollection',
    ]),
    getLibraryLink(id) {
      return '/library/' + id;
    },
    addCollectionToLibrary() {
      this.dialogAddCol = false;
      if (this.dialogAddColModel) {
        this.addCollection({
          collectionId: this.dialogAddColModel,
          libraryId: this.currentLibId,
        });
      }
      this.dialogAddColModel = '';
    },
    removeCollectionFromLibrary() {
      this.dialogRemoveCol = false;
      if (this.dialogRemoveColModel) {
        this.removeCollection({
          collectionId: this.dialogRemoveColModel,
          libraryId: this.currentLibId,
        });
      }
      this.dialogRemoveColModel = '';
    },
    createLibrary() {
      if (this.libraryName.length) {
        this.addLibrary(this.libraryName);
      }
      this.currentLibId = this.libraryName;
      this.tab = this.libraries.length - 1;
      this.libraryName = '';
      this.dialogCreateLib = false;
    },
    deleteLibrary() {
      if (this.dialogDeleteLibModel.length) {
        this.removeLibrary(this.dialogDeleteLibModel);
        this.currentLibId = this.getFirstLibId;
        this.dialogDeleteLibModel = '';
        this.tab = 0;
        this.dialogDeleteLib = false;
      }
    },
    changeTab(e) {
      this.currentLibId = e.target.textContent;
    },
  },
};
</script>
