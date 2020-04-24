<template>
  <div></div>
</template>

<script lang="ts">
import Vue from "vue";
import store from "@/store";
import { accountStoreSchema } from "../storeModules/accountStore";
import router from "../router";

export default Vue.extend({
  data() {
    return {};
  },
  // Todo: add these to navigation guard
  beforeCreate() {
    if (store.getters[accountStoreSchema.getters["getSignedInStatus"]])
      router.push("/");
  },
  name: "loginPage"
});
</script>
