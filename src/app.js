import express from "express";
import connect from "./database/mongo.js";
import bodyParser from "body-parser";
import cors from "cors";
import swaggerMiddleware from "./middlewares/swagger-middleware.js";
import clothesInfo from "./controllers/clothesController.js";
import shoesInfo from "./controllers/shoesController.js";

const app = express();
connect();

app.use(cors());
app.use(bodyParser.json());
app.use("/image", express.static("public/storage/images"));
app.get("/clothes", clothesInfo);
app.get("/shoes", shoesInfo);
app.use("/", swaggerMiddleware());

app.listen(3000);
