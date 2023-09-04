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
    const newCart = await cartProduct.find();
    const ownIds = cart.orderItems.map((item) => item.own_id);

    const filteredImages = ownIds.map((item) =>
      allProducts.find((product) =>
        product.images.find((exact) => exact._id.toString() === item)
      )
    );
    const filteredCart = ownIds.map((item) =>
      newCart.find((product) =>
        product.orderItems.find((exact) => exact.own_id === item)
      )
    );
    for (const [index, item] of filteredCart.entries()) {
      const cartIndex = item.orderItems.findIndex(
        (product) => product.own_id === ownIds[index]
      );
      item.orderItems[cartIndex].quantity =
        item.orderItems[cartIndex].quantity - item.orderItems[cartIndex].amount;
      item.orderItems[cartIndex].amount = 1;

      await cartProduct.findOneAndUpdate(
        { own_id: item.own_id },
        { orderItems: item.orderItems }
      );
    }

    let isValid = true;
    for (const [index, item] of filteredImages.entries()) {
      const imageIndex = item.images.findIndex(
        (product) => product._id.toString() === ownIds[index]
      );

      const example = item.images[imageIndex].size;

      example[cart.orderItems[index].size] =
        example[cart.orderItems[index].size] - cart.orderItems[index].amount;

      if (example[cart.orderItems[index].size] < 0) {
        isValid = false;
        break;
      }

      item.images[imageIndex].size = example;

      await productsData.findOneAndUpdate(
        { _id: item._id },
        { images: item.images }
      );
    }

    if (isValid) {
      await order.save();
      res
        .status(200)
        .json({ message: "Item added to cart successfully", order });
    } else {
      res.status(400).json({
        message: "Invalid order, not enough amount, please update order",
      });
    }
  } catch (error) {
    console.log(error);
  }
};
