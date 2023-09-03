import { model, Schema } from "mongoose";

const orderSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
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
      },
    ],
    shippingAddress: {
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

const Order = model("Order", orderSchema);

export default Order;

export const orderList = model("cart", order);
