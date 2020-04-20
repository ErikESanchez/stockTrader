<template>
  <div>
    <h1>Load the real data for a single stock</h1>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "singleStock",
  props: {
    stockData: Object
  }
});
</script>
