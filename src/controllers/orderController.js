import { orderList } from "../models/order.js";
import { productsData } from "../models/products.js";
import { cartProduct } from "../models/cart.js";

export const makeOrder = async (req, res) => {
  const { user, items } = req.body;

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
      let order = await orderList.findOne({ user });

      if (!order) {
        order = new orderList({
          user,
          orderItems: items.map((item) => ({
            ...item,
          })),
        });
      } else {
        items.forEach((newItem) => {
          const existingItem = order.orderItems.find(
            (item) =>
              item.purchase_id === newItem.purchase_id &&
              item.own_id === newItem.own_id &&
              item.fullName == newItem.fullName &&
              item.address === newItem.address &&
              item.phoneNumber === newItem.phoneNumber &&
              item.city === newItem.city
          );

          if (existingItem) {
            existingItem.amount += newItem.amount;
          } else {
            order.orderItems.push(newItem);
          }
        });
      }

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
