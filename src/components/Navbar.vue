<template>
  <!-- Can either be fixed  top or smoooth animation, i'll have to see -->
  <section id="nav-section">
    <nav class=" navbar navbar-expand-md navbar-dark">
      <div class="container">
        <router-link to="/" class="navbar-brand">Stock Trader</router-link>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto" v-if="user.email">
            <li class="nav-item">
              <router-link to="/stocks" class="nav-link text-white">
                Stocks
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/portfolio" class="nav-link text-white">
                Portfolio
              </router-link>
            </li>
          </ul>
          <form class="d-flex " v-if="user.email">
            <ul
              class="navbar-nav ms-auto form-control"
              style="background-color: #181a1b; border-color: #181a1b;"
            >
              <li class="nav-item">
                <div
                  class="nav-link text-success"
                  style="font: 18px Nunito, sans-serif; margin-top: 5px"
                >
                  {{ portfolio.availableFunds }} $
                </div>
              </li>

              <div id="navbarNavDarkDropdown">
                <ul class="navbar-nav">
                  <li class="nav-item dropdown">
                    <a
                      class="nav-link dropdown-toggle text-white"
                      href="#"
                      id="navbarDarkDropdownMenuLink"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {{ user.displayName || user.email }}
                      <img :src="portfolio.photoURL" width="25" height="25" />
                    </a>
                    <ul
                      class="dropdown-menu dropdown-menu-dark"
                      aria-labelledby="navbarDarkDropdownMenuLink"
                      style="background-color: #181a1b;"
                    >
                      <li class="dropdown-item text-center">
                        <router-link to="/profile" class="nav-link text-white"
                          >Profile
                          <i class="bi bi-person-fill text-white"></i>
                        </router-link>
                      </li>
                      <li
                        class="dropdown-item nav-link text-center"
                        @click="signOut()"
                      >
                        <router-link to="/" class="nav-link text-white"
                          >Sign Out
                          <i class="bi bi-box-arrow-right text-white"></i>
                        </router-link>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </ul>
          </form>
          <form class="d-flex ms-auto" v-else>
            <ul class="navbar-nav">
              <li class="nav-item">
                <router-link
                  to="signin"
                  class="nav-link btn btn btn-outline-secondary rounded-pill text-white"
                  >Sign In
                </router-link>
              </li>
              <li class="nav-item">
                <router-link
                  to="signup"
                  class="nav-link btn btn btn-outline-secondary rounded-pill text-white"
                >
                  Sign Up
                </router-link>
              </li>
            </ul>
          </form>
        </div>
      </div>
    </nav>
  </section>
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
nav {
  font-family: Poppins, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
    "Segoe UI Symbol";
}

ul {
  background-color: #181a1b;
}
</style>
