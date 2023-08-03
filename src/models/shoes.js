import { model, Schema } from "mongoose";

const shoes = new Schema({
  model: {
    shoes: {
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
        type: Schema.Types.String,
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
        type: Schema.Types.String,
      },
      new: {
        type: Schema.Types.Boolean,
      },
    },
  },
});

export const shoesData = model("shoes", shoes);
