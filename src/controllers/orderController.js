import { orderList } from "../models/order.js";
import { productsData } from "../models/products.js";
import { cartProduct } from "../models/cart.js";

export const makeOrder = async (req, res) => {
  const { user, items, shippingDetails } = req.body;
  try {
    const cart = await cartProduct.findOne({ user });
    const allProducts = await productsData.find();
    const allCart = await cartProduct.find();
    const ownIds = cart.orderItems.map((item) => item.own_id);
    const purchaseIds = cart.orderItems.map((item) => item.purchase_id);

    const filteredList = ownIds.map((item) =>
      allProducts.find((product) =>
        product.itemList.find((exact) => exact._id.toString() === item)
      )
    );

    let isValid = true; // Declare isValid variable

    for (const [index, item] of filteredList.entries()) {
      const listIndex = item.itemList.findIndex(
        (product) => product._id.toString() === ownIds[index]
      );

      const example = item.itemList[listIndex].size;
      example[cart.orderItems[index].size] =
        example[cart.orderItems[index].size] - cart.orderItems[index].amount;

      if (example[cart.orderItems[index].size] < 0) {
        isValid = false;
        break;
      }

      await productsData.findOneAndUpdate(
        { _id: item._id },
        { itemList: item.itemList }
      );
    }

    if (isValid) {
      const order = new orderList({
        user,
        items,
        shippingDetails,
      });

      await order.save();

      res
        .status(200)
        .json({ message: "Item added to cart successfully", order });
    } else {
      res.status(400).json({
        message: "Invalid order, not enough quantity, please update order",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
