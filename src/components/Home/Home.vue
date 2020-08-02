<template>
  <div class="home-media">
    <app-slide
      :trendingMedia="trendingMovies"
      :slideTitle="'Trending Movies'"
      :carouselId="'movieCarousel'"
      :type="'movie'"
    />
    <app-slide
      :trendingMedia="trendingTvShows"
      :slideTitle="'Trending TV Shows'"
      :carouselId="'tvCarousel'"
      :type="'tv'"
    />
    <app-slide :trendingMedia="upcomingMovies" :slideTitle="'Upcoming Movies'"
    :carouselId="'tvCarousel'" :type="'movie'" />
    <app-slide class="margin-bottom" :trendingMedia="tvShowsOnAir" :slideTitle="'TV Shows On Air'"
    :carouselId="'tvCarousel'" :type="'tv'" />
  </div>
</template>

<script>
import Slide from "./Slide";
import axios from "axios";
export default {
  data() {
    return {
      trendingMovies: [],
      trendingTvShows: [],
      upcomingMovies: [],
      tvShowsOnAir: []
    };
  },
  components: {
    appSlide: Slide
  },
  mounted() {
    axios
      .get("/media/home")
      .then(res => {
        console.log(res.data);
        this.trendingMovies = res.data.trendingMedia.movies;
        this.trendingTvShows = res.data.trendingMedia.tvShows;
        this.upcomingMovies = res.data.upcomingMedia.movies;
        this.tvShowsOnAir = res.data.tvShowsOnAir.tvShows;
        console.log(this.trendingMovies);
      })
      .catch(error => console.log(error));
  }
};
</script>

<style scoped>
.margin-bottom {
  margin-bottom: 40px;
}
</style>
