const Movie = require("../models/movie");
const BadRequestError = require("../errors/bad-request-err");
const NotFoundError = require("../errors/not-found-err");
const ForbiddenError = require("../errors/forbidden-err");

module.exports.getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => {
      res.json({ data: movies });
    })
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const { movieId, title, description, date, source, image, link } = req.body;
  Movie.create({
    movieId,
    title,
    description,
    date,
    source,
    image,
    link,
    owner: req.user._id,
  })
    .then((movie) => res.status(201).json({ data: movie }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(new BadRequestError("Datos de película inválidos"));
      } else {
        next(err);
      }
    });
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .orFail(() => {
      throw new NotFoundError("Pelicula no encontrada");
    })
    .then((movie) => {
      if (!movie.owner.equals(req.user._id)) {
        return next(new ForbiddenError("Se requiere autorización"));
      }
      return movie.deleteOne().then(() => {
        res.json({ message: "Película eliminada correctamente" });
      });
    })
    .catch((err) => {
      if (err.name === "CastError") {
        next(new BadRequestError("ID de película inválido"));
      } else {
        next(err);
      }
    });
};
