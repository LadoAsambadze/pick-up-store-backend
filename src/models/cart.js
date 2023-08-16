import { model, Schema } from "mongoose";

const cart = new Schema({
  product_id: {
    type: Schema.Types.String,
  },
  image: {
    type: Schema.Types.String,
  },
  size: {
    type: Schema.Types.String,
  },
  color: {
    type: Schema.Types.String,
  },
  quantity: {
    type: Schema.Types.Number,
  },
  name: {
    type: Schema.Types.String,
  },
  price: {
    type: Schema.Types.String,
  },
});

export const cartProduct = model("cart", cart);
