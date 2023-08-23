import { model, Schema } from "mongoose";
import { v4 as uuidv4 } from "uuid";

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
  amount: {
    type: Schema.Types.Number,
  },
  purchase_id: {
    type: Schema.Types.String,
  },
});

export const cartProduct = model("cart", cart);
