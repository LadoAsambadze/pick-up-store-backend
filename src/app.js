import express, { Router } from "express";
import connect from "./database/mongo.js";
import bodyParser from "body-parser";
import cors from "cors";
import swaggerMiddleware from "./middlewares/swagger-middleware.js";

import dotenv from "dotenv";

import productRouter from "./routes/productRouter.js";
import userRouter from "./routes/userRouter.js";
import cartRouter from "./routes/cart.js";
import {
  getOrders,
  getSentOrders,
  removeSentOrders,
  sentOrders,
  uploadProduct,
} from "./controllers/adminController.js";
import orderRouter from "./routes/orderRouter.js";

const app = express();
dotenv.config();
connect();

app.use(cors());
app.use(bodyParser.json());
app.use("/image", express.static("public/storage/images"));
app.use("/api", productRouter);
app.use("/user", userRouter);
app.use("/order", cartRouter);
app.use("/orderprocess", orderRouter);
app.get("/getorders", getOrders);
app.post("/sentorders", sentOrders);
app.get("/getsentorders", getSentOrders);
app.delete("/removesentorders", removeSentOrders);
app.post("/uploadproduct", uploadProduct);
app.use("/", swaggerMiddleware());

app.listen(process.env.PORT || 3000);
