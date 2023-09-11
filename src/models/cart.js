import { model, Schema } from "mongoose";

const cart = new Schema(
  {
    user: {
      type: Schema.Types.String,
      required: true,
      ref: "User",
    },
    orderItems: [
      {
        
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
        product: {
          type: Schema.Types.String,
          ref: "Product",
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
