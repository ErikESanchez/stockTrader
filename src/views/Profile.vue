<template>
  <div>
    <h5>Change your user name</h5>
    <b-form-input v-model="text" placeholder="Enter your name"></b-form-input>
    <div class="mt-2">Value: {{ text }}</div>
    <b-button @click="saveProfileChanges">Save Profile Settings</b-button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  data() {
    return {
      text: String(),
    };
  },
  methods: {
    //   Todo: Whenever this function is called, make sure to set a timer to stop too many changes
    saveProfileChanges() {
      console.log(this.text);
      //   user
      //     .updateProfile({
      //       displayName: "TastyMango",
      //       // photoURL: "https://example.com/jane-q-user/profile.jpg",
      //     })
      //     .then(function() {
      //       // Update successful.
      //     })
      //     .catch(function(error) {
      //       // An error happened.
      //     });
    },
  },
});
</script>

<style></style>
