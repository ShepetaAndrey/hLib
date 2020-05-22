<template>
  <v-content>
    <v-container>
      <div>this is: {{ id }}</div>
    </v-container>
  </v-content>
</template>

<script>
export default {
  data() {
    return {
      id: this.$route.params.id
    };
  }
};
</script>

<style>
</style>
