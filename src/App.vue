<template>
  <div id="app">
    <app-header></app-header>
    <div v-if="alert.message" :class="`alert ${alert.type}`">
      {{ alert.message }}
    </div>
    <transition name="fade" mode="out-in">
      <router-view :key="$route.fullPath"></router-view>
    </transition>
  </div>
</template>

<script>
import Header from "./components/Navigation/Header.vue";
import { mapState, mapActions } from "vuex";

export default {
  name: "app",
  components: {
    appHeader: Header,
  },
  computed: {
    ...mapState({
      alert: (state) => state.alert,
    }),
  },
  methods: {
    ...mapActions({
      clearAlert: "alert/clear",
    }),
  },
  watch: {
    // $route(to, from) {
    //   // clear alert on location change
    //   this.clearAlert();
    // }
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Roboto:300,300i,500,700,900&display=swap");

#app {
  font-family: "Roboto", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

body {
  overflow-y: scroll;
  overflow-x: hidden;
}

.fade-enter-active,
.fade-leave-active {
  transition-duration: .3s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0

}
</style>
