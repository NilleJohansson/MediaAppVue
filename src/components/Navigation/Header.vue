<template>
  <div>
    <app-login-modal
      v-show="isLoginModalVisible"
      @close="closeLoginModal"
      @changeModal="changeModal"
      v-bind:show="isLoginModalVisible"
    />
    <app-register-modal
      v-show="isRegisterModalVisible"
      @close="closeRegisterModal"
      @changeModal="changeModal"
      v-bind:show="isRegisterModalVisible"
    />
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <router-link to="/" class="navbar-brand">MediaApp</router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ml-auto d-lg-flex align-items-center">
          <div class="nav-elements">
            <li v-show="!status.loggedIn" class="nav-item">
              <!-- <router-link to="/login" class="nav-link">Log in</router-link> -->
              <a href="#" @click="showLoginModal">Log in</a>
            </li>
            <li v-show="!status.loggedIn" class="nav-item">
              <!-- <router-link to="/register" class="nav-link">Register</router-link> -->
              <a href="#" @click="showRegisterModal">Register</a>
            </li>
            <li v-if="status.loggedIn" class="nav-item nav-p">
              <router-link to="/profile/8">{{ user.username }}</router-link>
            </li>
            <li v-show="status.loggedIn" class="nav-item">
              <a href="#" @click="logoutUser">Log out</a>
            </li>
          </div>
        </ul>
      </div>
    </nav>
    <app-search-bar></app-search-bar>
  </div>
</template>

<script>
import SearchBar from "./Searchbar";
import { mapState, mapActions } from "vuex";
import LoginModal from "./../Modal/LoginModal";
import RegisterModal from "./../Modal/RegisterModal";
export default {
  components: {
    appSearchBar: SearchBar,
    appLoginModal: LoginModal,
    appRegisterModal: RegisterModal,
  },
  data() {
    return {
      isLoginModalVisible: false,
      isRegisterModalVisible: false,
    };
  },
  computed: {
    ...mapState("account", ["status", "user"]),
    userRoute() {
      return `/profile/${this.user.id}`
    }
  },
  methods: {
    ...mapActions("account", ["logout"]),
    logoutUser() {
      this.logout();
    },
    showLoginModal() {
      this.isLoginModalVisible = true;
    },
    closeLoginModal() {
      this.isLoginModalVisible = false;
    },
    showRegisterModal() {
      this.isRegisterModalVisible = true;
    },
    closeRegisterModal() {
      this.isRegisterModalVisible = false;
    },
    changeModal() {
      console.log("Change modal");
      if (this.isRegisterModalVisible) {
        this.isRegisterModalVisible = false;
        this.isLoginModalVisible = true;
      } else {
        this.isRegisterModalVisible = true;
        this.isLoginModalVisible = false;
      }
    },
  },
};
</script>

<style scoped>
.button-link {
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  margin-bottom: 0;
}

.nav-item p {
  margin-bottom: 0;
}

.navbar .nav-link {
  padding-bottom: 0;
}

.nav-elements {
  display: flex;
  justify-content: space-between;
  width: 120px;
  align-items: center;
  /* padding: 0 20px; */
}

a {
  color: gray !important;
}

a:hover {
  text-decoration: none;
}
</style>
