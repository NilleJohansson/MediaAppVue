<template>
  <div class="media-list">
    <h3 class="mt-3">{{ this.title }}</h3>
    <div class="row justify-content-center">
      <div
        v-for="(media, index) in this.mediaList"
        v-bind:key="index"
        class="cards col-12"
      >
        <div class="movie-card mx-auto">
          <router-link
            :key="$route.fullPath"
            :to="{ path: '/detail/' + media.id + '/' + mediaType }"
            class="image-content router-link"
          >
            <div class="inner">
              <img :src="media.poster !== 'https://image.tmdb.org/t/p/w500' ? media.poster : require('@/assets/images/no-image-found.png')" :alt="media.title" />
            </div>
          </router-link>
          <div class="movie-info text-left">
            <router-link
              :key="$route.fullPath"
              :to="{ path: '/detail/' + media.id + '/' + mediaType }"
              ><h3>{{ titleJSONConverter(media, mediaType) }}</h3></router-link
            >
            <p>{{ dateFormatter(dateJSONConverter(media, mediaType)) }}</p>
            <p class="overview">{{ media.overview }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  dateJSONConverter,
  titleJSONConverter
} from "../../_helpers/JSONConverter.js";
export default {
  mounted() {
    console.log("Media list", this.mediaList);
    console.log("Title", this.title);
    console.log("MediaType", this.mediaType);
  },
  props: ["mediaList", "title", "mediaType"],
  watch: {
    immediate: true,
    title: function(newVal, oldVal) {
      console.log("Prop changed: ", newVal, "| was: ", oldVal);
    }
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
    dateJSONConverter,
    titleJSONConverter
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

.media-list {
  margin-bottom: 50px;
}
</style>
