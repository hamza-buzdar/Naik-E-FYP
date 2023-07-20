import mongoose from "mongoose";
const { Schema } = mongoose;

const ConversationSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    needyId: {
      type: String,
      required: true,
    },
    donorId: {
      type: String,
      required: true,
    },
    readByNeedy: {
      type: Boolean,
      required: true,
    },
    readByDonor: {
      type: Boolean,
      required: true,
    },
    lastMessage: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Conversation", ConversationSchema);