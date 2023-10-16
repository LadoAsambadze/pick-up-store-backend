import express from "express";
const adminRouter = express.Router();
import {
  getOrders,
  sentOrders,
  getSentOrders,
  removeSentOrders,
} from "../controllers/adminController.js";

import AdminMiddleware from "../middlewares/admin-middleware.js";

adminRouter.get("/getorders", AdminMiddleware, getOrders);
adminRouter.post("/sentorders", AdminMiddleware, sentOrders);
adminRouter.get("/getsentorders", AdminMiddleware, getSentOrders);
adminRouter.delete("/removesentorders", AdminMiddleware, removeSentOrders);

export default adminRouter;
