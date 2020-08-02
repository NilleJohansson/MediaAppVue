<template>
  <slick ref="slick" :options="slickOptions">
    <a href="http://placehold.it/2000x1000"
      ><img src="http://placehold.it/300x150" alt=""
    /></a>
    <a href="http://placehold.it/2000x1000"
      ><img src="http://placehold.it/300x150" alt=""
    /></a>
    <a href="http://placehold.it/2000x1000"
      ><img src="http://placehold.it/300x150" alt=""
    /></a>
    <a href="http://placehold.it/2000x1000"
      ><img src="http://placehold.it/300x150" alt=""
    /></a>
    <a href="http://placehold.it/2000x1000"
      ><img src="http://placehold.it/300x150" alt=""
    /></a>
  </slick>
</template>
<!--SCRIPTS-->
<script>
// import Slick from "vue-slick";
export default {
  name: "SlickSlider",

  data() {
    return {
      slickOptions: {
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: true,
        autoplay: true,
        infinite: true,
        speed: 2000,
        autoplaySpeed: 3000,
        responsive: [
          {
            breakpoint: 1120,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1
            }
          },
          {
            breakpoint: 800,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
      }
    };
  },

  mounted() {
    console.log(this.$options.name + " component successfully mounted");
  },

  methods: {}
};
</script>
<!--STYLES-->
<style scoped>
.slick_container {
  width: 100%;
  height: 275px;
  position: relative;
  overflow: hidden;
}
.slick_item {
  height: 100%;
  width: 450px;
  background-size: cover;
}

.slick-prev:before, .slick-next:before { 
    color:red !important;
}
</style>
