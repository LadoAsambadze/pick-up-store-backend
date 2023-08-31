import { cartProduct } from "../models/cart.js";
import { v4 as uuidv4 } from "uuid";

export const addCart = async (req, res) => {
  const { user, orderItems } = req.body;

  try {
    const existingUser = await cartProduct.findOne({
      user,
    });
    if (!existingUser) {
      const cartItem = new cartProduct({
        user,
        orderItems: orderItems.map((item) => ({
          ...item,
          purchase_id: uuidv4(),
        })),
      });
      await cartItem.save();
      res
        .status(200)
        .json({ message: "Item added to cart successfully", cartItem });
    } else {
      let itemExists = false;
      orderItems.forEach((item) => {
        item.purchase_id = uuidv4();
        const isPresent = existingUser.orderItems.some(
          (existingItem) =>
            existingItem.size === item.size &&
            existingItem.color === item.color &&
            existingItem.name == item.name
        );

        if (isPresent) {
          itemExists = true;
        } else {
          existingUser.orderItems.push(...orderItems);
        }
      });
      if (itemExists) {
        res.status(200).json({ message: "Item exists" });
      } else {
        await existingUser.save();
        res
          .status(200)
          .json({ message: "Item added to cart successfully", existingUser });
      }
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to add item to cart", error: error.message });
  }
};

export const getCart = async (req, res) => {
  const userId = req.query.userId;
  const selectedItem = await cartProduct.find({ user: userId });
  try {
    res.status(200).json({ message: "Successfully fetched!", selectedItem });
  } catch (error) {
    res.status(500).json({ message: "Fetch failed", error });
  }
};
export const updateCart = async (req, res) => {
  try {
    const { purchase_id } = req.params;
    const { new_amount, user_id } = req.body;

    const cart = await cartProduct.findOne({ user: user_id });
    if (!cart) {
      res.status(404).json({ message: "Cart not found" });
    } else {
      const item = cart.orderItems.find(
        (item) => item.purchase_id === purchase_id
      );
      if (!item) {
        res.status(404).json({ message: "Item not found" });
      } else {
        item.amount = new_amount;
        await cart.save();
        res
          .status(200)
          .json({ message: "Item amount changed successfully!", cart });
      }
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ message: "An error occurred while updating the cart" });
  }
};

export const deleteProduct = async (req, res) => {
  const { purchase_id } = req.params;
  const { user_id } = req.body;
  try {
    const userCart = await cartProduct.findOne({ user: user_id });
    const itemIndex = userCart.orderItems.findIndex(
      (item) => item.purchase_id === purchase_id
    );

    if (itemIndex === -1) {
      return res.status(404).json({ message: "Item not found in the cart" });
    }
    userCart.orderItems.splice(itemIndex, 1);
    await userCart.save();

    res.status(200).json({ message: "Deleted successfully!", userCart });
  } catch (error) {
    res.status(500).json({ message: "Deleting failed", error });
  }
};
