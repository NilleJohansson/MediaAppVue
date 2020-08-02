import { userService } from "../_services";
import { router } from "../_helpers";

const user = JSON.parse(localStorage.getItem("user"));
const state = user
  ? { status: { loggedIn: true }, user }
  : { status: {}, user: null };

const actions = {
  login({ commit }, { username, password }) {
    commit("loginRequest", { username });
    return new Promise((resolve, reject) =>
      userService.login(username, password).then(
        (user) => {
          commit("loginSuccess", user);
          //   if (router.currentRoute !== "/") {
          //     router.push("/");
          //   }
          resolve("Success");
        },
        (error) => {
          commit("loginFailure", error);
        //   dispatch("alert/error", error, { root: true });
          reject("Failure");
        }
      )
    );
  },
  logout({ commit }) {
    userService.logout();
    commit("logout");
  },
  register({ dispatch, commit }, user) {
    commit("registerRequest", user);

    userService.register(user).then(
      (user) => {
        commit("registerSuccess", user);
        router.push("/login");
        setTimeout(() => {
          // display success message after route change completes
          dispatch("alert/success", "Registration successful", { root: true });
        });
      },
      (error) => {
        commit("registerFailure", error);
        dispatch("alert/error", error, { root: true });
      }
    );
  },
};

const mutations = {
  loginRequest(state, user) {
    state.status = { loggingIn: true };
    state.user = user;
  },
  loginSuccess(state, user) {
    state.status = { loggedIn: true };
    state.user = user;
  },
  loginFailure(state) {
    state.status = {};
    state.user = null;
  },
  logout(state) {
    state.status = {};
    state.user = null;
  },
  registerRequest(state, user) {
    state.status = { registering: true, user };
  },
  registerSuccess(state, user) {
    state.status = { user };
  },
  registerFailure(state, error) {
    state.status = { error };
  },
};

export const account = {
  namespaced: true,
  state,
  actions,
  mutations,
};
