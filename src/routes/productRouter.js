import express from "express";
const productRouter = express.Router();
import productsInfo from "../controllers/productsController.js";

productRouter.get("/users", productsInfo);

export default productRouter;
