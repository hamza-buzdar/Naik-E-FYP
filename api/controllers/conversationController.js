import createError from "../utils/createError.js";
import Conversation from "../models/conversationModel.js"


export const createConversation = async (req, res, next) => {
    const newConversation = new Conversation({
      id: req.isNeedy ? req.userId + req.body.to : req.body.to + req.userId,
      needyId: req.isNeedy ? req.userId : req.body.to,
      donorId: req.isNeedy ? req.body.to : req.userId,
      readByNeedy: req.isNeedy,
      readByDonor: !req.isNeedy,
    });
  
    try {
      const savedConversation = await newConversation.save();
      res.status(201).send(savedConversation);
    } catch (err) {
      next(err);
    }
  };
  
  export const updateConversation = async (req, res, next) => {
    try {
      const updatedConversation = await Conversation.findOneAndUpdate(
        { id: req.params.id },
        {
          $set: {
            // readBySeller: true,
            // readByBuyer: true,
            ...(req.isNeedy ? { readByNeedy: true } : { readByDonor: true }),
          },
        },
        { new: true }
      );
  
      res.status(200).send(updatedConversation);
    } catch (err) {
      next(err);
    }
  };
  
  export const getSingleConversation = async (req, res, next) => {
    try {
      const conversation = await Conversation.findOne({ id: req.params.id });
      if (!conversation) return next(createError(404, "Not found!"));
      res.status(200).send(conversation);
    } catch (err) {
      next(err);
    }
  };
  
  export const getConversations = async (req, res, next) => {
    try {
      const conversations = await Conversation.find(
        req.isNeedy ? { needyId: req.userId } : { donorId: req.userId }
      ).sort({ updatedAt: -1 });
      res.status(200).send(conversations);
    } catch (err) {
      next(err);
    }
  };