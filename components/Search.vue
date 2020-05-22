<template>
  <div class="d-flex flex-column" id="search-input-block">
    <v-text-field
      prepend-inner-icon="mdi-magnify"
      id="search-input"
      placeholder="Search for ..."
      solo
      dense
      clearable
      @blur="collapseSearch"
      @focus="openSearch"
      @keyup.enter="searchBookManually"
      @click="restoreLastSearchResults"
      v-model="searchInput"
      :loading="loading"
    ></v-text-field>
    <v-list v-show="books.length" style="overflow: auto; max-height: 600px">
      <div v-for="book in books" :key="$books.getId(book)">
        <nuxt-link @click.native="openBook" :to="getBookLink(book)">
          <search-list-item
            :author="$books.getAuthor(book)"
            :title="$books.getTitle(book)"
            :img-src="$books.getCover(book)"
          />
        </nuxt-link>
      </div>
    </v-list>
    <v-row v-if="noBooksFound" justify="center" align="center" class="mx-auto d-flex flex-column">
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
      loading: false,
      books: [],
      booksCached: []
    };
  },
  watch: {
    searchInput() {
      if (!this.searchInput || this.searchInput.length === 0) this.books = [];
      this.findBookByNameOrAuthor(this.searchInput);
      if (this.searchInput === null) {
        const el = document.getElementById('search-input');
        el.blur();
        if (window.outerWidth > 1264) {
          el.style.width = '50%';
        }
      }
    }
  },
  mounted() {
    window.addEventListener('resize', () => {
      const el = document.getElementById('search-input-block');
      if (window.innerWidth <= 1264) {
        el.style.width = '100%';
      } else {
        el.style.width = '50%';
      }
    });
  },
  methods: {
    findBookByNameOrAuthor: _.debounce(async function(authorOrBook) {
      if (authorOrBook && authorOrBook.length) {
        try {
          this.loading = 'warning';
          this.books = this.booksCached;
          this.books = await this.$books.getRange(authorOrBook);
          this.booksCached = JSON.parse(JSON.stringify(this.books));
          this.noBooksFound = this.books.length ? false : true;
          this.loading = false;
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
    searchBookManually() {
      this.findBookByNameOrAuthor(this.searchInput);
    },
    openBook() {
      this.books = [];
    },
    restoreLastSearchResults(event) {
      if (
        this.searchInput !== null &&
        this.searchInput !== '' &&
        event.target.value !== ''
      ) {
        event.target.style.width = '100%';
        this.books = this.booksCached;
      }
    },
    openSearch() {
      const el = document.getElementById('search-input-block');
      el.style.width = '100%';
    },
    collapseSearch() {
      setTimeout(() => {
        if (this.searchInput === null || this.searchInput.length === 0) {
          if (window.innerWidth > 1264) {
            const el = document.getElementById('search-input-block');
            el.style.width = '50%';
          }
        }
        this.books = [];
      }, 200);
    }
  }
};
</script>

<style>
#search-input-block {
  transition: all 0.15s ease-in-out;
}
</style>
