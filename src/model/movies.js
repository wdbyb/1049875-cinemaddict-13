import Observer from "../utils/observer.js";

export default class Movies extends Observer {
  constructor() {
    super();
    this._movies = [];
  }

  setMovies(updateType, movies) {
    this._movies = movies.slice();

    this._notify(updateType);
  }

  getMovies() {
    return this._movies;
  }

  updateMovie(updateType, update) {
    const index = this._movies.findIndex((movie) => movie.id === update.id);

    if (index === -1) {
      throw new Error(`Boo!`);
    }

    this._movies = [
      ...this._movies.slice(0, index),
      update,
      ...this._movies.slice(index + 1)
    ];

    this._notify(updateType, update);
  }

  static adaptToClient(movie) {
    const adaptedMovies = Object.assign(
        {},
        movie,
        {
          isAll: true,
          title: movie.film_info.title,
          poster: movie.film_info.poster,
          age: movie.film_info.age_rating,
          duration: movie.film_info.runtime,
          rating: movie.film_info.total_rating,
          year: movie.film_info.release.date,
          country: movie.film_info.release.release_country,
          description: movie.film_info.description,
          director: movie.film_info.director,
          writers: movie.film_info.writers,
          actors: movie.film_info.actors,
          genres: movie.film_info.genre,
          isWatched: movie.user_details.already_watched,
          isWatchlist: movie.user_details.watchlist,
          isFavorite: movie.user_details.favorite
        }
    );

    delete adaptedMovies.film_info.title;
    delete adaptedMovies.film_info.poster;
    delete adaptedMovies.film_info.age_rating;
    delete adaptedMovies.film_info.runtime;
    delete adaptedMovies.film_info.total_rating;
    delete adaptedMovies.film_info.release.date;
    delete adaptedMovies.film_info.release.release_country;
    delete adaptedMovies.film_info.description;
    delete adaptedMovies.film_info.director;
    delete adaptedMovies.film_info.writers;
    delete adaptedMovies.film_info.actors;
    delete adaptedMovies.film_info.genre;
    delete adaptedMovies.user_details.already_watched;
    delete adaptedMovies.user_details.watchlist;
    delete adaptedMovies.user_details.favorite;

    return adaptedMovies;
  }
}
