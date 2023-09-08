import express from "express";
const orderRouter = express.Router();
import { makeOrder } from "../controllers/orderController.js";
import authMiddleware from "../middlewares/auth-middleware.js";

orderRouter.post("/makeorder", authMiddleware, makeOrder);

export default orderRouter;
