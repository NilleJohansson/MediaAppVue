a<template>
  <transition name="modal-fade">
    <div @click="outsideClick" class="login-modal-backdrop">
      <div class="login-modal" id="login-modal" ref="loginModal">
        <div class="login-modal-header">
          <h2>Register</h2>
        </div>
        <form @submit.prevent="handleSubmit">
          <div class="login-modal-body">
            <div class="username-wrapper">
              <input
                type="text"
                placeholder="Username"
                onfocus="this.placeholder = ''"
                onblur="this.placeholder = 'Username'"
                v-model="username"
                ref="usernameInput"
              />
              <i class="fas fa-user user-icon"></i>
            </div>
            <div class="password-wrapper">
              <input
                type="text"
                placeholder="Password"
                onfocus="this.placeholder = ''"
                onblur="this.placeholder = 'Password'"
                v-model="password"
              />
              <i class="fas fa-key password-icon"></i>
            </div>
            <div class="password-wrapper">
              <input
                type="text"
                placeholder="Confirm password"
                onfocus="this.placeholder = ''"
                onblur="this.placeholder = 'Confirm password'"
                v-model="confirmedPassword"
              />
              <i class="fas fa-key password-icon"></i>
            </div>
            <div>
              <p v-if="submitted">Incorrect username or password</p>
            </div>
            <button>REGISTER</button>
          </div>
        </form>
        <div class="login-modal-footer">
          <hr />
          <p>
            Already have an account?
            <span class="create-account" @click="change">Login here.</span>
          </p>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { required } from "vuelidate/lib/validators";

export default {
  props: ["img", "show"],
  data() {
    return {
      username: "",
      password: "",
      confirmedPassword: "",
      submitted: false,
    };
  },
  watch: {
    show: function() {
      if (this.show) {
        this.$refs.usernameInput.focus();
      }
    },
  },
  computed: {
    ...mapState("account", ["status"]),
  },
  validations: {
    user: { required },
    password: { required },
  },
  methods: {
    ...mapActions("account", ["login", "logout"]),
    handleSubmit() {
      const { username, password } = this;
      if (username && password) {
        this.login({ username, password })
          .then((res) => {
            console.log(res);
            if (res === "Success") {
              this.close();
              setTimeout(() => {
                this.username = "";
                this.password = "";
                this.submitted = false;
              }, 500);
            }
          })
          .catch((error) => {
            this.submitted = true;
            console.log(error);
          });
      }
    },
    close() {
      this.$emit("close");
    },
    change() {
      this.$emit("changeModal");
    },
    outsideClick(e) {
      console.log("Close call");
      console.log(this.$refs.loginModal);
      console.log(e.target);
      if (
        !this.$refs.loginModal.contains(e.target) &&
        this.$refs.loginModal !== e.target
      ) {
        console.log("Closed!");
        this.$emit("close");
      }
    },
  },
};
</script>

<style scoped>
.login-modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 4;
}

.login-modal {
  background: #ffffff;
  box-shadow: 2px 2px 20px 1px rgba(0, 0, 0, 0.3);
  overflow-x: auto;
  display: flex;
  flex-direction: column;
  height: 850px;
  width: 600px;
  position: relative;
  overflow: visible;
  border-top: #0177D2 5px solid;
}

.login-modal-header {
  margin: 60px 0;
}

.login-modal-header h2 {
  font-weight: bold;
}

.login-modal-body {
  display: flex;
  flex-direction: column;
  align-items: center;
}

button {
  padding: 15px 0;
  width: 70%;
  background: #0177D2;
  color: white;
  font-weight: bold;
  outline: none;
  border: none;
  border-radius: 5px;
  margin-top: 10px;
}

button:focus {
  outline: none;
}

button:active {
  transform: scale(0.99);
}

.modal-fade-enter,
.modal-fade-leave-active {
  opacity: 0;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.4s ease;
}

.username-wrapper {
  width: 70%;
  position: relative;
}

.password-wrapper {
  width: 70%;
  position: relative;
}

input {
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  outline: none;
  display: block;
  width: 100%;
  padding: 7px;
  border: none;
  border-bottom: 1px solid #ddd;
  background: transparent;
  margin-bottom: 10px;
  font: 16px Arial, Helvetica, sans-serif;
  height: 45px;
  color: gray;
  transition: 0.5s ease-in-out;
}

.password-icon {
  transition: 0.5s ease-in-out;
}

.user-icon {
  transition: 0.5s ease-in-out;
}

input:focus {
  color: black;
}

input:focus + .password-icon {
  color: #0177D2;
}

input:focus + .user-icon {
  color: #0177D2;
}

input[type="text"] {
  padding-left: 30px;
}

#forgot-password {
  margin-top: 8px;
  color: gray;
  text-decoration: underline;
}

.login-modal-footer {
  margin-top: 60px;
}

.user-icon {
  position: absolute;
  left: 3px;
  top: 13px;
  color: gray;
}

.password-icon {
  position: absolute;
  left: 3px;
  top: 13px;
  color: gray;
}

.create-account {
  text-decoration: underline;
  color: #0177D2;
  cursor: pointer;
}
</style>
