import express from "express";
import connect from "./database/mongo.js";
import bodyParser from "body-parser";
import cors from "cors";
import swaggerMiddleware from "./middlewares/swagger-middleware.js";
import getShoesInfo from "./controllers/shoes-controller.js";

const app = express();
connect();

app.use(cors());
app.use(bodyParser.json());
app.get("/main", getShoesInfo);
app.use("/", swaggerMiddleware());

app.listen(3000);
