import { model, Schema } from "mongoose";
import { v4 as uuidv4 } from "uuid";

const cart = new Schema(
  {
    user: {
      type: Schema.Types.String,
      required: true,
      ref: "User",
    },
    orderItems: [
      {
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
        own_id: {
          type: Schema.Types.String,
        },
      },
    ],
  },
  { timestamps: true }
);

export const cartProduct = model("cart", cart);
