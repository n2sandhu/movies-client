<template>
  <div id="app">
    <h1>Welcome to Movies App</h1>
    <div class="error" v-if="error.cinemaworld && error.filmworld">Error fetching movies</div>
    <div v-if="!movieDetailsView">
      <h2 v-if="isFetching.cinemaworld || isFetching.filmworld">Loading Movies...</h2>
      <div v-if="allMovies && !isFetching.cinemaWorld && !isFetching.filmWorld">
        <h2 >Click on a movie to see details</h2>
        <ul>
          <li v-for="movie in allMovies">
            <a @click="fetchMovieDetails(movie)">{{movie.Title}}</a>
          </li>
        </ul>
      </div>
    </div>
    <div v-else>
      <a @click="fetchMovies()">Back</a>
      <h2 v-if="isFetchingMovie.cinemaworld || isFetchingMovie.filmworld">Loading Movie Details...</h2>
      <div v-if="movieDetail.cinemaworld && movieDetail.filmworld && !isFetchingMovie.cinemaworld && !isFetchingMovie.filmworld">
        <div class="error" v-if="error.movieDetail.cinemaworld && error.movieDetail.filmworld">Error fetching movie details</div>
        <h2>{{movieDetail.cinemaworld.Title || movieDetail.filmworld.Title}}</h2>
        <ul>
          <li v-if="movieDetail.cinemaworld.Price">Available on Cinema World for <strong>${{movieDetail.cinemaworld.Price}}</strong> </li>
          <li v-if="movieDetail.filmworld.Price">Available on Film World for <strong>${{movieDetail.filmworld.Price}}</strong> </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script src="./app.js"></script>

<style lang="scss" src="./app.scss"></style>
