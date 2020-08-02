import axios from 'axios';

export const mediaService = {
    trendingMovies,
    addToWatchlist,
    addToFavorites
};

function trendingMovies() {
    console.log("Trending movies");
    axios
    .get("/media/trending")
    .then(res => {
      console.log(res);
      return res.data;
    })
    .catch(error => console.log(error));
}

function addToWatchlist(userId, media) {
  console.log("Userid2", userId);
  console.log("Media2", media);
  console.log("Add to watchlist");
  const watchlist = {
    userId,
    media
  };
  console.log("Watchlist", watchlist);
  axios
    .post("/media/watchlist", watchlist)
    .then(res => {
      console.log(res);
    })
    .catch(error => console.log(error));
}

function addToFavorites(userId, media) {
  console.log("Userid2", userId);
  console.log("Media2", media);
  console.log("Add to favorites");
  const favorite = {
    userId,
    media
  };
  console.log("Favorite", favorite);
  axios
    .post("/media/favorites", favorite)
    .then(res => {
      console.log(res);
    })
    .catch(error => console.log(error));
}