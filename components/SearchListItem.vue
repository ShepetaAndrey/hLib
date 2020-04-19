<template>
  <v-row
    justify="center"
    align="center"
    class="mx-auto d-flex flex-column"
    style="max-width: 600px;"
  >
    <v-card width="100%" class="mb-1 d-flex flex-row" outlined>
      <v-col class="col-md-3" lg3>
        <v-img :src="imgSrc" width="100" height="150" class="mx-auto"></v-img>
      </v-col>
      <v-col class="col-md-9" lg9>
        <p>{{ title }}</p>
        <p style="overflow: hide;">
          <i>{{ author }}</i>
        </p>
      </v-col>
    </v-card>
  </v-row>
</template>

<script>
export default {
  name: 'SearchListItem',
  props: {
    imgSrc: {
      type: String,
      required: true
    },
    author: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    }
  }
};
</script>

<style>
</style>
