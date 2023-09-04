import { orderList } from "../models/order.js";
import { productsData } from "../models/products.js";
import { cartProduct } from "../models/cart.js";

export const makeOrder = async (req, res) => {
  const { user, items, shippingDetails } = req.body;

  try {
    const order = new orderList({
      user,
      orderItems: items.map((item) => ({
        ...item,
      })),
      shippingDetails: shippingDetails,
    });
    const cart = await cartProduct.findOne({ user });
    const allProducts = await productsData.find();
    const ownIds = cart.orderItems.map((item) => item.own_id);

    const filteredImages = ownIds.map((item) =>
      allProducts.find((product) =>
        product.images.find((exact) => exact._id.toString() === item)
      )
    );
    for (const [index, item] of filteredImages.entries()) {
      const imageIndex = item.images.findIndex(
        (product) => product._id.toString() === ownIds[index]
      );

      const example = item.images[imageIndex].size;

      example[cart.orderItems[index].size] =
        example[cart.orderItems[index].size] - cart.orderItems[index].amount;

      item.images[imageIndex].size = example;

      const ragaca = await productsData.findOneAndUpdate(
        { _id: item._id },
        { images: item.images }
      );
    }

    await order.save();

    res.status(200).json({ message: "Item added to cart successfully", order });
  } catch (error) {
    res.status(500).json({ message: "Post failed", error });
  }
};
