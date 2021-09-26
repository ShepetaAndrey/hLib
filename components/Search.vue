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
      @keyup.enter="searchBookManually"
      v-model="searchInput"
      :loading="loading"
    ></v-text-field>
    <v-list
      v-show="searchOutputIsVisible && books.length"
      light
      :class="{ endless: !scrollable, limited: scrollable }"
    >
      <div v-for="book in books" :key="$books.getId(book)">
        <nuxt-link @click.native="looseFocus" :to="getBookLink(book)">
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
          this.books = await this.$books.getRange(authorOrBook);
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
