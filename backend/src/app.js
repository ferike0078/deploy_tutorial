import express from "express";
import router from "./routes/post.route.js";
import { notFound, errorHandler } from "./middlewares/error.middleware.js";
import routerCar from "./routes/car.route.js";
import userRouter from "./routes/user.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import {
  attachUser,
  logger,
  requireApiKey,
  requireLogin,
} from "./middlewares/test.middleware.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true })); //html formoknál használjuk adatkinyerésre

app.use(logger);

//cookie-k olvasasa

app.use(cookieParser());

//cors for frontend
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
    methods: ["POST", "GET", "PATCH", "DELETE", "PUT", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.get("/health", (req, res) => {
  res.json({ ok: true });
});

app.get("/private", requireApiKey, (req, res) => {
  res.json({ secret: "Oscar" });
});

app.get("/me", attachUser, (req, res) => {
  res.json({ user: req.user });
});

app.get("/dashboard", requireApiKey, attachUser, requireLogin, (req, res) => {
  res.json({ message: `Welcome ${req.user.name}` });
});
app.use("/api/v1/cars", routerCar);
app.use("/api/v1/users", userRouter);

app.use("/api/v1/posts", router); //alapja a postoknak, utána a router elválasztja azokat
app.use(notFound); //ha nem jo az url eleres
app.use(errorHandler); //központi error handler --> minden next(err)-el tovabadott hiba ide erkezik

export default app;
