import { model, Schema } from "mongoose";

const products = new Schema({
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
    type: [Schema.Types.Number],
  },
  brand: {
    type: Schema.Types.String,
  },
  name: {
    type: Schema.Types.String,
  },
  images: [
    {
      color: {
        type: Schema.Types.String,
      },
      urls: [
        {
          type: Schema.Types.String,
        },
      ],
    },
  ],
});

export const productsData = model("products", products);
