import { model, Schema } from "mongoose";

const products = new Schema({
  model: {
    clothes: {
      type: {
        type: Schema.Types.String,
      },
      gender: {
        type: Schema.Types.String,
      },
      category: {
        type: Schema.Types.String,
      },
      price: {
        type: Schema.Types.Number,
      },
      size: {
        type: Schema.Types.String,
      },
      brand: {
        type: Schema.Types.String,
      },
      name: {
        type: Schema.Types.String,
      },
      image: {
        type: Schema.Types.Array,
      },
      new: {
        type: Schema.Types.Boolean,
      },
    },
  },
});

export const productsData = model("products", products);
