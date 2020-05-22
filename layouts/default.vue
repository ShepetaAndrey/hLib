<template>
  <v-app>
    <v-app-bar height="55px" dense app color="brown">
      <v-col class="col-md-5 col-sm-5 col-1 d-sm-flex pa-0">
        <v-app-bar-nav-icon @click.stop="drawer = !drawer" class="d-flex d-sm-none"></v-app-bar-nav-icon>
        <nuxt-link class="pl-5 nav-bar-link d-none d-sm-flex" to="/">Home</nuxt-link>
        <nuxt-link class="pl-5 nav-bar-link d-none d-sm-flex" to="/collection">Collections</nuxt-link>
      </v-col>
      <v-col class="col-md-2 col-sm-2 col-11 text-center">
        <v-toolbar-title class="font-weight-medium display-1">
          <nuxt-link class="nav-bar-link" to="/">hLib</nuxt-link>
        </v-toolbar-title>
      </v-col>
      <v-col class="pt-2 my-auto col-md-5 col-sm-5 d-none d-sm-flex justify-end">
        <search />
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
        <v-list-item v-for="item in items" :key="item.title" link :to="item.to" nuxt>
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <div class="d-flex col-md-8 offset-lg-2 col-sm-10 offset-sm-1 col-12">
      <nuxt />
    </div>
  </v-app>
</template>

<script>
import SearchVue from '../components/Search.vue';
export default {
  components: {
    search: SearchVue
  },
  data() {
    return {
      drawer: null,
      width: 100,
      items: [
        {
          title: 'Home',
          icon: 'mdi-home',
          to: '/'
        },
        {
          title: 'Collections',
          icon: 'mdi-book-open-page-variant',
          to: '/books'
        },
        {
          title: 'Search',
          icon: 'mdi-magnify',
          to: '/search'
        }
      ]
    };
  }
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
</style>
