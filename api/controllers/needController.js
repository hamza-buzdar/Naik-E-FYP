import Need from "../models/needModel.js";


export const createNeed = async(req,res,next)=>{
    const newNeed = new Need({
        userId: req.userId,
        ...req.body,
    });

try {
const savedNeed = await newNeed.save();
res.status(201).json(savedNeed);
} catch (err) {
next(err);
};
};
    // if (!req.isNeedy)
    // return next(createError(403, "Only Needy Users can create a need!"));

    


    export const deleteNeed = async (req, res, next) => {
        try {
          const need = await Need.findById(req.params.id);
          if (need.userId !== req.userId)
            return next(createError(403, "You can delete only your need!"));
      
          await Need.findByIdAndDelete(req.params.id);
          res.status(200).send("Need has been deleted!");
        } catch (err) {
          next(err);
        }
      };


      export const getNeed = async (req, res, next) => {
        try {
          const need = await Need.findById(req.params.id);
          if (!need) next(createError(404, "need not found!"));
          res.status(200).send(need);
        } catch (err) {
          next(err);
        }
      };
      export const getNeeds = async (req, res, next) => {
        const q = req.query;
        const filters = {
          ...(q.userId && { userId: q.userId }),
          ...(q.category && { category: q.category }),
          ...((q.min || q.max) && {
            price: {
              ...(q.min && { $gt: q.min }),
              ...(q.max && { $lt: q.max }),
            },
          }),
          ...(q.search && { title: { $regex: q.search, $options: "i" } }),
        };
        try {
          const needs = await Need.find(filters).sort({ [q.sort]: -1 });
          res.status(200).send(needs);
        } catch (err) {
          next(err);
        }
      };