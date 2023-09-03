import { orderList } from "../models/order.js";
import { productsData } from "../models/products.js";

export const makeOrder = async (req, res) => {
  const { user, items, shippingDetails } = req.body;
  console.log(items);

  try {
    const order = new orderList({
      user,
      orderItems: items.map((item) => ({
        ...item,
      })),
      shippingDetails: shippingDetails,
    });

    await order.save();
    res.status(200).json({ message: "Item added to cart successfully", order });
  } catch (error) {
    res.status(500).json({ message: "Post failed", error });
  }
};
