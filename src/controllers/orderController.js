import { orderList } from "../models/order.js";
import { productsData } from "../models/products.js";

export const makeOrder = async (req, res) => {
  const { user, items, shippingDetails } = req.body;

  const search = await productsData.find();
  const images = search.map((item) => item.images);
  if (images) {
    const ownIds = items.map((item) => item.own_id);
    const filteredImages = images
      .flat()
      .filter((image) => ownIds.includes(image._id.toString()));

    console.log(filteredImages);
  }
  const amounts = items.map((item) => item.amount);
  let sum = amounts.reduce((a, b) => a + b, 0);
  console.log(sum);

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
