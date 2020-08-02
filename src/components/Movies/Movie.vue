<template>
  <div class="card">
    <a href="www.aftonbladet.se" class="image-content">
      <div class="inner"></div>
    </a>
    <div class="MovieInfo text-left">
      <h3>Title</h3>
      <p class="overview">Overview</p>
    </div>
  </div>
</template>

<style scoped>
.MovieInfo {
  margin-top: 5px;
  margin-left: 10px;
  padding: 10px;
}

.MovieInfo p {
  word-wrap: break-word;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
}

.MovieInfo h3 {
  margin-bottom: 0px;
}

.release_date {
  margin-top: 0px;
  color: #a0a0a0;
}

.overview {
  margin-top: 20px;
}

.card {
  display: flex;
  height: 250px;
  border: 1px solid #e3e3e3;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  text-overflow: ellipsis;
  overflow: hidden;
  margin-top: 16px;
}

.image_content {
  height: 100%;
  max-width: 165px;
}

.inner {
  height: 100%;
  max-width: 165px;
  overflow: hidden;
}

img {
  height: 100%;
  max-width: 165px;
  transition: all 1s ease;
}

.card:hover img {
  transform: scale(1.1);
}

.clickable_link {
  text-decoration: none;
  color: black;
}

.clickable_link:hover {
  text-decoration: none;
  color: black;
}
</style>
