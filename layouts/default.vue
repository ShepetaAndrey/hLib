<template>
  <v-app>
    <v-app-bar height="55px" dense app dark color="brown">
      <v-col class="col-md-5 col-sm-8 col-sx-1 d-sm-flex pa-0">
        <v-app-bar-nav-icon
          @click.stop="drawer = !drawer"
          class="d-flex d-sm-none"
        ></v-app-bar-nav-icon>
        <nuxt-link class="nav-bar-link d-none d-sm-flex" to="/">
          <v-btn active-class="1" text>
            <v-icon left>mdi-home</v-icon>Home
          </v-btn>
        </nuxt-link>
        <nuxt-link class="nav-bar-link d-none d-sm-flex" to="/library">
          <v-btn active-class text>
            <v-icon left>mdi-library</v-icon>Libraries
          </v-btn>
        </nuxt-link>
        <nuxt-link class="nav-bar-link d-none d-sm-flex" to="/collection">
          <v-btn exact-active-class text>
            <v-icon left>mdi-bookshelf</v-icon>Collections
          </v-btn>
        </nuxt-link>
      </v-col>
      <v-col class="col-md-2 col-sm-2 col-xs-11 text-center">
        <v-toolbar-title class="font-weight-medium display-1">
          <nuxt-link class="nav-bar-link" to="/">hLib</nuxt-link>
        </v-toolbar-title>
      </v-col>
      <v-col class="col-md-5 col-sm-2 col-sx-1 pt-2 my-auto">
        <div class="d-flex justify-end">
          <search-input
            show-output="temporary"
            :scrollable="true"
            class="d-none d-sm-none d-md-flex"
          />
          <nuxt-link
            class="nav-bar-link d-xs-flex d-sm-flex d-md-none justify-end"
            to="/search"
          >
            <v-btn text> <v-icon left>mdi-magnify</v-icon>Search </v-btn>
          </nuxt-link>
        </div>
      </v-col>
    </v-app-bar>

    <!-- NAVIGATOR-DRAWER -->
    <v-navigation-drawer
      :disable-resize-watcher="true"
      v-model="drawer"
      app
      temporary
      color="brown lighten-5"
      class="brown--text text--darken-4"
    >
      <v-list dense nav>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
          :to="item.to"
          nuxt
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <div
      class="d-flex col-lg-8 offset-lg-2 col-sm-10 offset-sm-1 col-md-10 offset-md-1 col-12"
    >
      <nuxt />
    </div>
  </v-app>
</template>

<script>
import SearchVue from '../components/Search.vue';
export default {
  components: {
    'search-input': SearchVue,
  },
  data() {
    return {
      drawer: null,
      items: [
        {
          title: 'Home',
          icon: 'mdi-home',
          to: '/',
        },
        {
          title: 'Libraries',
          icon: 'mdi-library',
          to: '/library',
        },
        {
          title: 'Collections',
          icon: 'mdi-book-open-page-variant',
          to: '/collection',
        },
        {
          title: 'Search',
          icon: 'mdi-magnify',
          to: '/search',
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.container {
  max-width: 1100px;
}

.nav-bar-link {
  text-decoration: none;
  color: white;
}

.nav-bar-link:active {
  color: rgb(211, 179, 158);
}
</style>
