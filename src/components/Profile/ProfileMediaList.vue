<template>
  <div>
    <transition-group name="flip-list" tag="div">
      <div v-for="(media) in medialist" v-bind:key="media.media.id">
        <div class="movie-card mx-auto">
          <router-link
            :key="$route.fullPath"
            :to="{ path: '/detail/' + media.media.id + '/' + media.media.type }"
            class="image-content router-link"
          >
            <div class="inner">
              <img :src="media.media.poster" :alt="media.media.title" />
            </div>
          </router-link>
          <div class="movie-info text-left">
            <router-link
              :key="$route.fullPath"
              :to="{
                path: '/detail/' + media.media.id + '/' + media.media.type,
              }"
              ><h3>
                {{ media.media.title }}
              </h3></router-link
            >
            <p>{{ dateFormatter(media.media.release_date) }}</p>
            <p class="overview">{{ media.media.overview }}</p>
            <div class="media-actions">
              <!-- <a v-if="listType === 'favorites'" href="#">
              <span><i class="fas fa-bookmark"></i>Watchlist</span>
            </a>
            <a v-if="listType === 'watchlist'" href="#">
              <span><i class="fas fa-heart"></i>Favorite</span>
            </a> -->
              <a
                @click="deleteMedia"
                href="#"
                id="deleteButton"
                :data-id="media.media.id"
                ><i class="fas fa-times"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </transition-group>
  </div>
</template>

<script>
import {
  dateJSONConverter,
  titleJSONConverter,
} from "../../_helpers/JSONConverter.js";
import { mediaListBus } from "../../main";
import axios from "axios";
export default {
  props: ["medialist", "orderAsc", "listType"],
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
    deleteMedia(e) {
      e.preventDefault();

      const id = e.currentTarget.getAttribute("data-id");
      if (id === null) {
        return;
      }
      console.log("Listtype", this.listType);
      axios
        .delete(`/media/${this.listType}/1/${id}`)
        .then((res) => {
          console.log(res);
          mediaListBus.$emit("deleteMedia", {
            listType: this.listType,
            id: id,
          });
        })
        .catch((e) => {
          console.log(e);
        });
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
  overflow: visible;
  margin-top: 22px;
  width: 100%;
  position: relative;
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
  display: flex;
  flex-direction: column;
  width: 100%;
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
  /* margin-top: 10px; */
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
  position: relative;
}

a:hover {
  color: black;
  text-decoration: none;
}

.media-actions {
  /* flex-grow: 1; */
  display: flex;

  /* justify-items: center;
  justify-self: center; */
  /* justify-self: flex-end;
  justify-content: flex-end; */
}

.media-actions * {
  color: gray;
  /* align-items: center;
  justify-content: center; */
  /* justify-content: flex-end; */
}

.media-actions a {
  margin-right: 15px;
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
  background: red;
  color: white;
  transform: scale(1.1);
  cursor: pointer;
}

#deleteButton {
  z-index: 2;
  position: absolute;
  top: -18px;
  right: -45px;
}

.flip-list-move {
  transition: transform 1s;
}
</style>
