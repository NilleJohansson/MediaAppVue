<template>
  <div>
    <div class="profile-media-list">
      <div class="left-side-menu">
        <h3 class="">{{ title }}</h3>
        <ul class="media-type-menu">
          <li
            @click.prevent="setActive('movie')"
            :class="{ active: isActive('movie') }"
            ref="movieLink"
            id="movieLinkUnderline"
          >
            <a href="#movie"
              ><span
                ><span class="media-type-title">Movies</span>
                <span class="media-amount">{{ movies.length }}</span></span
              ></a
            >
          </li>
          <li
            @click.prevent="setActive('tv')"
            :class="{ active: isActive('tv') }"
            ref="tvLink"
            id="tvShowUnderline"
          >
            <a href="#tv"
              ><span
                ><span class="media-type-title">TV Shows</span>
                <span class="media-amount">{{ tvShows.length }}</span></span
              ></a
            >
          </li>
        </ul>
      </div>
      <div class="right-side-menu">
        <p>Filter by:</p>
        <!-- <select
          name="filter"
          @change="filterOnChange()"
          id="filter"
          v-model="key"
        >
          <option selected value="alphabetical">Alphabetical</option> -->
          <!-- <option value="dateadded">Date Added</option> -->
          <!-- <option value="releasedate">Release Date</option>
        </select> -->
        <app-small-dropdown :filterTypes="filterTypes" @updateFilter="updateFilter" />
        <p>Order by:</p>
        <span @click="changeOrder" id="arrow"
          ><a href="#"
            ><div
              class="fas fa-arrow-down rotate"
              v-bind:class="{ down: orderAsc }"
            ></div></a
        ></span>
      </div>
    </div>
    <div class="tab-content py-3" id="myTabContent">
      <div
        class="tab-pane tab-movie fade"
        :class="{ 'active show': isActive('movie') }"
        id="movie"
      >
        <app-profile-media-list
          v-bind:medialist="movies"
          :listType="listType"
        ></app-profile-media-list>
      </div>
      <div
        class="tab-pane tab-tv fade"
        :class="{ 'active show': isActive('tv') }"
        id="tv"
      >
        <app-profile-media-list
          v-bind:medialist="tvShows"
          :listType="listType"
        ></app-profile-media-list>
      </div>
    </div>
  </div>
</template>

<script>
import {
  dateJSONConverter,
  titleJSONConverter,
} from "../../_helpers/JSONConverter.js";
import ProfileMediaList from "./ProfileMediaList";
import SmallDropdown from "../UI/SmallDropdown";
export default {
  props: ["medialist", "title", "listType", "loaded"],
  watch: {
    loaded: function() {
      console.log("Here");
      this.filterOnChange();
    }
  },
  data() {
    return {
      orderAsc: true,
      key: "alphabetical",
      activeItem: "movie",
      filterTypes: ["Alphabetical", "Release Date"],
      onLoad: true,
    };
  },
  components: {
    appProfileMediaList: ProfileMediaList,
    appSmallDropdown: SmallDropdown
  },
  computed: {
    movies() {
      return this.medialist.filter((media) => media.media.type === "movie");
    },
    tvShows() {
      return this.medialist.filter((media) => media.type === "tv");
    },
  },
  methods: {
    dateFormatter(date) {
      if (date == null) {
        return;
      }

      var parts = date.split("-");

      const newDate = new Date(parts[0], parts[1], parts[2]);
      const month = newDate.toLocaleString("default", { month: "long" });

      return `${month} ${parts[2]}, ${parts[0]}`;
    },
    updateFilter(filter) {
      if (filter === "Release Date") {
        this.key = "releasedate";
      } else if (filter === "Alphabetical") {
        this.key = "alphabetical";
      }
      console.log("This key", this.key);
      console.log("Update filter");
      this.filterOnChange();
    },
    changeOrder() {
      this.orderAsc = !this.orderAsc;
      this.filterOnChange();
    },
    isActive(menuItem) {
      return this.activeItem === menuItem;
    },
    setActive(menuItem) {
      if (menuItem !== this.activeItem) {
        console.log("Here");

        // this.$refs.movieLink.classList.toggle("highlight");
        // this.$refs.tvLink.classList.toggle("highlight");
      }

      this.activeItem = menuItem;
    },

    filterOnChange() {
      console.log("Filter on change");
      console.log("Medialist", this.medialist);
      console.log("Movies", this.movies);
      const orderAsc = this.orderAsc;
      if (this.key === "alphabetical") {
        console.log("Alpha");
        this.medialist.sort(function(a, b) {
          var textA = a.media.title.toUpperCase();
          var textB = b.media.title.toUpperCase();

          if (orderAsc === true) {
            console.log("TextA", textA);
            console.log("TextB", textB);
            console.log(textA.localeCompare(textB));
            return textA.localeCompare(textB);
          } else {
            console.log(textA.localeCompare(textB));
            return textB.localeCompare(textA);
          }
        });
      } else if (this.key === "dateadded") {
        return;
      } else if (this.key === "releasedate") {
        console.log("Release");
        this.medialist.sort(function(a, b) {
          if (orderAsc === true) {
            return (
              new Date(a.media.release_date) - new Date(b.media.release_date)
            );
          } else {
            return (
              new Date(b.media.release_date) - new Date(a.media.release_date)
            );
          }
        });
      }
    },
    dateJSONConverter,
    titleJSONConverter,
  },
};
</script>

<style scoped>
.movie-card {
  display: flex;
  height: 250px;
  border: 1px solid #e3e3e3;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  width: 1000px;
  text-overflow: ellipsis;
  overflow: hidden;
  margin-top: 20px;
  width: 100%;
}

.image-content {
  height: 100%;
  max-width: 165px;
}

.inner {
  height: 100%;
  max-width: 165px;
  overflow: hidden;
}

.movie-info {
  margin-top: 5px;
  margin-left: 10px;
  padding: 10px;
}

.movie-info p {
  word-wrap: break-word;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
}

.movie-info h3 {
  margin-bottom: 0px;
}

.release-date {
  margin-top: 0px;
  color: #a0a0a0;
}

.overview {
  margin-top: 20px;
}

img {
  height: 100%;
  max-width: 165px;
  transition: all 1s ease;
}

.movie-card:hover img {
  transform: scale(1.1);
}

a {
  color: black;
}

a:hover {
  color: black;
  text-decoration: none;
}

.profile-media-list {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.left-side-menu {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.left-side-menu h3,
.left-side-menu ul {
  display: flex;
  align-items: center;
  height: 100%;
  margin: 0 15px 0 0px;
}

.left-side-menu ul li {
  margin-right: 5px;
}

.right-side-menu {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.right-side-menu * {
  display: flex;
  align-items: center;
  height: 100%;
  margin: 0 0 0 10px;
}

.media-type-menu {
  list-style-type: none;
  padding: 0;
}

.media-type-menu > li {
  width: 135px;
  margin-right: 0px !important;
}

.media-type-menu > li::after {
}

.media-type-menu > li a {
  padding: 16px;
  text-decoration: none;
  height: 100%;
  width: 80px;
}

.user-profile-menu > li {
  width: 100%;
  /* border-bottom: 1px solid blue; */
}

.user-profile-menu > li a:hover {
}

.highlight {
  border-bottom: 1px #0177d2;
}

.flex {
  display: flex;
  justify-content: space-between;
}

.block {
  display: block;
}

.rotate {
  -moz-transition: all 0.3s linear;
  -webkit-transition: all 0.3s linear;
  transition: all 0.3s linear;
}

.down {
  -ms-transform: rotate(180deg);
  -moz-transform: rotate(180deg);
  -webkit-transform: rotate(180deg);
  transform: rotate(180deg);
}

#myTabContent {
  /* width: 1140px; */
}

.media-type-title {
  /* display: flex;
  justify-content: space-between; */
}

.media-amount {
  color: #0177d2;
}

#movieLink {
}

#movieLinkUnderline::after {
  box-sizing: border-box;
  content: "";
  border-bottom: 3px solid #0177d2 !important;
  width: 100%;
  display: block;
  transform: translateX(100%);
  transition: transform 0.8s ease-in-out;
}

#movieLinkUnderline.active::after {
  transform: translateX(0%);
}

.right-side-menu {
  margin-right: 20px;
}

.right-side-menu * {
  margin-left: 3px;
}

.media-type-title {
  float: left;
  margin-left: 10px;
  height: 100%;
}

.media-amount {
  float: right;
  margin-right: 10px;
  height: 100%;
}

.arrow * {
  margin: 0;
  padding: 0;
}

/* .tab-movie.active {
  animation: slide-in-left 1.5s ease-in-out;
} */

/* .tab-movie {
  animation: slide-out-left 1.5s ease-in-out;
} */

/* .tab-tv.active {
  animation: slide-in-right 1.5s ease-in-out;
}

@keyframes slide-in-left {
  0% {
    opacity: 0;
    transform: translateX(100%);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
} */

/* @keyframes slide-out-left {
  0% {
    opacity: 1;
    transform: translateX(0);
  }
  100% {
    opacity: 0;
    transform: translateX(100%);
  }
} */

/* @keyframes slide-in-right {
  0% {
    opacity: 0;
    transform: translateX(-100%);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
} */
</style>
