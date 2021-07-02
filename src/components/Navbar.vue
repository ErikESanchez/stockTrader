<template>
  <nav
    class="navbar navbar-expand-lg navbar-dark"
    style="background-color: #232627"
  >
    <router-link to="/" class="navbar-brand"> Stock Trader </router-link>
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <router-link to="/stocks" class="nav-link">Stocks</router-link>
      </li>
      <li class="nav-item active">
        <router-link to="/portfolio" class="nav-link">Portfolio</router-link>
      </li>
    </ul>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto"></ul>
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
              {{  user.displayName || user.email}}
              <img :src="profilePictureURL" width="25" height="25" />
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
</template>

<script lang="ts">
import Vue from "vue";
import store from "@/store";
import { userPriceHistory } from "@/store";
import { mapGetters, mapState } from "vuex";
export default Vue.extend({
  computed: {
    ...mapGetters("userModule", ["user"]),
    ...mapGetters("portfolio", ["portfolio"]),
    ...mapGetters('userPublicData', ['profilePictureURL'])
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

.log-In-Button {
  margin-right: 10px;
}
</style>
