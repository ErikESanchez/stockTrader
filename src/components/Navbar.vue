<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <router-link to="/" class="navbar-brand">
      Stock Trader
    </router-link>
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
      <form class="form-inline my-2 my-lg-0" v-if="account">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <div class="nav-link">Funds</div>
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
              {{ account.user.email || account.user.displayName }}
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
              <router-link to="/profile" class="dropdown-item"
                >Profile</router-link
              >
              <router-link to="/" class="dropdown-item" @click="logOut()">
                Sign out
              </router-link>
            </div>
          </li>
        </ul>
      </form>

      <!-- <form class="form-inline my-2 my-lg-0">
        <input
          class="form-control mr-sm-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
        />
        <button class="btn btn-outline-success my-2 my-sm-0" type="submit">
          Search
        </button>
      </form> -->
    </div>
  </nav>
</template>

<script lang="ts">
import Vue from "vue";
import store from "@/store";
import { userPriceHistory } from "@/store";
import { Account } from "@/Classes/Account";
import { mapState } from "vuex";
export default Vue.extend({
  data() {
    return {
      latestUserFunds: Array<userPriceHistory>(),
    };
  },

  // Todo: Find a way to use mapState, can't right now because have to go through userModule
  computed: {
    ...mapState("userModule", ["loggedIn", "account"]),
    ...mapState("portfolio", ["portfolio"]),
  },
  methods: {
    logOut() {
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

.log-In-Button {
  margin-right: 10px;
}
</style>
