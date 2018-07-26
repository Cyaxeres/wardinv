import mongoose from "mongoose";
const Schema = mongoose.Schema;

const docketSchema = Schema(
  {
    docno: {
      type: String,
      required: true,
      unique: true
    },
    name: {
      type: String,
      required: true
    },
    status: {
      type: String,
      required: true
    }
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

module.exports = mongoose.model("Docket", docketSchema);
