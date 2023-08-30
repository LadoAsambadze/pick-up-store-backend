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
      },
    ],
    shippingAdress: {
      adress: {
        type: Schema.Types.String,
      },
      city: {
        type: Schema.Types.String,
      },
      postalCode: {
        type: Schema.Types.String,
      },
      country: {
        type: Schema.Types.String,
      },
    },
    paymentMethod: {
      type: Schema.Types.String,
    },
    paymentResult: {
      id: {
        type: Schema.Types.String,
      },
      status: {
        type: Schema.Types.String,
      },
      update_time: {
        type: Schema.Types.String,
      },
      email_adress: {
        type: Schema.Types.String,
      },
    },
    itemPrice: {
      type: Schema.Types.Number,
      default: 0.0,
    },
    taxPrice: {
      type: Schema.Types.Number,

      default: 0.0,
    },
    isPaid: {
      type: Schema.Types.Boolean,
      required: true,
      default: false,
    },
    paidAt: {
      type: Schema.Types.Date,
    },
    isDelivered: {
      type: Schema.Types.Boolean,
      required: true,
      default: false,
    },
    deliveredAt: {
      type: Schema.Types.Date,
    },
  },
  { timestamps: true }
);

export const cartProduct = model("cart", cart);
