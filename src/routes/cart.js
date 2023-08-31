import express from "express";
const cartRouter = express.Router();
import {
  addCart,
  getCart,
  updateCart,
  deleteProduct,
} from "../controllers/cartController.js";
import authMiddleware from "../middlewares/auth-middleware.js";

cartRouter.post("/addCart", authMiddleware, addCart);
cartRouter.get("/getCart", authMiddleware, getCart);
cartRouter.put("/updateCart/:purchase_id", authMiddleware, updateCart);
cartRouter.delete("/deleteProduct/:purchase_id", authMiddleware, deleteProduct);

export default cartRouter;
