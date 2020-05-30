<template>
  <v-content>
    <v-container>
      <p class="display-3 regular text-center">Collections</p>
      <v-flex row justify-center class="ma-0">
        <div class="d-flex col-12 col-sm-6 col-md-4 justify-center">
          <v-dialog v-model="dialogCreate" scrollable max-width="300px">
            <template v-slot:activator="{ on }">
              <v-btn v-on="on">
                <v-icon left>mdi-plus</v-icon>Create Collection
              </v-btn>
            </template>
            <v-card>
              <v-card-title>Create Collection</v-card-title>
              <v-divider></v-divider>
              <v-text-field
                class="pa-3"
                placeholder="Collection name"
                hint="Write name of new collection"
                outlined
                v-model="collectionName"
              />
              <v-card-actions>
                <v-btn color="brown darken-1" text @click="dialogCreate = false">Close</v-btn>
                <v-btn
                  color="brown darken-1"
                  :disabled="!collectionName"
                  text
                  @click="createCollection()"
                >Create</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>
        <div class="d-flex col-12 col-sm-6 col-md-4 justify-center">
          <v-dialog v-model="dialogDelete" scrollable max-width="300px">
            <template v-slot:activator="{ on }">
              <v-btn v-on="on">
                <v-icon left>mdi-delete</v-icon>Delete Collection
              </v-btn>
            </template>
            <v-card>
              <v-card-title>Delete Collection</v-card-title>
              <v-divider></v-divider>
              <v-card-text class="d-flex" style="height: 300px;">
                <v-radio-group v-if="collectionIdList.length" v-model="dialogRemoveColModel" column>
                  <v-radio
                    :label="colId"
                    :value="colId"
                    v-for="colId in collectionIdList"
                    :key="colId"
                  ></v-radio>
                </v-radio-group>
                <div v-else class="d-flex display-2 align-center text-center">nothing to remove :(</div>
              </v-card-text>
              <v-card-actions>
                <v-btn color="brown darken-1" text @click="dialogDelete = false">Close</v-btn>
                <v-btn
                  color="brown darken-1"
                  :disabled="!dialogRemoveColModel"
                  text
                  @click="deleteCollection()"
                >Delete</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>
      </v-flex>
      <hlib-collection-list :collectionIdList="collectionIdList" />
    </v-container>
  </v-content>
</template>

<script>
import CollectionListVue from '../../components/collection/CollectionList.vue';

export default {
  components: {
    'hlib-collection-list': CollectionListVue
  },
  data() {
    return {
      url: this.$route.name,
      collectionName: '',
      dialogCreate: false,
      dialogDelete: false,
      dialogRemoveColModel: ''
    };
  },
  computed: {
    collectionIdList() {
      return this.$store.getters['collection/getAll'].map(col => col.id);
    }
  },
  methods: {
    collectionLink(id) {
      return this.url + '/' + id;
    },
    createCollection() {
      if (this.collectionName) {
        this.$store.commit('collection/addCollection', {
          collectionId: this.collectionName
        });
        localStorage.setItem(
          'collections',
          JSON.stringify(this.$store.getters['collection/getAll'])
        );
      }
      this.collectionName = '';
      this.dialogCreate = false;
    },
    deleteCollection() {
      if (this.dialogRemoveColModel.length) {
        this.$store.commit('collection/deleteCollection', {
          collectionId: this.dialogRemoveColModel
        });
        // localStorage.setItem(
        //   'collections',
        //   JSON.stringify(this.$store.getters['collection/getAll'])
        // );
      }
      this.dialogRemoveColModel = '';
      this.dialogDelete = false;
    }
  }
};
</script>

<style>
</style>
