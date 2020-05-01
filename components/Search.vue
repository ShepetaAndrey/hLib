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
    <v-list v-if="!noBooksFound">
      <div v-for="book in books" :key="getId(book)">
        <search-list-item
          :author="getAuthor(book)"
          :title="getTitle(book)"
          :img-src="getCover(book)"
        />
      </div>
    </v-list>
    <v-row
      v-else-if="noBooksFound"
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

export default {
  name: 'Search',
  components: {
    SearchListItem
  },
  data() {
    return {
      searchInput: '',
      books: []
    };
  },
  computed: {
    noBooksFound() {
      return (
        this.searchInput &&
        this.searchInput.length > 0 &&
        this.books &&
        this.books.length === 0
      );
    }
  },
  watch: {
    books() {
      if (this.searchInput && this.searchInput.lenght === 0) {
        this.books = [];
      }
    },
    searchInput() {
      if (this.searchInput && this.searchInput.length === 0) this.books = [];
      this.findBookByNameOrAuthor(this.searchInput).then(
        result => (this.books = result)
      );
    }
  },
  methods: {
    async findBookByNameOrAuthor(authorOrBook) {
      if (authorOrBook && authorOrBook.length) {
        try {
          const API_URL = 'https://www.googleapis.com/books/v1/volumes';
          const reqParams = {
            q: authorOrBook
          };
          this.inProgressOfSearch = true;
          let result = await this.$axios.$get(API_URL, { params: reqParams });
          this.inProgressOfSearch = false;
          return result.items.map(x => x.volumeInfo);
        } catch (e) {
          console.warn('WARNING!!!', e);
        }
      } else {
        return [];
      }
    },
    getAuthor(book) {
      if (book.authors) return book.authors[0];
      else return '';
    },
    getTitle(book) {
      return book.title;
    },
    getCover(book) {
      if (book.imageLinks) return book.imageLinks.smallThumbnail;
      else return '/logo-big.png';
    },
    getId(book) {
      return Math.round(Math.random() * 10000);
    },
    searchBookByPressingKey() {
      this.findBookByNameOrAuthor(this.searchInput);
    }
  }
};
</script>
