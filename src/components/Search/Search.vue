<template>
  <div class="text-center mb-5">
    <!-- <h3 class="mt-3">Search > {{ mediaType }}</h3>
    <div class="row justify-content-center">
      <div
        v-for="(media, index) in mediaList"
        v-bind:key="index"
        class="cards col-12"
      >
        <div class="movie-card mx-auto">
          <router-link
            :key="$route.fullPath"
            :to="{ path: '/detail/' + media.id + '/' + type }"
            class="image-content router-link"
          >
            <div class="inner">
              <img :src="media.poster" :alt="media.title" />
            </div>
          </router-link>
          <div class="movie-info text-left">
            <router-link
              :key="$route.fullPath"
              :to="{ path: '/detail/' + media.id + '/' + type }"
              ><h3>{{ titleJSONConverter(media, type) }}</h3></router-link
            >
            <p>{{ dateFormatter(dateJSONConverter(media, type)) }}</p>
            <p class="overview">{{ media.overview }}</p>
          </div>
        </div>
      </div>
    </div> -->
    <app-media-list
      :mediaList="this.mediaList"
      :title="this.mediaTypeTitle"
      :mediaType="this.mediaListTitle"
    />
  </div>
</template>

<script>
import axios from "axios";
import {
  dateJSONConverter,
  titleJSONConverter
} from "../../_helpers/JSONConverter.js";
import MediaList from "../Movies/MediaList";
export default {
  watch: {
    "$route.params.type": function() {
      this.fetchMedia();
    },
    "$route.params.title": function() {
      this.fetchMedia();
    }
  },
  mounted() {
    this.fetchMedia();
  },
  components: {
    appMediaList: MediaList
  },
  data() {
    return {
      mediaList: [],
      mediaListTitle: ""
    };
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
    fetchMedia() {
      var type = this.$route.params.type;
      var title = this.$route.params.title;
      this.mediaListTitle = type;
      console.log("Fetch media type", this.type);
      axios
        .get("/media/" + title + "/" + type)
        .then(res => {
          console.log("Medialist", res.data);
          this.mediaList = res.data;
        })
        .catch(error => console.log(error));
    },
    dateJSONConverter,
    titleJSONConverter
  },
  computed: {
    mediaTypeTitle() {
      console.log("Computed media type");
      console.log(this.mediaListTitle);
      if (this.mediaListTitle === "movie") {
        return "Search > Movies";
      } else if (this.mediaListTitle === "tv") {
        return "Search > TV Shows";
      } else {
        return "";
      }
    },
  }
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
</style>
