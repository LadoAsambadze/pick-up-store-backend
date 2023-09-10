import { orderList } from "../models/order.js";
import { productsData } from "../models/products.js";
import { cartProduct } from "../models/cart.js";

export const makeOrder = async (req, res) => {
  const { user, items, shippingDetails } = req.body;
  try {
    const cart = await cartProduct.findOne({ user });
    const allProducts = await productsData.find();
    const newCart = await cartProduct.find();
    const ownIds = cart.orderItems.map((item) => item.own_id);
    const purchaseIds = cart.orderItems.map((item) => item.purchase_id);

    const filteredList = ownIds.map((item) =>
      allProducts.find((product) =>
        product.itemList.find((exact) => exact._id.toString() === item)
      )
    );
    const filteredCart = purchaseIds.map((item) =>
      newCart.find((product) =>
        product.orderItems.find((exact) => exact.purchase_id === item)
      )
    );

    let isValid = true;
    let isEnough = true;
    let allNonZero = true;

    for (const [index, item] of filteredCart.entries()) {
      const cartIndex = item.orderItems.findIndex(
        (product) => product.purchase_id === purchaseIds[index]
      );

      if (item.orderItems[cartIndex].quantity <= 0) {
        allNonZero = false;
        break;
      }
    }

    if (allNonZero) {
      for (const [index, item] of filteredCart.entries()) {
        const cartIndex = item.orderItems.findIndex(
          (product) => product.purchase_id === purchaseIds[index]
        );

        item.orderItems[cartIndex].quantity =
          item.orderItems[cartIndex].quantity -
          item.orderItems[cartIndex].amount;
        item.orderItems[cartIndex].amount = 1;

        await cartProduct.updateMany(
          {
            // Filter documents where at least one object in the orderItems array matches the condition
            $or: item.orderItems.map((orderItem) => ({
              "orderItems.own_id": orderItem.own_id,
            })),
          },
          {
            // Use $set to update the matching objects within the orderItems array
            $set: {
              "orderItems.$[elem]": item.orderItems.find((orderItem) => ({
                "elem.own_id": orderItem.own_id,
              })),
            },
          },
          {
            // This option allows you to specify arrayFilters to filter the elements in the array
            arrayFilters: item.orderItems.map((orderItem) => ({
              "elem.own_id": orderItem.own_id,
            })),
          }
        );
      }

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
