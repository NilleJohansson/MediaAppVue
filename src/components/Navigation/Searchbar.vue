<template>
  <div class="search-bar">
    <form v-on:submit.prevent="onSubmit">
      <i @click="onSubmit" class="fa fa-search search"></i>
      <span class="search-container">
        <input
          v-model="title"
          type="text"
          placeholder="Search"
          class="searchBox"
        />
        <i @click="clearSearchText" ref="clearText" class="fas fa-times clear-text mr-2"></i>
      </span>
      <!-- <div class="custom-select-wrapper">
        <div class="custom-media-select">
          <div class="custom-select__trigger">
            <span>Movies</span>
            <div class="arrow"></div>
          </div>
          <div class="custom-options">
            <span class="custom-option selected" data-value="movie">Movies</span>
            <span class="custom-option" data-value="tv">TV Shows</span>
          </div>
        </div>
      </div> -->
      <app-dropdown
        @updateSelect="updateSelect"
        :mediaTypes="this.mediaTypes"
      />
    </form>
  </div>
</template>

<script>
import Dropdown from "../UI/Dropdown";
export default {
  mounted() {
    //   var vm = this;
    //   document
    //     .querySelector(".custom-select-wrapper")
    //     .addEventListener("click", function() {
    //       console.log("Clicked");
    //       this.querySelector(".custom-media-select").classList.toggle("open");
    //     });
    //   for (const option of document.querySelectorAll(".custom-option")) {
    //     option.addEventListener("click", function() {
    //       if (!this.classList.contains("selected")) {
    //         this.parentNode
    //           .querySelector(".custom-option.selected")
    //           .classList.remove("selected");
    //         this.classList.add("selected");
    //         console.log("Selected media ", vm.selectedMediaType);
    //         console.log(this.dataset.value);
    //         vm.selectedMediaType = this.dataset.value;
    //         this.closest(".custom-media-select").querySelector(
    //           ".custom-select__trigger span"
    //         ).textContent = this.textContent;
    //       }
    //     });
    //   }
    //   window.addEventListener("click", function(e) {
    //     const select = document.querySelector(".custom-media-select");
    //     if (!select.contains(e.target)) {
    //       select.classList.remove("open");
    //     }
    //   });
  },
  data() {
    return {
      selectedMediaType: "movie",
      mediaTypes: [
        { type: "Movies", value: "movie" },
        { type: "TV Shows", value: "tv" },
      ],
      title: "",
    };
  },
  methods: {
    onSubmit() {
      console.log(this.title);
      console.log(this.selectedMediaType);
      this.$router.push({
        name: "search",
        params: { title: this.title, type: this.selectedMediaType },
      });
    },
    updateSelect(selectedMediaType) {
      this.selectedMediaType = selectedMediaType;
    },
    clearSearchText() {
      this.title = "";
    }
  },
  watch: {
    title: function() {
      if (this.title !== "") {
        console.log("text");
        this.$refs.clearText.style.visibilty = 'visible';
      }
    }
  },
  components: {
    appDropdown: Dropdown,
  },
};
</script>

<style>
.search-bar {
  width: 100% !important;
  text-align: center;
  border-bottom: 1px solid #e3e3e3;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 8px 0;
}

.search-bar input {
  width: 720px;
  padding-left: 10px;
  border: none;
  outline: none;
  position: relative;
}

.search-container {
  display: inline-block;
  height: 50px !important;
  width: 740px;
  }

.search-bar input:focus + .clear-text,
.search-container:hover .clear-text {
  visibility: visible;
}

*,
*:after,
*:before {
  box-sizing: border-box;
}

.custom-select-wrapper {
  position: relative;
  user-select: none;
  display: inline-block;
  width: 300px;
}
.custom-media-select {
  position: relative;
  display: flex;
  flex-direction: column;
  border-width: 0 2px 0 2px;
  /* border-style: solid; */
  border-color: #394a6d;
}
.custom-select__trigger {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 22px;
  font-size: 20px;
  font-weight: 300;
  color: #3b3b3b;
  height: 60px;
  line-height: 60px;
  background: #ffffff;
  cursor: pointer;
  border-width: 0 0 2px 0;
  border-style: solid;
  border-color: gray;
  width: 100%;
}
.custom-options {
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
.custom-media-select.open .custom-options {
  opacity: 1;
  visibility: visible;
  pointer-events: all;
}
.custom-option {
  position: relative;
  display: block;
  padding: 0 22px 0 22px;
  font-size: 22px;
  font-weight: 300;
  color: black;
  line-height: 60px;
  cursor: pointer;
  transition: all 0.5s;
}
.custom-option:hover {
  cursor: pointer;
  background-color: #b2b2b2;
}
.custom-option.selected {
  color: #ffffff;
  background-color: black;
}

.arrow {
  position: relative;
  height: 15px;
  width: 15px;
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

.searchBox {
  height: 50px;
  font-size: 20px;
}

.search {
  cursor: pointer;
}

.clear-text {
  cursor: pointer;
  visibility: hidden;
  color: darkgray;
}

.clear-text:hover {
  color: black;
}

</style>
