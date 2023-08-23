import { cartProduct } from "../models/cart.js";

const addCart = async (req, res) => {
  const { product_id, size, color, quantity, image, name, price, amount } =
    req.body;

  try {
    const existingCartItem = await cartProduct.findOne({
      product_id,
      name,
      size,
      image,
      color,
      quantity,
      price,
    });

    if (existingCartItem) {
      res.status(400).json({
        message:
          "Item with the same product_id, size, color, and quantity already exists in the cart",
      });
    } else {
      const cartItem = new cartProduct({
        product_id,
        name,
        image,
        size,
        color,
        quantity,
        price,
        amount,
      });

      await cartItem.save();

      res
        .status(200)
        .json({ message: "Item added to cart successfully", cartItem });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to add item to cart", error: error.message });
  }
};

export const getCart = async (req, res) => {
  const { product_id } = req.body;

  const selectedItem = await cartProduct.find(product_id);

  try {
    res.status(200).json({ message: "get/done", selectedItem });
  } catch (error) {
    res.status(500).json({ message: "not done", error });
  }
};
export const updateCart = async (req, res) => {
  try {
    const { product_id } = req.params;
    const { new_amount } = req.body;

    const item = await cartProduct.findOne({ product_id });

    if (!item) {
      res.status(404).json({ message: "fItem not found" });
    } else {
      item.amount = new_amount;
      await item.save();
      res
        .status(200)
        .json({ message: "Item amount changed successfuly!", item });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ message: "An error occurred while updating the cart" });
  }
};

export const deleteProduct = async (req, res) => {
  const { product_id } = req.params;
  const deletedItem = await cartProduct.deleteOne({ product_id });

  try {
    res.status(200).json({ message: "Deleted successfuly!", deletedItem });
  } catch (error) {
    res.status(500).json({ message: "Failed", error });
  }
};

export default addCart;
