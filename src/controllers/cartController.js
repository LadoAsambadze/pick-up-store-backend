import { cartProduct } from "../models/cart.js";

const addCart = async (req, res) => {
  const { product_id, size, color, quantity, image, name } = req.body;

  try {
    // Check if an item with the same product_id, size, color, and quantity already exists in the cart
    const existingCartItem = await cartProduct.findOne({
      product_id,
      name,
      size,
      image,
      color,
      quantity,
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

export default addCart;
