import { model, Schema } from "mongoose";

const order = new Schema(
  {
    user: {
      type: Schema.Types.String,
      required: true,
      ref: "User",
    },
    orderItems: [
      {
        product_id: {
          type: Schema.Types.ObjectId,
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
          type: Schema.Types.ObjectId,
          ref: "Product",
        },
        own_id: {
          type: Schema.Types.String,
        },
      },
    ],
    shippingDetails: {
      fullName: {
        type: Schema.Types.String,
      },
      city: {
        type: Schema.Types.String,
      },
      address: {
        type: Schema.Types.String,
      },
      phoneNumber: {
        type: Schema.Types.String,
      },
    },
  },
  { timestamps: true }
);

export const orderList = model("order", order);
