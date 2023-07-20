import Conversation from "../models/conversationModel.js";
import createError from "../utils/createError.js";
import Chat from "../models/chatModel.js"

export const createChat = async (req, res, next) => {
  const newChat = new Chat({
    conversationId: req.body.conversationId,
    userId: req.userId,
    desc: req.body.desc,
  });
  try {
    const savedChat = await newChat.save();
    await Conversation.findOneAndUpdate(
      { id: req.body.conversationId },
      {
        $set: {
          readByNeedy: req.isNeedy,
          readByDonor: !req.isNeedy,
          lastMessage: req.body.desc,
        },
      },
      { new: true }
    );

    res.status(201).send(savedChat);
  } catch (err) {
    next(err);
  }
};
export const getChats = async (req, res, next) => {
  try {
    const chats = await Chat.find({ conversationId: req.params.id });
    res.status(200).send(chats);
  } catch (err) {
    next(err);
  }
};