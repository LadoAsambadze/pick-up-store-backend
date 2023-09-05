import { orderList } from "../models/order.js";

export const getOrders = async (req, res) => {
  const orders = await orderList.find();
  try {
    res.status(200).json({ menssage: "Succesfuly fetched", orders });
  } catch (error) {
    res.status(500).json(error);
  }
};
