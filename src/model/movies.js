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

  static adaptCommentToClient(comment) {
    const adaptedComment = Object.assign(
        {},
        comment,
        {
          text: comment.comment,
          emoji: comment.emotion
        }
    );

    delete comment.comment;
    delete comment.emotion;

    return adaptedComment;
  }

  static adaptToServer(movie) {
    const adaptedMovies = Object.assign(
        {},
        {
          "id": movie.id,
          "comments": movie.comments,
          "film_info": {
            "title": movie.title,
            "poster": movie.poster,
            "age_rating": movie.age,
            "runtime": movie.duration,
            "total_rating": movie.rating,
            "director": movie.director,
            "writers": movie.writers,
            "actors": movie.actors,
            "description": movie.description,
            "alternative_title": movie.alternativeTitle,
            "genre": movie.genres,
            "release": {
              "date": movie.year,
              "release_country": movie.country,
            },
          },
          "user_details": {
            "already_watched": movie.isWatched,
            "watchlist": movie.isWatchlist,
            "favorite": movie.isFavorite,
            "watching_date": movie.watchingDate
          }
        }
    );

    return adaptedMovies;
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
          isFavorite: movie.user_details.favorite,
          alternativeTitle: movie.film_info.alternative_title,
          watchingDate: movie.user_details.watching_date
        }
    );

    delete adaptedMovies.film_info;
    delete adaptedMovies.user_details;

    return adaptedMovies;
  }
}
