import { orderList } from "../models/order.js";

export const makeOrder = async (req, res) => {
  const { user, items } = req.body;

  try {
    const order = new orderList({
      user,
      orderItems: items.map((item) => ({
        ...item,
      })),
    });
    await order.save();
    res.status(200).json({ message: "Item added to cart successfully", order });
  } catch (error) {
    res.status(500).json({ message: "Post failed", error });
  }
};
