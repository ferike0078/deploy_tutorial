import mongoose from "mongoose";

export const validateObjectID =
  (paramName = "id") =>
  (req, res, next) => {
    const id = req.params[paramName]; //URL /api/ után :id

    if (!mongoose.Types.ObjectId.isValid(id)) {
      //ellenörizzük hogy érvényes mongodb ID-e
      return res.status(400).json({ message: "Invalid id format" });
    }
    next();
  };
