<template>
  <b-navbar toggleable="lg" type="dark" variant="info">
    <b-navbar-brand href="#">
      <router-link to="/" class="navbar-brand">Stock Trader</router-link>
    </b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
    <!-- <button
      @click="func()"
      type="button"
      class="btn btn-light dropdown-toggle"
      data-toggle="dropdown"
      aria-haspopup="true"
      aria-expanded="false"
    >Update User Funds</button>-->
    <!-- <a>Funds: {{ funds }}</a> -->

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <router-link to="/stocks" class="nav-link">Stocks</router-link>
      </b-navbar-nav>
      <b-navbar-nav>
        <router-link to="/portfolio" class="nav-link">Portfolio</router-link>
      </b-navbar-nav>
      <b-navbar-nav class="ml-auto" v-if="userData !== undefined || ''">
        <!-- <b-nav-form>
          <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
          <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
        </b-nav-form>-->
        <div>
          <b-nav-item-dropdown right>
            <template v-slot:button-content>
              <em>{{ userData.user.displayName }}</em>
            </template>
            <b-dropdown-item>
              <router-link to="/profile">Profile</router-link>
            </b-dropdown-item>
            <b-dropdown-item @click="logOut()">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
          <!-- <b-button size="sm" class="my-2 my-sm-0" type="submit">End day</b-button> -->
        </div>
      </b-navbar-nav>
      <b-navbar-nav class="ml-auto" v-else>
        <div>
          <router-link
            to="/logIn"
            size="sm"
            class="my-2 my-sm-0 log-In-Button"
            type="submit"
          >
            <b-button>Log In</b-button>
          </router-link>
          <router-link
            to="/signUp"
            size="sm"
            class="my-2 my-sm-0"
            type="submit"
          >
            <b-button>Sign Up</b-button>
          </router-link>
        </div>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script lang="ts">
import Vue from "vue";
import store from "@/store";
import { userPriceHistory } from "@/store";
import { Account } from "@/Classes/Account";
// import { mapState } from "vuex";
export default Vue.extend({
  data() {
    return {
      // latestUserFunds: Array<userPriceHistory>()
      avaibleUserFunds: Number(),
      userClass: Object(),
    };
  },
  // Todo: Find a way to use mapState, can't right now because have to go through userModule
  computed: {
    loggedIn() {
      return store.state.userModule.loggedIn;
    },
    userData() {
      return store.getters.getAccount.user !== undefined
        ? store.getters.getAccount
        : undefined;
    },
  },
  methods: {
    logOut() {
      store.dispatch("signOut");
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

.log-In-Button {
  margin-right: 10px;
}
</style>
