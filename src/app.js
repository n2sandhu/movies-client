import {uniqBy, union, find} from 'lodash';
export default {
  name: 'app',
  data () {
    return {
      isFetching: {
        cinemaworld: true,
        filmworld: true
      },
      movies: {
        cinemaworld: null,
        filmworld: null
      },
      isFetchingMovie: {
        cinemaworld: true,
        filmworld: true
      },
      movieDetail: {
        cinemaworld: null,
        filmworld: null
      },
      error: {
        cinemaworld: null,
        filmworld: null,
        cinemaAndFilm: null,
        movieDetail: {
          cinemaworld: null,
          filmworld: null
        }
      },
      allMovies: null,
      movieDetailsView: false
    }
  },
  created() {
    this.fetchMovies();
  },
  watch: {
    'movies.filmworld': function() {
      if (this.movies.filmworld && this.movies.cinemaworld) {
        this.allMovies = uniqBy(union(this.movies.filmworld, this.movies.cinemaworld), 'Title');
      }
    },
    'movies.cinemaworld': function() {
      if (this.movies.filmworld && this.movies.cinemaworld) {
        this.allMovies = uniqBy(union(this.movies.filmworld, this.movies.cinemaworld), 'Title');
      }
    }
  },
  methods: {
    fetchMovies() {
      this.resetData();
      this.$http.get('http://movies-api.us-east-2.elasticbeanstalk.com/api/movies/cinemaworld')
        .then(response => {
          this.movies.cinemaworld = response.body.Movies;
          this.isFetching.cinemaworld = false;
        }, error => {
          this.movies.cinemaworld = [];
          this.error.cinemaworld = error.statusText;
          this.isFetching.cinemaworld = false;
        });

      this.$http.get('http://movies-api.us-east-2.elasticbeanstalk.com/api/movies/filmworld')
        .then(response => {
          this.movies.filmworld = response.body.Movies;
          this.isFetching.filmworld = false;
        }, error => {
          this.movies.filmworld = [];
          this.error.filmworld = error.statusText;
          this.isFetching.filmworld = false;
        });
    },
    fetchMovieDetails(movie) {
      this.movieDetailsView = true;
      const fwMovieRecord = find(this.movies.filmworld, ['Title', movie.Title]);
      const cwMovieRecord = find(this.movies.cinemaworld, ['Title', movie.Title]);
      if (fwMovieRecord) {
        this.$http.get(`http://movies-api.us-east-2.elasticbeanstalk.com/api/movies/filmworld/${fwMovieRecord.ID}`)
          .then(response => {
            this.movieDetail.filmworld = response.body;
            this.isFetchingMovie.filmworld = false;
          }, error => {
            this.movieDetail.filmworld = {};
            this.error.movieDetail.filmworld = error.statusText;
            this.isFetchingMovie.filmworld = false;
          });
      } else {
        this.isFetchingMovie.filmworld = false;
        this.error.movieDetail.filmworld = 'not fetched';
        this.movieDetail.filmworld = {};
      }

      if (cwMovieRecord) {
        this.$http.get(`http://movies-api.us-east-2.elasticbeanstalk.com/api/movies/cinemaworld/${cwMovieRecord.ID}`)
          .then(response => {
            this.movieDetail.cinemaworld = response.body;
            this.isFetchingMovie.cinemaworld = false;
          }, error => {
            this.movieDetail.cinemaworld = {};
            this.error.movieDetail.cinemaworld = error.statusText;
            this.isFetchingMovie.cinemaworld = false;
          });
      } else {
        this.isFetchingMovie.cinemaworld = false;
        this.error.movieDetail.cinemaworld = 'not fetched';
        this.movieDetail.cinemaworld = {};
      }
    },
    resetData() {
      this.isFetching = {
        cinemaworld: true,
        filmworld: true
      };
      this.movies = {
        cinemaworld: null,
        filmworld: null
      };
      this.isFetchingMovie = {
        cinemaworld: true,
        filmworld: true
      };
      this.movieDetail = {
        cinemaworld: null,
        filmworld: null
      };
      this.error = {
        cinemaworld: null,
        filmworld: null,
        cinemaAndFilm: null,
        movieDetail: {
          cinemaworld: null,
          filmworld: null
        }
      };
      this.allMovies = null;
      this.movieDetailsView = false;
    }
  }
}
