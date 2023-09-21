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
          (oi) =>
            oi.purchase_id === item.purchase_id &&
            oi.address === item.address &&
            oi.fullName === item.fullName &&
            oi.city === item.city &&
            oi.phoneNumber === item.phoneNumber
        );

        if (existingItemIndex > -1) {
          existingUser.orderItems[existingItemIndex].amount += item.amount;
        } else {
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
        (item) =>
          item.purchase_id === orderItem.purchase_id &&
          item.fullName === orderItem.fullName &&
          item.address === orderItem.address &&
          item.city === orderItem.city &&
          item.phoneNumber === orderItem.phoneNumber
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

export const removeSentOrders = async (req, res) => {
  try {
    const { user, item } = req.body;

    const userDoc = await sentOrderList.findOne({ user });
    if (!userDoc) {
      return res.status(404).json({ message: "User not found" });
    }

    const itemIndex = userDoc.orderItems.findIndex((orderItem) => {
      return (
        orderItem.purchase_id === item.purchase_id &&
        orderItem.fullName === item.fullName &&
        orderItem.address === item.address &&
        orderItem.phoneNumber === item.phoneNumber &&
        orderItem.city === item.city
      );
    });
    console.log(itemIndex);

    if (itemIndex === -1) {
      return res
        .status(404)
        .json({ message: "Item not found in sendOrderList" });
    } else {
      userDoc.orderItems.splice(itemIndex, 1);
      await userDoc.save();
    }

    res.status(200).json({ message: "Item removed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
