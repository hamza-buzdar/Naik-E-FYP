import Processrequest from "../models/processrequestModel.js"
import createError from "../utils/createError.js"
import Need from "../models/needModel.js"
import Stripe from "stripe";


export const intent = async (req, res, next) => {
    const stripe = new Stripe("sk_test_51NQQsELuXkyzzzYWlsl6Puo8ph7h2KPMrkbo46wmg5ggQ3t45H6Z0ZHw0s8mACcuvrZUu9RiZINOwh7b2KJVBDSC00eTPFjQPf");
  
    const need = await Need.findById(req.params.id);
  
    const paymentIntent = await stripe.paymentIntents.create({
      amount: need.amount * 100,
      currency: "usd",
      automatic_payment_methods: {
        enabled: true,
      },
    });

    const newProcessrequest = new Processrequest ({
        needId: need._id,
        img: need.cover,
        title: need.title,
        donorId:req.userId,
        needyId:need.userId,
        amount:need.amount,
        payment_intent:paymentIntent.id,

    });

    await newProcessrequest.save();

    res.status(200).send({
        clientSecret: paymentIntent.client_secret,
      });
    };




export const getProcessrequests = async (req,res, next) => {
    
    try{

        const processrequests = await Processrequest.find({
            ...(req.isNeedy ? {needyId:req.userId}: {donorId:req.userId}),
            isCompleted: true,
        });

        res.status(200).send(processrequests);


    }catch (err) {
        next(err);
    }
}

export const confirm = async (req, res, next) => {
    try {
      const processrequests = await Processrequest.findOneAndUpdate(
        {
          payment_intent: req.body.payment_intent,
        },
        {
          $set: {
            isCompleted: true,
          },
        }
      );
  
      res.status(200).send("Order has been confirmed.");
    } catch (err) {
      next(err);
    }
  };