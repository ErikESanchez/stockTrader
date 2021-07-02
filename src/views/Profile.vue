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
    <button type="submit" class="btn btn-primary" @click="changeUserPicture">
      Submit
    </button>
    <input type="file" @change="filePicked" />
    <button class="btn btn-danger" @click="uploadFile">Upload</button>
    <img id="photoURL" :src="userPhotoFileURL" :width="70" :height="80"/>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import store from "@/store";
export default Vue.extend({
  data() {
    return {
      text: String(),
      photoURL: String(),
      userPhotoFile: Array(),
      userPhotoFileURL: "",
    };
  },
  methods: {
    //   Todo: Whenever this function is called, make sure to set a timer to stop too many changes
    changeUserName() {
      store.dispatch("changeUserName", this.text as string);
    },
    changeUserPicture() {
      store.dispatch("userModule/changeUserPicture", this.photoURL as string);
    },
    filePicked(event: any) {
      this.userPhotoFile[0] = event.target.files[0];
      this.dipslayImage(this.userPhotoFile[0]);
    },
    uploadFile() {
      store.dispatch("userPublicData/uploadUserPicture", this.userPhotoFile[0]);
    },
    dipslayImage(file: any) {
      let reader = new FileReader();
      reader.onload = (e) => {
        this.userPhotoFileURL = e.target?.result as string;
      };
      reader.readAsDataURL(file);
      // this.userPhotoFileURL! = photoUrl[0] as string;
      // console.log(photoUrl[0]);
    },
  },
});
</script>

<style></style>
