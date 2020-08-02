<template>
  <div>
    <div class="user-profile-header col-12">
      <div class="user-info">
        <div class="first-letter">{{ this.firstLetter }}</div>
        <div class="username-member">
        <p class="username">{{ user.username }}</p>
        <p class="member-since">Member since {{ this.registerDate}}</p>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row">
        <ul class="user-profile-menu nav-tabs col-12">
          <li
            @click.prevent="setActive('watchlist')"
            :class="{ active: isActive('watchlist') }"
            ref="watchlistLink"
            class="watchlistUnderline"
          >
            <a href="#watchlist">Watchlist</a>
          </li>
          <li
            @click.prevent="setActive('favorites')"
            :class="{ active: isActive('favorites') }"
            ref="favoritesLink"
            class="favoritesUnderline"
          >
            <a href="#favorites">Favorites</a>
          </li>
        </ul>
        <div class="tab-content py-3" id="myTabContent">
          <div
            class="tab-pane tab-watchlist fade"
            :class="{ 'active show': isActive('watchlist') }"
            id="watchlist"
          >
            <app-profile-list
              v-bind:medialist="watchlist"
              v-bind:loaded="loaded"
              title="My Watchlist"
              listType="watchlist"
            ></app-profile-list>
          </div>
          <div
            class="tab-pane tab-favorites fade"
            :class="{ 'active show': isActive('favorites') }"
            id="favorites"
          >
            <app-profile-list
              v-bind:medialist="favorites"
              v-bind:loaded="loaded"
              title="My Favorites"
              listType="favorites"
            ></app-profile-list>
          </div>
        </div>
      </div>
      <!-- <div class="profile-media-list">
        <div class="left-side-menu">
        <h3 class="">My Watchlist</h3>
        <ul class="media-type-menu">
          <li>Movies</li>
          <li>TV</li>
        </ul>
        </div>
        <div class="right-side-menu">
        <p>Filter by:</p>
        <select
          name="filter"
          @change="filterOnChange()"
          id="filter"
          v-model="key"
        >
          <option selected value="alphabetical">Alphabetical</option>
          <option value="dateadded">Date Added</option>
          <option value="releasedate">Release Date</option>
        </select>
        <p>Order by: </p>
        <span @click="changeOrder"><a href="#"><div class="fas fa-arrow-down rotate" v-bind:class="{down: orderAsc}"></div></a></span>
      </div>
      </div> -->
    </div>
    <br />
  </div>
</template>

<script>
import axios from "axios";
import {
  dateJSONConverter,
  titleJSONConverter,
} from "../../_helpers/JSONConverter.js";
import { mediaListBus } from "../../main";
import ProfileList from "./ProfileList";
import { mapState } from "vuex";
import * as moment from "moment/moment";

export default {
  watch: {
    status: function() {
      if (!this.status.loggedIn) {
        this.$router.push({ name: 'home' })
      }
    }
  },
  data() {
    return {
      watchlist: [],
      favorites: [],
      key: "alphabetical",
      orderAsc: true,
      activeItem: "watchlist",
      loaded: false
    };
  },
  computed: {
    ...mapState("account", ["status", "user"]),
    firstLetter() {
      console.log(this.user.username);
      return this.user.username.substring(0, 1).toUpperCase();
    },
    registerDate() {
      return moment(this.user.registered).format('MMMM YYYY');
    }
  },
  created() {
    mediaListBus.$on("deleteMedia", (data) => {
      const { listType, id } = data;
      if (listType === "watchlist") {
        this.watchlist = this.watchlist.filter((item) => {
          return item.mediaId !== id;
        });
      } else {
        this.favorites = this.favorites.filter((item) => {
          return item.mediaId !== id;
        });
      }
    });
  },
  mounted() {
    axios
      .get(`/media/medialists/${this.user.id}`)
      .then((res) => {
        console.log(res.data);
        this.watchlist = JSON.parse(JSON.stringify(res.data.watchlist));
        this.favorites = JSON.parse(JSON.stringify(res.data.favorites));
        this.loaded = true;
      })
      .catch((error) => console.log(error));
  },
  components: {
    appProfileList: ProfileList,
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
    isActive(menuItem) {
      return this.activeItem === menuItem;
    },
    setActive(menuItem) {
      if (menuItem !== this.activeItem) {
        console.log("Here");
        // this.$refs.favoritesLink.classList.toggle("highlight");
        // this.$refs.watchlistLink.classList.toggle("highlight");
      }

      this.activeItem = menuItem;
    },
    deleteFromMediaList() {},
    dateJSONConverter,
    titleJSONConverter,
  },
};
</script>

<style scoped>
.user-profile-header {
  height: 230px;
  background: #042842;
  display: flex;
  justify-content: center;
  align-items: center;
}

.user-profile-menu {
  list-style-type: none;
  padding: 0;
  float: right;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
}

.user-profile-menu > li {
  display: inline-block;
}

.user-profile-menu > li a {
  display: block;
  text-align: center;
  padding: 16px;
  text-decoration: none;
}

.media-type-menu {
  list-style-type: none;
  padding: 0;
}

.media-type-menu > li {
  display: inline-block;
}

.media-type-menu > li a {
  padding: 16px;
  text-decoration: none;
}

.user-profile-menu > li {
  width: 100%;
}

.user-profile-menu > li:nth-child(1) ~ span {
  left: 0%;
}

.user-profile-menu > li:nth-child(2) ~ span {
  left: 50%;
}

/* .user-profile-menu > li {
  transition: .3s ease-in-out;
} */

.user-profile-menu > li.active {
  /* border-bottom: 3px blue solid; */
}

.user-profile-menu > li {
  /* content: '';
  border-bottom: 3px solid blue;
  width: 50%;
  display: block; */
}

.watchlistUnderline::after {
  content: "";
  border-bottom: 3px solid #0177D2;
  width: 100%;
  display: block;
  transform: translateX(100%);
  transition: transform 0.8s ease-in-out;
}

.watchlistUnderline.active::after {
  transform: translateX(0%);
}

.movie-card {
  display: flex;
  height: 250px;
  border: 1px solid #e3e3e3;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  width: 1000px;
  text-overflow: ellipsis;
  overflow: hidden;
  margin-top: 16px;
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

.highlight {
  border-bottom: 1px #0177D2;
}

#myTabContent {
  width: 100%;
}

.user-info {
  height: 50px;
  display: flex;
  width: 50%;
  justify-content: center;
  align-items: center;
  margin-right: 400px;
}

.first-letter {
  background: #0177D2;
  border-radius: 50%;
  height: 170px;
  width: 170px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 82px;
  color: #fff;
}

.username {
  margin-left: 10px;
  font-size: 32px;
  color: #fff;
}

.member-since {
  color: #ddd;
  margin-left: 10px;
}

.username-member {
  display: flex;
  align-items: baseline;
  justify-content: center;
}

/* 
.tab-watchlist.active {
  animation: slide-in-left 1.5s ease-in-out;
}

.tab-favorites.active {
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
}

@keyframes slide-in-right {
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
