<template>
  <div>
    <nav
      v-if="screenDimensions.width > 990"
      class="navbar navbar-expand-lg navbar-dark navbar-toggler"
      style="background-color: #232627"
      data-toggle="collapse"
    >
      <router-link to="/" class="navbar-brand"> Stock Trader </router-link>
      <ul class="navbar-nav mr-auto" style="margin-right: 0">
        <li class="nav-item active">
          <router-link to="/stocks" class="nav-link">Stocks</router-link>
        </li>
        <li class="nav-item active">
          <router-link to="/portfolio" class="nav-link">Portfolio</router-link>
        </li>
      </ul>
      <div class="" id="navbarSupportedContent">
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
    <div v-else>
      <nav class="navbar navbar-expand-lg navbar-dark">
        <div class="container">
          <router-link to="/" class="navbar-brand"> Stock Trader </router-link>
          <div class="d-flex ml-auto">
            <button
              class="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#globalNavbar"
              aria-controls="globalNavbar"
              aria-expanded="true"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon" style=""></span>
            </button>
          </div>
          <div class="navbar-collapse collapse" id="globalNavbar" style="">
            <!-- <form
              class="form-inline form-navbar my-2 my-lg-0 order-2"
              action="https://themes.getbootstrap.com/shop/"
            >
              <input
                class="form-control"
                name="s"
                type="text"
                placeholder="Search"
              />
            </form> -->

            <ul class="navbar-nav d-lg-none" v-if="user.email">
              <li class="nav-item-divider"></li>
              <li class="nav-item">
                <ul class="navbar-nav mr-auto order-1">
                  <li class="nav-item dropdown">
                    <router-link to="/stocks" class="nav-link text-white"
                      >Stocks</router-link
                    >
                  </li>
                  <li class="nav-item">
                    <router-link to="/portfolio" class="nav-link text-white"
                      >Portfolio</router-link
                    >
                  </li>
                </ul>
              </li>
              <div
                class="nav-link text-success"
                style="font: 18px Nunito, sans-serif; margin-top: 5px"
              >
                {{ portfolio.availableFunds }}$
              </div>
              <li class="nav-item dropleft dropdown">
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
                <div class="dropdown-menu bg-dark">
                  <div class="card card-lg bg-dark">
                    <div class="card-body">
                      <ul class="list-styled font-size-sm ">
                        <li class="list-styled-item">
                          <router-link to="/profile" class="list-styled-link text-white"
                            >Profile
                          </router-link>
                        </li>
                        <li class="list-styled-item">
                          <a class="list-styled-link text-white" @click="signOut()">
                            Sign Out
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div
                  class="dropdown-menu"
                  aria-labelledby="navbarDropdown"
                ></div>
              </li>
            </ul>
            <ul class="navbar-nav d-lg-none" v-else>
              <li class="nav-item">
                <ul class="navbar-nav mr auto order-1">
                  <li class="nav-item">
                    <router-link
                      to="signin"
                      class="btn btn-outline-light my-2 my-sm-0"
                      >Sign In
                    </router-link>
                  </li>
                  <li class="nav-item">
                    <router-link
                      to="signup"
                      class="btn btn-outline-light my-2 my-sm-0"
                    >
                      Sign Up
                    </router-link>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import store from "@/store";
import { mapGetters } from "vuex";
import { ScreenDimensions } from "@/storeModules/userModule";
export default Vue.extend({
  computed: {
    ...mapGetters("userModule", ["user", "screenDimensions"]),
    ...mapGetters("portfolio", ["portfolio"]),
    ...mapGetters("userPublicData", ["profilePictureURL"]),
  },
  methods: {
    signOut() {
      store.dispatch("userModule/signOut");
    },
  },
  watch: {
    screenDimensions(screenDimensions: ScreenDimensions) {
      console.log("Event", screenDimensions.width);
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
