import express from "express";
import connect from "./database/mongo.js";
import bodyParser from "body-parser";
import cors from "cors";
import swaggerMiddleware from "./middlewares/swagger-middleware.js";
import productsInfo from "./controllers/productsController.js";

const app = express();
connect();

app.use(cors());
app.use(bodyParser.json());
app.use("/image", express.static("public/storage/images"));
app.get("/all", productsInfo);

app.use("/", swaggerMiddleware());

app.listen(process.env.PORT || 3000);
