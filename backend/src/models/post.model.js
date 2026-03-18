import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: 3,
      maxlength: 50,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
      minlength: 3,
      maxlength: 200,
    },
    age: {
      type: Number,
      required: [true, "Age is required"],
      min: 1,
      max: 120,
    },
  },
  { timestamps: true },
);

export const Post = mongoose.model("Post", postSchema); //a modell köti össze a schemat az adatbázissal
//Post mongoDB-ben automatikusan Posts collection lesz
