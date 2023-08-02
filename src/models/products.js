import { model, Schema } from "mongoose";

const products = new Schema({
  model: {
    type: Schema.Types.String,
    required: true,
    details: {
      price: {
        type: Schema.Types.String,
        required: true,
      },
      image: {
        type: Schema.Types.String,
      },
    },
  },
});

export const productsData = model("products", products);
