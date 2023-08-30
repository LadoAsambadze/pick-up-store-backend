import { Schema, model } from "mongoose";

const user = new Schema(
  {
    name: {
      type: Schema.Types.String,
      default: "lado",
    },

    email: {
      type: Schema.Types.String,
      unique: true,
      required: true,
    },
    password: {
      type: Schema.Types.String,
      required: true,
    },
    isAdmin: {
      type: Schema.Types.Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

const userModel = model("user", user);

export default userModel;
