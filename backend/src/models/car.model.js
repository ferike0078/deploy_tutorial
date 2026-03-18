import mongoose from "mongoose";

const carSchema = new mongoose.Schema(
  {
    brand: {
      type: String,
      required: [true, "Brand is required"],
      trim: true,
      minlength: 3,
      maxlength: 30,
    },
    model: {
      type: String,
      required: [true, "Model is required"],
      trim: true,
      minlength: 1,
      maxlength: 50,
    },
    date: {
      type: Date,
      required: [true, "Date is required"],
      trim: true,
      min: ["1950-01-01", "Can not be so old"],
      max: [Date.now, "No cars made in the future"],
    },
    color: {
      type: String,
      minlength: 3,
      maxlength: 20,
    },
  },
  { timestamps: true },
);

export const Car = mongoose.model("Car", carSchema); //a modell köti össze a schemat az adatbázissal
//Post mongoDB-ben automatikusan Posts collection lesz
