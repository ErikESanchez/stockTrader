<template>
  <div>
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css"
    />

    <div class="input-group mb-3 d-flex justify-content-center px-5">
      <input
        type="text"
        class="form-control text-white bg-dark"
        placeholder="New Username"
        aria-label="Recipient's username"
        aria-describedby="button-addon2"
        v-model="userNameText"
      />
      <button
        class="btn btn-dark btn-outline-light"
        type="button"
        id="button-addon2"
        @click="changeUserName"
      >
        Submit
      </button>
    </div>
    <div class="input-group mb-3 d-flex justify-content-center px-5">
      <input
        type="text"
        class="form-control text-white bg-dark"
        placeholder="Enter Link"
        aria-label="Recipient's username"
        aria-describedby="button-addon2"
        v-model="photoURL"
      />
      <button
        class="btn btn-dark btn-outline-light"
        type="button"
        id="button-addon2"
        @click="changeUserPicture"
      >
        Submit
      </button>
    </div>
    <p class="text-center text-white">Pick and upload picture</p>

    <div class="input-group mb-3 d-flex justify-content-center px-5">
      <label
        for="file-upload"
        class="input-group-text custom-file-upload bg-dark"
        @change="filePicked"
      >
        <i class="bi bi-image text-white"></i>
      </label>
      <input id="file-upload" type="file" />
      <button
        class="input-group-text bg-dark text-white"
        for="inputGroupFile02"
        @click="uploadFile"
      >
        <i class="bi bi-upload text-white"></i>
      </button>
    </div>

    <!-- <img class="img-thumbnail" :src="userPhotoFileURL" alt="..." /> -->
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import store from "@/store";
export default Vue.extend({
  data() {
    return {
      userNameText: String(),
      photoURL: String(),
      userPhotoFile: Array(),
      userPhotoFileURL: "",
    };
  },
  methods: {
    //   Todo: Whenever this function is called, make sure to set a timer to stop too many changes
    changeUserName() {
      store.dispatch("userModule/changeUserName", this.userNameText as string);
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

<style>
input[type="file"] {
  display: none;
}

.custom-file-upload {
  border: 1px solid #ccc;
  display: inline-block;
  padding: 6px 12px;
  cursor: pointer;
}

::placeholder {
  /* Chrome, Firefox, Opera, Safari 10.1+ */
  color: white !important;
  opacity: 1; /* Firefox */
}
</style>