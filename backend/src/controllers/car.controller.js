import { Car } from "../models/car.model.js"; //Itt vannak mentve a minták
import { asyncHandler } from "../utils/asyncHandler.js"; //Leveszi a terhet, nem kell tryCatch

export const createCar = asyncHandler(async (req, res) => {
  const { brand, model, date, color } = req.body;

  if (!brand?.trim() || !model?.trim() || date === null) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const car = await Car.create({ brand, model, date, color }); //post modellt használva elkészitjük az új adatot

  res.status(201).json({ message: "Car created successfully", car });
});

export const getCars = asyncHandler(async (req, res) => {
  const cars = await Car.find({}).lean(); //Find visszaadja az összes objecktet, a lean pedig általunk olvashatóvá teszi
  res.status(200).json({ cars }); //visszaadjuk a kódot és az összes posts-ot
});

export const updateCar = asyncHandler(async (req, res) => {
  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({ message: "No data provided for update" });
  }

  const car = await Car.findByIdAndUpdate(req.params.id, req.body, {
    //beépitett metodus a mongoose-ban, Id alapján keresünk és frissitünk

    new: true, //már a frissitett adatot adjuk vissza
    runValidators: true,
    //frissitjük a timestampet és ellenörizzük az adatokat
  });

  if (!car) {
    return res.status(404).json({ message: "Car not found" });
  }
  res.status(200).json({ message: "Car update successfully", car });
});

export const deleteCar = asyncHandler(async (req, res) => {
  const car = await Car.findByIdAndDelete(req.params.id);

  if (!car) {
    return res.status(404).json({ message: "Car not found" });
  }
  res.status(200).json({ message: "Deleted successfully" });
});
