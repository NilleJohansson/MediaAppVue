<template>
  <transition name="modal-fade">
    <div @click="outsideClick" class="poster-modal-backdrop">
      <div class="poster-modal">
        <img id="poster" :src="img" alt="" />
        <a @click="close" id="deleteButton"><i class="fas fa-times"></i> </a>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: ["img"],
  methods: {
    close() {
      this.$emit("close");
    },
    outsideClick(e) {
      if (e.target.id !== "poster") {
        this.$emit("close");
      }
    }
  }
};
</script>

<style scoped>
.poster-modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 3;
}

.poster-modal {
  background: #ffffff;
  box-shadow: 2px 2px 20px 1px rgba(0, 0, 0, 0.3);
  overflow-x: auto;
  display: flex;
  flex-direction: column;
  height: 1063px;
  width: 709px;
  position: relative;
  overflow: visible;
}

.poster-modal img {
  width: 100%;
}

.poster-modal a {
  position: absolute;
  top: -16px;
  right: -30px;
}

i.fas {
  display: inline-block;
  background: red;
  color: white;
  border-radius: 50%;
  border: 2px solid red;
  padding: 1em 1.2em;
  transition: 0.5s;
  margin-right: 10px;
  font-size: 12px;
  transition: all 0.5s ease-in-out;
}

a:hover i.fas {
  transform: scale(1.1);
  cursor: pointer;
}

.modal-fade-enter,
.modal-fade-leave-active {
  opacity: 0;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.4s ease;
}
</style>
