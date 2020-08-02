<template>
  <div>
    <h3 class="text-left mt-3 media-title">{{ slideTitle }}</h3>
    <slick ref="slick" :options="slickOptions">
      <div v-for="media in trendingMedia" v-bind:key="media.id">
        <router-link
          :to="{ path: '/detail/' + media.id + '/' + type }"
          tag="div"
          class="media-card"
        >
          <i class="fas fa-info-circle fa-2x info-icon" :id="slideTitle + media.id"> </i>
          <b-tooltip :target="slideTitle + media.id" triggers="hover" placement="left">
            <h5 class="tooltip-text">{{ titleJSONConverter(media, type) }}</h5>
            <p class="tooltip-text">{{ media.overview }}</p>
          </b-tooltip>
          <img
            class="movie-poster"
            :src="media.poster"
            :alt="media.title"
          />
        </router-link>
      </div>
    </slick>
  </div>
</template>

<script>
import Slick from "vue-slick";
import "../../../node_modules/slick-carousel/slick/slick.css";
import "../../../node_modules/slick-carousel/slick/slick-theme.css";
import { titleJSONConverter } from "../../_helpers/JSONConverter.js";

export default {
  components: {
    Slick
  },
  props: ["trendingMedia", "slideTitle", "carouselId", "type"],
  computed: {
    movieChunks() {
      var splitMedia = [];
      var trendingMedia = this.trendingMedia;

      while (trendingMedia.length) {
        splitMedia.push(trendingMedia.splice(0, 5));
      }
      console.log(splitMedia);

      return splitMedia;
    },
  },
  watch: {
    trendingMedia: function() {
      this.reInit();
    }
  },
  data() {
    return {
      slickOptions: {
        slidesToShow: 5,
        infinite: true,
        arrows: true,
        slidesToScroll: 5
      }
    };
  },
  methods: {
    beforeUpdate() {
      if (this.$refs.slick) {
        this.$refs.slick.destroy();
      }
    },
    updated() {
      this.$nextTick(function() {
        if (this.$refs.slick) {
          this.$refs.slick.create(this.slickOptions);
        }
      });
    },
    next() {
      this.$refs.slick.next();
    },

    prev() {
      this.$refs.slick.prev();
    },

    reInit() {
      let currIndex = this.$refs.slick.currentSlide();
      this.$refs.slick.destroy();
      this.$nextTick(() => {
        this.$refs.slick.create();
        this.$refs.slick.goTo(currIndex, true);
      });
    },
    generateTooltip(media) {
      return "<h1>" + media.title + "</h1>";
    },
    titleJSONConverter
  }
};
</script>

<style>
h1 {
  font-weight: 700;
}

.carousel-inner {
}

.media-title {
  margin-left: 55px;
}

.media-cards {
}

.media-card {
  position: relative;
  cursor: pointer;
}

.media-card:hover {
  -webkit-filter: grayscale(70%);
  -moz-filter: grayscale(70%);
  filter: grayscale(70%);
  transition: all 0.5s ease;
}

.media-card:hover .info-icon {
  opacity: 1;
  transition: 0.8s;
  top: 8px;
}

.fa-info-circle {
  background: gray;
  border-radius: 50%;
}

.info-icon {
  position: absolute;
  top: -35px;
  right: 8px;
  color: white;
  opacity: 0.5;
  transition: 0.8s;
}

.info-icon:hover {
  color: #ddd;
}

.slick-next:before,
.slick-prev:before {
  color: black !important;
  font-size: 30px !important;
}

.slick-prev:before {
  margin: 0 -5px;
}

.slick-next,
.slick-prev {
  font-size: 50px;
}

.slick-slider {
  margin: 10px 50px;
}

.slick-slide {
  margin: 0px 10px;
  overflow: hidden;
}

.tooltip-text {
  text-align: left;
}

.movie-poster {
  width: 100%;
}

</style>
