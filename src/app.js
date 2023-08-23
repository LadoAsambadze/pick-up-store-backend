import express from "express";
import connect from "./database/mongo.js";
import bodyParser from "body-parser";
import cors from "cors";
import swaggerMiddleware from "./middlewares/swagger-middleware.js";
import productsInfo from "./controllers/productsController.js";
import { Login, Singup, profile } from "./controllers/userController.js";
import dotenv from "dotenv";
import {
  addCart,
  deleteProduct,
  getCart,
  updateCart,
} from "./controllers/cartController.js";

const app = express();
dotenv.config();
connect();

app.use(cors());
app.use(bodyParser.json());
app.use("/image", express.static("public/storage/images"));
app.get("/all", productsInfo);
app.post("/login", Login);
app.post("/singup", Singup);
app.get("/profile", profile);
app.post("/addCart", addCart);
app.get("/getCart", getCart);
app.put("/updateCart/:purchase_id", updateCart);
app.delete("/deleteProduct/:purchase_id", deleteProduct);

app.use("/", swaggerMiddleware());

app.listen(process.env.PORT || 3000);
