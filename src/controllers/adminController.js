import { orderList } from "../models/order.js";
import { sentOrderList } from "../models/sentOrders.js";

export const getOrders = async (req, res) => {
  const orders = await orderList.find();
  try {
    res.status(200).json({ menssage: "Succesfuly fetched", orders });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const sentOrders = async (req, res) => {
  try {
    const { user, orderItems } = req.body;

    const existingUser = await sentOrderList.findOne({ user });
    const orderByUser = await orderList.findOne({ user });

    if (!existingUser) {
      const sentProduct = new sentOrderList({
        user: user,
        orderItems: orderItems,
      });

      await sentProduct.save();
    } else {
      for (let item of orderItems) {
        const existingItemIndex = existingUser.orderItems.findIndex(
          (oi) => oi.purchase_id === item.purchase_id
        );

        if (existingItemIndex > -1) {
          // Update the amount if the item already exists
          existingUser.orderItems[existingItemIndex].amount += item.amount;
        } else {
          // Add the item if it does not exist
          existingUser.orderItems.push(item);
        }
      }

      await sentOrderList.updateOne(
        { user },
        { $set: { orderItems: existingUser.orderItems } }
      );
    }

    const updatedOrderItems = orderByUser.orderItems.filter((orderItem) => {
      return !orderItems.some(
        (item) => item.purchase_id === orderItem.purchase_id
      );
    });

    await orderList.updateOne(
      { user },
      { $set: { orderItems: updatedOrderItems } }
    );

    if (updatedOrderItems.length === 0) {
      await orderList.deleteOne({ user });
    }

    res
      .status(200)
      .json({ message: "User sent Order Lists updated successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error." });
  }
};

export const getSentOrders = async (req, res) => {
  const orders = await sentOrderList.find();
  try {
    res.status(200).json({ menssage: "Succesfuly fetched", orders });
  } catch (error) {
    res.status(500).json(error);
  }
};
