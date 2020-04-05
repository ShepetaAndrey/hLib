<template>
  <v-text-field
    placeholder="Search for ..."
    rounded
    solo
    v-model="searchInput"
  ></v-text-field>
</template>

<script>
export default {
  name: "Search",
  data() {
    return {
      searchInput: ""
    };
  }
};
</script>
