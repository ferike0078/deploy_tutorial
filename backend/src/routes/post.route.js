import { Router } from "express"; // azért kell mert rövidit

import {
  createPost,
  deletePost,
  updatePost,
  getPosts,
} from "../controllers/post.controller.js";
import { validateObjectID } from "../middlewares/validateObjectID.js";

const router = Router();

router.post("/", createPost);
router.get("/", getPosts);

router.patch("/:id", validateObjectID("id"), updatePost);
router.delete("/:id", validateObjectID("id"), deletePost);

export default router;
