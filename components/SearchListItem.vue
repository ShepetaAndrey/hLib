<template>
  <v-row justify="center" align="center" class="mx-auto d-flex flex-column">
    <v-card width="100%" class="mb-1 d-flex flex-row" outlined>
      <v-col class="col-md-3 col-sm-2 col-3" lg3>
        <v-img :src="imgSrc" aspect-ratio="0.9" max-width="80px"></v-img>
      </v-col>
      <v-col class="col-md-9 col-sm-10 col-9" lg9>
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
