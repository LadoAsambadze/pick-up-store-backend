import { orderList } from "../models/order.js";
import { sentOrderList } from "../models/sentOrders.js";

export const getOrders = async (req, res) => {
  const orders = await orderList.find();
  try {
    res.status(200).json({ menssage: "Succesfuly fetched", orders });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const sentOrders = async (req, res) => {
  const { user, orderItems } = req.body;

  const existingUser = await sentOrderList.findOne({ user });

  if (!existingUser) {
    const sentProduct = new sentOrderList({
      user: user,
      orderItems: orderItems,
    });

    await sentProduct.save();
  } else {
    await sentOrderList.updateOne(
      { user },
      { $push: { orderItems: { $each: orderItems } } }
    );
  }
};
