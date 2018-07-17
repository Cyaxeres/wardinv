import mongoose from "mongoose";
import shortid from "shortid";
const Schema = mongoose.Schema;

//TODO: Add dispenser identity

const orderSchema = Schema(
  {
    _id: {
      type: String,
      default: shortid.generate
    },
    sender: {
      id: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
      },
      username: String
    },
    cart: {
      type: Object,
      required: true
    },
    patient: {
      type: String,
      required: true
    },
    active: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

//create the model for users and expose it to our app
module.exports = mongoose.model("Order", orderSchema);
