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
    const purchaseIds = cart.orderItems.map((item) => item.purchase_id);

    const filteredImages = ownIds.map((item) =>
      allProducts.find((product) =>
        product.images.find((exact) => exact._id.toString() === item)
      )
    );
    const filteredCart = purchaseIds.map((item) =>
      newCart.find((product) =>
        product.orderItems.find((exact) => exact.purchase_id === item)
      )
    );

    for (const [index, item] of filteredCart.entries()) {
      const cartIndex = item.orderItems.findIndex(
        (product) => product.purchase_id === purchaseIds[index]
      );

      item.orderItems[cartIndex].quantity =
        item.orderItems[cartIndex].quantity - item.orderItems[cartIndex].amount;
      item.orderItems[cartIndex].amount = 1;
      console.log(
        item.orderItems[cartIndex].quantity,
        item.orderItems[cartIndex].amount
      );
      console.log(item.orderItems);
      await cartProduct.updateMany({ orderItems: item.orderItems });
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
