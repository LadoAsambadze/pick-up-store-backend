import express from "express";
import { uploadProduct } from "../controllers/adminController.js";
import multer from "multer";
import AdminMiddleware from "../middlewares/admin-middleware.js";
const imageRouter = express.Router();

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/storage/images");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/webp") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

imageRouter.post(
  "/",
  AdminMiddleware,
  multer({ storage: fileStorage, fileFilter }).array("photo"),
  uploadProduct
);

export default imageRouter;
