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
    <button type="submit" class="btn btn-primary" @click="changeUserName">
      Submit
    </button>
    <h5 class="text-white">Change your user profile, input the picture link</h5>
    <input
      class="form-control"
      type="text"
      placeholder="Enter Link"
      v-model="photoURL"
    />
    <button type="submit" class="btn btn-primary" @click="changeUserPicture">Submit</button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import store from "@/store";
export default Vue.extend({
  data() {
    return {
      text: String(),
      photoURL: String()
    };
  },
  methods: {
    //   Todo: Whenever this function is called, make sure to set a timer to stop too many changes
    changeUserName() {
      store.dispatch("changeUserName", this.text as string);
    },
    changeUserPicture(){
      store.dispatch('userModule/changeUserPicture', this.photoURL as string)
    }
  },
});
</script>

<style></style>
