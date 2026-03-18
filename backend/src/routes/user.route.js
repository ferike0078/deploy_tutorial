import { Router } from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  getMe,
  refreshAccessToken,
} from "../controllers/user.controller.js";
import { requireAuth } from "../middlewares/auth.middleware.js";
/* import { validateObjectID } from "../middlewares/validateObjectID.js"; */

const userRouter = Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/logout", logoutUser);

//secure route
userRouter.get("/me", requireAuth, getMe);
userRouter.post("/refresh", refreshAccessToken);

export default userRouter;
