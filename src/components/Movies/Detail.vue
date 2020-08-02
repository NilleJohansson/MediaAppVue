<template>
  <div
    class="bg"
    ref="backgroundImage"
    :style="{ 'background-image': 'url(' + this.media.backdrop + ')' }"
  >
    <span ref="bgOverlay" class="bg-overlay"></span>
    <app-poster-modal
      v-show="isPosterModalVisible"
      @close="closePosterModal"
      :img="this.media.poster"
    />
    <div class="movie-summary">
      <div @click="showPosterModal" class="img">
        <div
          id="expand"
          v-bind:class="{
            'no-image-found':
              this.media.poster === 'https://image.tmdb.org/t/p/w500',
          }"
        >
          <i class="fa fa-expand-arrows-alt"></i>
          Expand
        </div>
        <img
          :src="
            this.media.poster !== 'https://image.tmdb.org/t/p/w500'
              ? this.media.poster
              : require('@/assets/images/no-image-found.png')
          "
          :alt="this.media.title"
          v-bind:class="{
            'no-image-found':
              this.media.poster === 'https://image.tmdb.org/t/p/w500',
          }"
        />
      </div>
      <div class="movie-detail-info">
        <h3 class="mb-2">
          {{ titleJSONConverter(media, type) }}
        </h3>
        <i
          v-on:click="addMediaToWatchlist"
          v-bind:class="{ 'active-icon': addedToWatchlist }"
          class="tooltipButton fas fa-bookmark"
          id="watchlist"
          ><span v-show="status.loggedIn" class="tooltiptext">{{
            addToWatchlistText
          }}</span>
          <span v-show="!status.loggedIn" class="tooltiptext"
            >Login to add this {{ typeConverter() }} to your watchlist</span
          ></i
        >
        <i
          v-on:click="addMediaToFavorites"
          v-bind:class="{ 'active-icon': addedToFavorites }"
          class="tooltipButton fas fa-heart"
          id="favorites"
          ><span v-show="status.loggedIn" class="tooltiptext">{{
            addToFavoritesText
          }}</span>
          <span v-show="!status.loggedIn" class="tooltiptext"
            >Login to add this {{ typeConverter() }} to your favorites</span
          ></i
        >
        <h3 class="mt-2" v-if="media.overview !== ''">Overview</h3>
        <p class="overview">
          {{ media.overview }}
        </p>
      </div>
    </div>
    <app-media-list
      :mediaList="this.similarMedia"
      :title="'You might also enjoy...'"
      :mediaType="this.type"
    />
  </div>
</template>

<script>
import axios from "axios";
import { mapState, mapActions } from "vuex";
import PosterModal from "../Modal/PosterModal";
import ColorThief from "colorthief";
import MediaList from "../Movies/MediaList";
import {
  dateJSONConverter,
  titleJSONConverter,
} from "../../_helpers/JSONConverter.js";
export default {
  watch: {
    "$route.params": function() {
      this.fetchMedia();
    },
    status: function() {
      console.log("Status", this.status);
      this.updateMediaDetailPage();
    }
  },
  mounted() {
    this.fetchMedia();
  },
  computed: {
    ...mapState("account", ["status", "user"]),
  },
  data() {
    return {
      media: {},
      addedToWatchlist: false,
      addedToFavorites: false,
      addToWatchlistText: "Add to Watchlist",
      addToFavoritesText: "Add to Favorites",
      type: "",
      watchlist: false,
      isPosterModalVisible: false,
      similarMedia: {},
    };
  },
  methods: {
    ...mapActions("media", ["addToWatchlist", "addToFavorites"]),
    addMediaToWatchlist() {
      if (!this.status.loggedIn) {
        return;
      }
      this.addedToWatchlist = !this.addedToWatchlist;
      this.changeWatchlistAdded();
      const user = JSON.parse(localStorage.getItem("user"));
      const userid = user.id;
      let media = this.media;
      if (this.type === "tv") {
        media.title = this.media.name;
        media.release_date = this.media.first_air_date;
      }
      media.type = this.type;
      const watchlist = { userid, media };
      this.addToWatchlist(watchlist);
    },
    addMediaToFavorites() {
      if (!this.status.loggedIn) {
        return;
      }
      this.addedToFavorites = !this.addedToFavorites;
      this.changeFavoriteAdded();
      const user = JSON.parse(localStorage.getItem("user"));
      const userid = user.id;
      const media = this.media;
      if (this.type === "tv") {
        media.title = this.media.name;
        media.release_date = this.media.first_air_date;
      }
      media.type = this.type;
      const favorite = { userid, media };
      this.addToFavorites(favorite);
    },
    fetchMedia() {
      var type = this.$route.params.type;
      var id = this.$route.params.id;
      let url = "";
      console.log(id);
      console.log(type);
      console.log("USER", this.user);
      this.type = type;
      if (!this.status.loggedIn) {
        url = "/media/detail/" + type + "/" + id;
      } else {
        url = "/media/detail/" + type + "/" + id + "/" + this.user.id;
      }
      axios
        .get(
          url
        )
        .then((res) => {
          this.media = res.data.media;
          this.addedToWatchlist = res.data.watchlist;
          this.changeWatchlistAdded();
          this.addedToFavorites = res.data.favorite;
          this.similarMedia = res.data.similarMedia;
          this.changeFavoriteAdded();
          console.log(res);
          this.setBackgroundImageFilter();
        })
        .catch((error) => console.log(error));
    },
    setBackgroundImageFilter() {
      let bg = this.$refs.bgOverlay;
      if (this.media.backdrop === "https://image.tmdb.org/t/p/original") {
        bg.style.background = "rgba(34, 36, 35)";
      }
      var image = new Image(360, 360);
      let color;
      console.log(bg);
      image.crossOrigin = "Anonymous";
      image.src = this.media.backdrop;
      image.setVisibility = false;
      console.log(image);
      image.onload = function() {
        var colorThief = new ColorThief();
        color = colorThief.getColor(image);
        console.log(color);
        bg.style.background = `rgba(${color[0]},${color[1]},${color[2]},.90)`;
      };
    },
    showPosterModal() {
      if (this.media.poster === "https://image.tmdb.org/t/p/w500") {
        return;
      }
      this.isPosterModalVisible = true;
    },
    closePosterModal() {
      this.isPosterModalVisible = false;
    },
    dateJSONConverter,
    titleJSONConverter,
    typeConverter() {
      if (this.type === "tv") {
        return "tv show";
      } else {
        return "movie";
      }
    },
    changeWatchlistAdded() {
      this.addToWatchlistText = this.addedToWatchlist
        ? "Remove from watchlist"
        : "Add to watchlist";
    },
    changeFavoriteAdded() {
      this.addToFavoritesText = this.addedToFavorites
        ? "Remove from favorites"
        : "Add to favorites";
    },
    updateMediaDetailPage() {
       if (!this.status.loggedIn) { 
         this.addedToWatchlist = false;
         this.addedToFavorites = false;
       } else {
         this.fetchMedia();
       }
    }
  },
  components: {
    appPosterModal: PosterModal,
    appMediaList: MediaList,
  },
};
</script>

<style scoped>
.bg {
  width: 100%;
  height: 530px;
  align-items: center;
  justify-content: center;
  position: relative;
  /* background-color: rgba(102, 79, 72, 0.2); */
  /* background-color: red;
  filter: brightness(90%) contrast(80%); */
  background-repeat: no-repeat;
  background-size: 100%;
  /* background-blend-mode: screen; */
  /* z-index: -1; */
}

.bg-overlay {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  /* background: rgba(123,51,76,.85); */
}

.movie-summary {
  align-items: center;
  justify-content: center;
  height: 100%;
  display: flex;
  text-overflow: ellipsis;
  overflow: hidden;
}

.movie-summary img {
  max-height: 450px;
  max-width: 300px;
  margin-right: 25px;
}

.movie-detail-info {
  height: 450px;
  color: white;
  margin-left: 25px;
  margin-top: 25px;
  max-width: 790px;
  text-align: left;
  z-index: 2;
}

.tooltipButton {
  position: relative;
  display: inline-block;
}

.tooltipButton .tooltiptext {
  visibility: hidden;
  width: 120px;
  background-color: white;
  color: black;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;
  position: absolute;
  z-index: 1;
  top: 125%;
  left: 50%;
  margin-left: -60px;
  opacity: 0;
  transition: opacity 0.3s;
}

.tooltipButton .tooltiptext::after {
  content: "";
  position: absolute;
  bottom: 100%;
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: transparent transparent white transparent;
}

.tooltipButton:hover .tooltiptext {
  visibility: visible;
  opacity: 1;
}

i.fas {
  display: inline-block;
  border-radius: 50%;
  border: 2px solid white;
  padding: 1em 1.2em;
  transition: 0.5s;
  margin-right: 10px;
}

i.fas:hover {
  background: white;
  color: black;
  transition: 0.5s;
  cursor: pointer;
}

.active-icon {
  color: red !important;
}

#watchlist {
  font-size: 13px;
}

#favorites {
  font-size: 13px;
}

.img {
  position: relative;
  max-width: 300px;
  max-height: 450px;
  display: inline-block;
  z-index: 1;
}

.img img {
  width: 100%;
  height: 100%;
  transition: 0.3s;
  position: relative;
  z-index: 1 !important;
}

.img:hover img {
  filter: blur(2px) brightness(20%);
  cursor: pointer;
}

.img:hover img.no-image-found {
  filter: none;
  cursor: default;
}

.img:hover #expand {
  opacity: 1;
}

.img:hover #expand.no-image-found {
  opacity: 0;
  cursor: default;
}

.img h1 {
  position: relative;
  color: white;
  top: 80%;
  left: 50%;
  font-size: 22px;
  transform: translateX(-50%);
  z-index: 2;
}

#expand {
  position: absolute;
  z-index: 2;
  color: white;
  top: 50%;
  left: 50%;
  font-size: 22px;
  transform: translateX(-50%);
  width: 100;
  opacity: 0;
  cursor: pointer;
}
</style>
