import mongoose from "mongoose";
const { Schema } = mongoose;

const ProcessrequestSchema = new Schema(
  {
    needId: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: false,
    },
    title: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    needyId: {
      type: String,
      required: true,
    },
    donorId: {
      type: String,
      required: true,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
    payment_intent: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Processrequest", ProcessrequestSchema);