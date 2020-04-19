<template>
  <div>
    <h3>{{searchInput}}</h3>
    <v-text-field
      placeholder="Search for ..."
      rounded
      solo
      clearable
      @input="findBookByNameOrAuthor"
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
import config from '~/.config.js';
import convert from 'xml-js';
import SearchListItem from '~/components/SearchListItem';

export default {
  name: 'Search',
  components: {
    SearchListItem
  },
  data() {
    return {
      apiKey: config.GOODREADS_API_KEY,
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
      this.findBookByNameOrAuthor(this.searchInput).then(
        result => (this.books = result)
      );
    }
  },
  methods: {
    async findBookByNameOrAuthor(authorOrBook) {
      if (authorOrBook && authorOrBook.length) {
        try {
          const API_URL = 'https://www.goodreads.com/search/index.xml';
          const reqParams = { key: this.apiKey, q: authorOrBook };
          this.inProgressOfSearch = true;
          let result = await this.$axios.$get(API_URL, { params: reqParams });
          let convertedResult = this.parseGoodReadsData(result);
          this.inProgressOfSearch = false;
          return convertedResult;
        } catch (e) {
          console.warn('WARNING!!!', e);
        }
      } else {
        return [];
      }
    },
    parseGoodReadsData(response) {
      let json = convert.xml2js(response);
      let books = json.elements[0].elements[1].elements[6];
      return books.elements || [];
    },
    getAuthor(book) {
      return book.elements[8].elements[2].elements[1].elements[0].text;
    },
    getTitle(book) {
      return book.elements[8].elements[1].elements[0].text;
    },
    getCover(book) {
      let imgSrc = book.elements[8].elements[3].elements[0].text;
      imgSrc = imgSrc.replace(/_\w{2}\d{2}_\./, '');
      return imgSrc;
    },
    getId(book) {
      return book.elements[8].elements[0].elements[0].text;
    },
    searchBookByPressingKey() {
      this.findBookByNameOrAuthor(this.searchInput);
    }
  }
};
</script>
