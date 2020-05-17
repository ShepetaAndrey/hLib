<template>
  <div>
    <v-text-field
      placeholder="Search for ..."
      rounded
      solo
      clearable
      @keyup.enter="searchBookByPressingKey"
      v-model="searchInput"
    ></v-text-field>
    <v-list>
      <div v-for="book in books" :key="$books.getId(book)">
        <nuxt-link :to="getBookLink(book)">
          <search-list-item
            :author="$books.getAuthor(book)"
            :title="$books.getTitle(book)"
            :img-src="$books.getCover(book)"
          />
        </nuxt-link>
      </div>
    </v-list>
    <v-row
      v-if="noBooksFound"
      justify="center"
      align="center"
      class="mx-auto d-flex flex-column"
      style="max-width: 600px;"
    >
      <p>No books were found!</p>
    </v-row>
  </div>
</template>

<script>
import SearchListItem from '~/components/SearchListItem';
import _ from 'lodash';

export default {
  name: 'Search',
  components: {
    SearchListItem
  },
  data() {
    return {
      searchInput: '',
      noBooksFound: false,
      books: []
    };
  },
  watch: {
    searchInput() {
      if (!this.searchInput || this.searchInput.length === 0) this.books = [];
      this.findBookByNameOrAuthor(this.searchInput);
    }
  },
  methods: {
    findBookByNameOrAuthor: _.debounce(async function(authorOrBook) {
      if (authorOrBook && authorOrBook.length) {
        try {
          this.books = await this.$books.getRange(authorOrBook);
          this.noBooksFound = this.books.length ? false : true;
        } catch (e) {
          console.warn(e);
        }
      } else {
        return [];
      }
    }, 300),
    getBookLink(book) {
      const id = this.$books.getId(book);
      return `/book/${id}`;
    },
    searchBookByPressingKey() {
      this.findBookByNameOrAuthor(this.searchInput);
    }
  }
};
</script>
