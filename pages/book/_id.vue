<template>
  <v-main>
    <v-layout>
      <v-flex column>
        <v-img
          :src="bookCoverLink(bookId)"
          contain
          aspect-ratio="1"
          max-height="300px"
        />
        <div class="d-flex justify-center">
          <div class="d-none d-sm-none d-md-flex justify-center display-1 text-center col-md-8">
            {{ book.title }}
          </div>
          <div class="d-flex d-sm-flex d-md-none justify-center title text-center col-12 col-sm-10 col-md-8">
            {{ book.title }}
          </div>
        </div>
        <div class="d-flex justify-center pb-5">
          <v-rating
            color="warning"
            dense
            hover
            length="5"
            size="25"
            :value="5"
          ></v-rating>
        </div>
        <v-dialog
          v-model="dialog"
          scrollable
          max-width="300px"
        >
          <template v-slot:activator="{ on }">
            <v-flex
              justify-center
              row
              class="ma-0"
            >
              <v-btn
                color="light-green lighten-3"
                class="d-flex col-12 col-sm-8 col-md-4"
                v-on="on"
              >Add to collection</v-btn>
            </v-flex>
          </template>
          <v-card>
            <v-card-title>Add book to collection</v-card-title>
            <v-divider></v-divider>
            <v-card-text
              class="d-flex"
              style="height: 300px"
            >
              <v-radio-group
                v-if="getCollectionListWithout(bookId).length"
                v-model="collectionId"
                column
              >
                <v-radio
                  :label="col"
                  :value="col"
                  v-for="col in getCollectionListWithout(bookId)"
                  :key="col"
                ></v-radio>
              </v-radio-group>
              <div
                v-else
                class="d-flex display-2 align-center text-center"
              >
                Nothing to choose here :(
              </div>
            </v-card-text>
            <v-card-actions>
              <v-btn
                color="brown darken-1"
                text
                @click="dialog = false"
              >Close</v-btn>
              <v-btn
                color="brown darken-1"
                :disabled="!collectionId"
                text
                @click="addBookToCollection"
              >Add</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-snackbar
          color="success"
          right
          bottom
          v-model="snackbarSuccess"
        >
          Book was successfully added to
          <nuxt-link
            class="px-1"
            :to="collectionLink"
          >{{ colId }}</nuxt-link>collection
        </v-snackbar>
        <v-flex
          row
          class="ma-0 py-3"
        >
          <div class="d-flex font-weight-medium pr-3">Authors:</div>
          <div
            class="d-flex pr-3"
            v-for="author in book.authors"
            :key="author"
          >
            {{ author }}
          </div>
        </v-flex>
        <v-flex class="ma-0">
          <div class="font-weight-medium">Description:</div>
          <div v-html="book.description"></div>
        </v-flex>
        <v-simple-table>
          <tbody>
            <tr
              v-for="pair in bookMetaTable"
              :key="pair[0]"
            >
              <td>{{ pair[0] }}</td>
              <td>{{ pair[1] }}</td>
            </tr>
          </tbody>
        </v-simple-table>
      </v-flex>
    </v-layout>
  </v-main>
</template>

<script>
import { getBook } from '@/services/api/google-books';

import { getCoverLink } from '@/utils/mappers/bookCover';
import BookMapper from '@/utils/mappers/book';

import { mapActions, mapGetters } from 'vuex';

export default {
  data() {
    return {
      bookId: this.$route.params.id,
      book: {},
      dialog: false,
      collectionId: null,
      colId: '',
      snackbarSuccess: false,
    };
  },
  computed: {
    ...mapGetters('collection', ['getCollectionListWithout']),
    collectionListWithoutCurrentBook() {
      return this.getCollectionListWithout(this.bookId);
    },
    collectionLink() {
      return '/collection/' + this.colId;
    },
    bookMetaTable() {
      const interestingFields = [
        'publisher',
        'publishedDate',
        'pageCount',
        'language',
      ];
      const filteredMeta = Object.keys(this.book).filter((key) =>
        interestingFields.includes(key)
      );
      return filteredMeta.map((x) => {
        return [x, this.book[x]];
      });
    },
  },
  async created() {
    const interestingFields = [
      'title',
      'authors',
      'publisher',
      'publishedDate',
      'description',
      'pageCount',
      'language',
    ];

    const book = new BookMapper(await getBook(this.bookId));
    const filteredKeys = Object.keys(book.data).filter((x) => {
      return interestingFields.includes(x);
    });
    filteredKeys.forEach((key) => {
      this.book = Object.assign({}, this.book, { [key]: book.data[key] });
    });
  },
  methods: {
    ...mapActions('collection', ['addBook']),
    addBookToCollection() {
      this.colId = this.collectionId;
      this.addBook({ bookId: this.bookId, collectionId: this.collectionId });
      this.snackbarSuccess = true;
      this.dialog = false;
    },
    bookCoverLink(bookId) {
      return getCoverLink(bookId);
    },
  },
};
</script>
