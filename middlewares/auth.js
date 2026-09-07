const jwt = require("jsonwebtoken");
const UnauthorizedError = require("../errors/unauthorized-err");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return next(new UnauthorizedError("Se requiere autorización"));
  }

  const token = authorization.replace("Bearer ", "");
  let payload;

  try {
    payload = jwt.verify(
      token,
      process.env.JWT_SECRET || "clave-secreta-desarrollo",
    );
  } catch (err) {
    return next(new UnauthorizedError("Se requiere autorización"));
  }

  req.user = payload;

  next();
};
