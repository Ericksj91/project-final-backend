const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const BadRequestError = require("../errors/bad-request-err");
const NotFoundError = require("../errors/not-found-err");
const ConflictError = require("../errors/conflict-err");
const UnauthorizedError = require("../errors/unauthorized-err");

module.exports.createUser = (req, res, next) => {
  const { name, email, password } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) =>
      User.create({
        name,
        email,
        password: hash,
      }),
    )
    .then((user) =>
      res.status(201).json({
        data: {
          _id: user._id,
          name: user.name,
          email: user.email,
        },
      }),
    )
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(new BadRequestError("Datos de usuario inválidos"));
      } else if (err.code === 11000) {
        next(new ConflictError("El correo ya está en uso"));
      } else {
        next(err);
      }
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        process.env.JWT_SECRET || "clave-secreta-desarrollo",
        {
          expiresIn: "7d",
        },
      );
      res.send({ token });
    })
    .catch((err) => {
      next(new UnauthorizedError(err.message));
    });
};

module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => {
      throw new NotFoundError("Usuario no encontrado");
    })
    .then((user) => {
      res.json({ data: user });
    })
    .catch(next);
};
