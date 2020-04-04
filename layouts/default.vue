<template>
  <v-app>
    <v-app-bar app clipped-left color="brown" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-spacer></v-spacer>
      <v-toolbar-title class="font-weight-medium display-1">
        hLib
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-app-bar>

    <!-- NAVIGATOR-DRAWER -->
    <v-navigation-drawer
      v-model="drawer"
      app
      clipped
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
    <nuxt />
  </v-app>
</template>

<script>
export default {
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
</style>
