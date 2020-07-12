<template>
  <div>
    <h5>Change your user name</h5>
    <input
      class="form-control"
      type="text"
      placeholder="Enter your name"
      v-model="text"
    />
    <div class="mt-2">Value: {{ text }}</div>
    <button type="submit" class="btn btn-primary" @click="saveProfileChanges">
      Submit
    </button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import store from "@/store";
export default Vue.extend({
  data() {
    return {
      text: String(),
    };
  },
  methods: {
    //   Todo: Whenever this function is called, make sure to set a timer to stop too many changes
    saveProfileChanges() {
      store.dispatch("saveProfileChanges", this.text as string);
    },
  },
});
</script>

<style></style>
