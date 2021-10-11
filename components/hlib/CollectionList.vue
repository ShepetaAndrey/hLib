<template>
  <div>
    <hlib-collection-item
      v-for="collectionId in collectionIdList"
      :key="collectionId"
      :collectionId="collectionId"
    />
  </div>
</template>

<script>
export default {
  props: {
    collectionIdList: {
      type: Array,
      required: true,
    },
  },
};
</script>
