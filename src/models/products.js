import { model, Schema } from "mongoose";
import { v4 as uuidv4 } from "uuid";

const reviewSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: Schema.Types.String,
    },
    rating: {
      type: Schema.Types.String,
    },
    comment: {
      type: Schema.Types.String,
    },
  },
  {
    timestamps: true,
  }
);

const products = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
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
    brand: {
      type: Schema.Types.String,
    },
    name: {
      type: Schema.Types.String,
    },
    new: {
      type: Schema.Types.Boolean,
      default: false,
    },
    reviews: [reviewSchema],
    rating: {
      type: Schema.Types.Number,
      default: 0,
    },
    numReviews: {
      type: Schema.Types.Number,
      default: 0,
    },
    countInStock: {
      type: Schema.Types.Number,
      default: 0,
    },
    images: [
      {
        own_id: {
          type: Schema.Types.String,
          default: uuidv4,
        },
        color: {
          type: Schema.Types.String,
        },
        size: {
          type: Map,
          of: Number,
        },
        urls: [
          {
            type: Schema.Types.String,
          },
        ],
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const productsData = model("products", products);
