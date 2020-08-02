<template>
  <section>
    <div class="results">
      <app-movie></app-movie>
    </div>
  </section>
</template>

<script>
import Movie from "./Movie.vue";
export default {
  components: {
    appMovie: Movie
  }
};
</script>

<style scoped>
section {
  width: 740px;
  box-sizing: border-box;
  margin: auto;
  margin-top: 20px;
}

.results {
  justify-content: start;
  box-sizing: border-box;
  display: flex;
}
</style>
