<template>
  <v-content>
    <v-layout>
      <div>{{ url }}</div>
      <v-list v-for="c in collections" :key="c">
        <v-list-item>
          <nuxt-link :to="collectionLink(c)">{{ c }}</nuxt-link>
        </v-list-item>
      </v-list>
    </v-layout>
  </v-content>
</template>

<script>
export default {
  data() {
    return {
      url: this.$route.name,
      collections: [
        'junior collection',
        'middle collection',
        'senior collection'
      ]
    };
  },
  methods: {
    collectionLink(id) {
      return this.url + '/' + id;
    }
  }
};
</script>

<style>
</style>
