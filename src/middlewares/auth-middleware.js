import jwt from "jsonwebtoken";
const authMiddleware = (req, res, next) => {
  const { authorization } = req.headers;

  if (authorization) {
    const token = authorization.trim().split(" ")[1];
    jwt.verify(token, process.env.SECRET, {}, (error, useData) => {
      if (error) {
        next(error);
      } else {
        next();
      }
    });
  } else {
    res.status(403).json("Not verified!");
  }
};

export default authMiddleware;
