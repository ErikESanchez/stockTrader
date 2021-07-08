<template>
  <div>
    <!-- Can either be fixed top or smoooth animation, i'll have to see -->
    <nav
      class="navbar navbar-expand-md navbar-dark"
      style="background-color: #232627"
    >
      <!-- Img tag -->
      <router-link to="/" class="navbar-brand"> Stock Trader </router-link
      ><img src="" />
      <button
        type="button"
        class="navbar-toggler bg-light"
        data-toggle="collapse"
        data-target="#nav"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse justify-content-between" id="nav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link
              to="/stocks"
              class="nav-link text-light font-weight-bold px-3"
            >
              Stocks
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              to="/portfolio"
              class="nav-link text-light font-weight-bold px-3"
              >Portfolio</router-link
            >
          </li>
        </ul>

        <!-- Search bar for future use -->

        <!-- <form class="form-inline ml-3">
          <div class="input-group">
            <input type="text" class="form-control " placeholder="Search" />

            <button type="submit"><i class="fa fa-search"></i></button>
          </div>
        </form> -->

        <form class="form-inline my-2 my-lg-0" v-if="user.email">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
              <div
                class="nav-link text-success"
                style="font: 18px Nunito, sans-serif; margin-top: 5px"
              >
                {{ portfolio.availableFunds }}$
              </div>
            </li>
            <li class="nav-item dropleft">
              <a
                class="nav-link dropdown-toggle text-light"
                href="#"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                {{ user.displayName || user.email }}
                <img :src="portfolio.photoURL" width="25" height="25" />
              </a>
              <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                <router-link to="/profile" class="dropdown-item"
                  >Profile
                </router-link>
                <li class="dropdown-item" @click="signOut()">Sign Out</li>
              </div>
            </li>
          </ul>
        </form>
        <form class="from-inline my-2 my-lg-0" v-else>
          <router-link to="signin" class="btn btn-outline-light my-2 my-sm-0"
            >Sign In
          </router-link>
          <router-link to="signup" class="btn btn-outline-light my-2 my-sm-0">
            Sign Up
          </router-link>
        </form>
      </div>
    </nav>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import store from "@/store";
import { mapGetters } from "vuex";
export default Vue.extend({
  computed: {
    ...mapGetters("userModule", ["user"]),
    ...mapGetters("portfolio", ["portfolio"]),
    ...mapGetters("userPublicData", ["profilePictureURL"]),
  },
  methods: {
    signOut() {
      store.dispatch("userModule/signOut");
    },
  },
});
</script>

<style>
.nv {
  position: relative;
  top: -30px;
  margin: 30px;
}

nav {
  font-family: Poppins, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
    "Segoe UI Symbol";
}

.nav-link {
  color: white;
}

.log-In-Button {
  margin-right: 10px;
}
</style>
