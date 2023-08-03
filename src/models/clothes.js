import { model, Schema } from "mongoose";

const clothes = new Schema({
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
    },
  },
});

export const clothesData = model("clothes", clothes);
