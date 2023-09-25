import express from "express";
import { uploadProduct } from "../controllers/adminController.js";
import multer from "multer";
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
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

imageRouter.post(
  "/uploadproduct",
  multer({ storage: fileStorage, fileFilter }).single("image"),
  uploadProduct
);

export default imageRouter;
