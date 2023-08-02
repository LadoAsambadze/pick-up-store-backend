import { model, Schema } from "mongoose";

const shoes = new Schema({
  model: {
    type: Schema.Types.String,
    required: true,
    details: {
      price: {
        type: Schema.Types.String,
        required: true,
      },
    },
  },
});

export const shoesData = model("shoes", shoes);
