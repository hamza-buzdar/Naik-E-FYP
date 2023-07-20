import mongoose from "mongoose";
const { Schema } = mongoose;

const NeedSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    totalStars: {
      type: Number,
      default: 0,
    },
    starNumber: {
      type: Number,
      default: 0,
    },
    cat: {
      type: String,
      required: false,
    },
    amount: {
      type: Number,
      required: true,
    },
    cover: {
      type: String,
      required: false,
    },
    images: {
      type: [String],
      required: false,
    },
    shortTitle: {
      type: String,
      required: false,
    },
    shortDesc: {
      type: String,
      required: false,
    },
    deliveryTime: {
      type: Number,
      required: false,
    },
    revisionNumber: {
      type: Number,
      required: false,
    },
    features: {
      type: [String],
      required: false,
    },
    sales: {
      type: Number,
      default: 0,
      required: false
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Need", NeedSchema);