<template>
  <div
    class="flex-column"
    :class="{ closed: !isSearchOpened, standalone: standAlonePage }"
    id="search-input-block"
  >
    <v-text-field
      prepend-inner-icon="mdi-magnify"
      id="search-input"
      placeholder="Search for ..."
      solo
      light
      autocomplete="off"
      dense
      clearable
      @blur="looseFocus"
      @click="openSearch"
      @keyup.enter="findBookByNameOrAuthor(searchInput)"
      v-model="searchInput"
      :loading="loading"
    ></v-text-field>
    <v-list
      v-show="searchOutputIsVisible && books.length"
      light
      :class="{ endless: !scrollable, limited: scrollable }"
    >
      <div v-for="book in books" :key="bookId(book)">
        <nuxt-link @click.native="looseFocus" :to="bookLink(book)">
          <search-list-item
            :author="bookAuthor(book)"
            :title="bookTitle(book)"
            :img-src="bookCoverLink(book)"
          />
        </nuxt-link>
      </div>
    </v-list>
    <v-row
      v-if="noBooksFound"
      justify="center"
      align="center"
      class="mx-auto d-flex flex-column"
    >
      <p>No books were found!</p>
    </v-row>
  </div>
</template>

<script>
import _ from 'lodash';

import SearchListItem from '@/components/SearchListItem';

import { getBookList } from '@/services/api/google-books';

import BookMapper from '@/utils/mappers/book';
import { getCoverLink } from '@/utils/mappers/bookCover';

export default {
  name: 'Search',
  components: {
    SearchListItem,
  },
  props: {
    showOutput: {
      type: String,
      default: 'always',
    },
    standAlonePage: {
      type: Boolean,
      default: false,
    },
    scrollable: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      searchInput: '',
      noBooksFound: false,
      loading: false,
      isSearchOpened: false,
      searchOutputIsVisible: this.showOutput === 'always' ? true : false,
      books: [],
    };
  },
  watch: {
    searchInput() {
      if (!this.searchInput || this.searchInput.length === 0) this.books = [];
      this.findBookByNameOrAuthor(this.searchInput);
      if (this.books.length) this.searchOutputIsVisible = true;
      if (this.searchInput === null) {
        this.isSearchOpened = false;
        const el = document.getElementById('search-input');
        el.blur();
      }
    },
  },
  methods: {
    findBookByNameOrAuthor: _.debounce(async function (authorOrBook) {
      if (authorOrBook && authorOrBook.length) {
        try {
          this.loading = 'warning';
          this.books = await getBookList(authorOrBook);
          this.noBooksFound = this.books.length ? false : true;
          this.loading = false;
        } catch (e) {
          console.warn(e);
        }
      } else {
        return [];
      }
    }, 300),
    bookLink(bookRaw) {
      const book = new BookMapper(bookRaw);
      return `/book/${book.id}`;
    },
    bookAuthor(bookRaw) {
      const book = new BookMapper(bookRaw);
      return book.author;
    },
    bookTitle(bookRaw) {
      const book = new BookMapper(bookRaw);
      return book.title;
    },
    bookId(bookRaw) {
      const book = new BookMapper(bookRaw);
      return book.id;
    },
    bookCoverLink(bookRaw) {
      const book = new BookMapper(bookRaw);
      return getCoverLink(book.id);
    },
    openSearch() {
      if (window.innerWidth < 960 && this.$route.path !== '/search') {
        window.location.assign('/search');
      }
      this.isSearchOpened = true;
      this.searchOutputIsVisible = true;
    },
    looseFocus() {
      if (this.searchInput === null || this.searchInput === '')
        this.isSearchOpened = false;
      setTimeout(() => {
        this.searchOutputIsVisible =
          this.showOutput === 'always' ? true : false;
      }, 200);
    },
  },
};
</script>

<style>
#search-input-block {
  transition: all 0.15s ease-in-out;
  width: 100%;
}

.endless {
  max-height: none;
}

.limited {
  max-height: 600px !important;
  overflow: auto;
}

@media (min-width: 1264px) {
  #search-input-block.closed {
    width: 50%;
  }

  #search-input-block.closed.standalone {
    width: 100%;
  }
}
</style>
