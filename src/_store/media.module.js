import { mediaService } from '../_services';

const state = {
    trendingMovies: []
};

const actions = {
    getTrendingMovies({ commit }) {

        mediaService.getTrendingMovies()
        .then(
            trendingMovies => commit('getTrendingMovies', trendingMovies)
        );
    },
    addToWatchlist({ commit }, watchlist) {
        console.log("Userid", watchlist.userid);
        console.log("Media", watchlist.media);
        mediaService.addToWatchlist(watchlist.userid, watchlist.media);
        commit("test");
    },
    addToFavorites({ commit }, favorite) {
        console.log("Userid", favorite.userid);
        console.log("Media", favorite.media);
        mediaService.addToFavorites(favorite.userid, favorite.media);
        commit("test");
    }
};

const mutations = {
    getTrendingMovies(state, trendingMovies) {
        state.trendingMovies = trendingMovies;
    },
    test() {

    }
};

export const media = {
    namespaced: true,
    state,
    actions,
    mutations
};