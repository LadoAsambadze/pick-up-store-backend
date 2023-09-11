import { orderList } from "../models/order.js";
import { productsData } from "../models/products.js";
import { cartProduct } from "../models/cart.js";

export const makeOrder = async (req, res) => {
  const { user, items, shippingDetails } = req.body;
  try {
    const cart = await cartProduct.findOne({ user });
    const allProducts = await productsData.find();

    const ownIds = cart.orderItems.map((item) => item.own_id);

    const filteredList = ownIds.map((item) =>
      allProducts.find((product) =>
        product.itemList.find((exact) => exact.own_id === item)
      )
    );

    let isValid = true;
    let isEnough = true;
    let allNonZero = true;

    if (allNonZero) {
      for (const [index, item] of filteredList.entries()) {
        const listIndex = item.itemList.findIndex(
          (product) => product.own_id === ownIds[index]
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
    }

    if (isValid && isEnough && allNonZero) {
      const order = new orderList({
        user,
        orderItems: items.map((item) => ({
          ...item,
        })),
        shippingDetails: shippingDetails,
      });

      await order.save();

      res
        .status(200)
        .json({ message: "Item added to cart successfully", order });
    } else if (!isEnough || !allNonZero) {
      res.status(400).json({
        message: "Invalid order, not enough quantity, please update order",
      });
    } else {
      res.status(400).json({
        message: "Invalid order, not enough amount, please update order",
      });
    }
  } catch (error) {
    console.log(error);
  }
};
