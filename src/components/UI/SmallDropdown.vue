<template>
  <div class="custom-select-wrapper-small">
    <div class="custom-media-select-small" :class="{ 'open' : selectionOpen }" v-on:click="openSelection">
      <div class="custom-select__trigger-small">
        <span>Alphabetical</span>
        <div class="arrow"></div>
      </div>
      <div class="custom-options-small">
        <span
          v-for="(filterType, index) in filterTypes"
          class="custom-option-small"
          :class="{ 'selected' : index === 0 }"
          :data-value="filterType"
          v-bind:key="index"
        >
          {{ filterType }}</span
        >
        <!-- <span class="custom-option selected" data-value="movie">Movies</span>
        <span class="custom-option" data-value="tv">TV Shows</span> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    var vm = this;

    document
      .querySelector(".custom-select-wrapper-small")
      .addEventListener("click", function() {
        console.log("Clicked");
        // this.querySelector(".custom-media-select-small").classList.toggle("open");
      });

    for (const option of document.querySelectorAll(".custom-option-small")) {
      option.addEventListener("click", function() {
        if (!this.classList.contains("selected")) {
          this.parentNode
            .querySelector(".custom-option-small.selected")
            .classList.remove("selected");
          this.classList.add("selected");
          console.log("Selected media ", vm.filterSetting);
          console.log(this.dataset);
          vm.filterSetting = this.dataset.value;
          console.log("Updated selected media ", vm.filterSetting);
          vm.updateFilter(vm.filterSetting);
          this.closest(".custom-media-select-small").querySelector(
            ".custom-select__trigger-small span"
          ).textContent = this.textContent;
        }
      });
    }

    window.addEventListener("click", function(e) {
      const select = document.querySelector(".custom-media-select-small");
      if (!select.contains(e.target)) {
        select.classList.remove("open");
      }
    });
  },
  props: ["filterTypes"],
  data() {
    return {
      filterSetting: "alphabetical",
      title: "",
      selectionOpen: false
    };
  },
  methods: {
    updateFilter(filterSetting) {
      console.log(filterSetting);
      this.$emit("updateFilter", filterSetting);
    },
    openSelection() {
      console.log("Selection", this.selectionOpen);
      this.selectionOpen = !this.selectionOpen;
    }
  }
};
</script>

<style scoped>
*,
*:after,
*:before {
  box-sizing: border-box;
}

.custom-select-wrapper-small {
  position: relative;
  user-select: none;
  display: inline-block;
  min-width: 150px;
  z-index: 3;
}
.custom-media-select-small {
  position: relative;
  display: flex;
  flex-direction: column;
  border-width: 0 2px 0 2px;
  /* border-style: solid; */
  border-color: #394a6d;
}
.custom-select__trigger-small {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 15px;
  font-size: 14px;
  font-weight: 600;
  color: #3b3b3b;
  height: 40px;
  line-height: 40px;
  background: #ffffff;
  cursor: pointer;
  border-width: 0 0 2px 0;
  border-style: solid;
  border-color: gray;
  width: 100%;
}
.custom-options-small {
  position: absolute;
  display: block;
  top: 100%;
  left: 0;
  right: 0;
  border: 2px solid black;
  border-top: 0;
  background: #fff;
  transition: all 0.5s;
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  z-index: 2;
}
.custom-media-select-small.open .custom-options-small {
  opacity: 1;
  visibility: visible;
  pointer-events: all;
}
.custom-option-small {
  position: relative;
  display: block;
  padding: 0 22px 0 22px;
  font-size: 16px;
  font-weight: 200;
  color: black;
  line-height: 60px;
  cursor: pointer;
  transition: all 0.5s;
}
.custom-option-small:hover {
  cursor: pointer;
  background-color: #b2b2b2;
}
.custom-option-small.selected {
  color: #ffffff;
  background-color: black;
}

.arrow {
  position: relative;
  height: 15px;
  width: 10px;
  margin-left: 25px;
}
.arrow::before,
.arrow::after {
  content: "";
  position: absolute;
  bottom: 0px;
  width: 0.15rem;
  height: 100%;
  transition: all 0.5s;
}
.arrow::before {
  left: -5px;
  transform: rotate(-45deg);
  background-color: black;
}
.arrow::after {
  left: 5px;
  transform: rotate(45deg);
  background-color: black;
}
.open .arrow::before {
  left: -5px;
  transform: rotate(45deg);
}
.open .arrow::after {
  left: 5px;
  transform: rotate(-45deg);
}
</style>
