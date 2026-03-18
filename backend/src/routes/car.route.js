import { Router } from "express"; // azért kell mert rövidit

import {
  createCar,
  deleteCar,
  updateCar,
  getCars,
} from "../controllers/car.controller.js";
import { validateObjectID } from "../middlewares/validateObjectID.js";

const routerCar = Router();

routerCar.post("/", createCar);
routerCar.get("/", getCars);

routerCar.patch("/:id", validateObjectID("id"), updateCar);
routerCar.delete("/:id", validateObjectID("id"), deleteCar);

export default routerCar;
