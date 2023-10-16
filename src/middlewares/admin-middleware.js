import jwt from "jsonwebtoken";
import userModel from "../models/user.js";

const AdminMiddleware = (req, res, next) => {
  const { authorization } = req.headers;
  if (authorization) {
    const token = authorization.trim().split(" ")[1];
    jwt.verify(token, process.env.SECRET, {}, async (error, userData) => {
      if (error) {
        res.status(403).json("Unauthorized - Please log in");
      } else {
        const user = await userModel.findById(userData.email);
        if (user && user.isAdmin) {
          next();
        } else {
          res.status(403).json("Only admins can access this route");
        }
      }
    });
  } else {
    res.status(403).json("Verification error");
  }
};

export default AdminMiddleware;
