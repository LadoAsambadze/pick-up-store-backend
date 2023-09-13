import { Schema, model } from "mongoose";

const sentOrders = new Schema(
  {
    user: {
      type: Schema.Types.String,
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
    ],
  },
  { timestamps: true }
);

export const sentOrderList = model("sentOrders", sentOrders);
