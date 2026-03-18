import { Post } from "../models/post.model.js"; //Itt vannak mentve a minták
import { asyncHandler } from "../utils/asyncHandler.js"; //Leveszi a terhet, nem kell tryCatch

export const createPost = asyncHandler(async (req, res) => {
  const { name, description, age } = req.body;

  if (!name?.trim() || !description?.trim() || age === null) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const post = await Post.create({ name, description, age }); //post modellt használva elkészitjük az új adatot

  res.status(201).json({ message: "Post created successfully", post });
});

export const getPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find({}).lean(); //Find visszaadja az összes objecktet, a lean pedig általunk olvashatóvá teszi
  res.status(200).json({ posts }); //visszaadjuk a kódot és az összes posts-ot
});

export const updatePost = asyncHandler(async (req, res) => {
  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({ message: "No data provided for update" });
  }

  const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
    //beépitett metodus a mongoose-ban, Id alapján keresünk és frissitünk
    versionKey: true,
    new: true, //már a frissitett adatot adjuk vissza
    runValidators: true,
    //frissitjük a timestampet és ellenörizzük az adatokat
  });

  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }
  res.status(200).json({ message: "Post update successfully", post });
});

export const deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findByIdAndDelete(req.params.id);

  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }
  res.status(200).json({ message: "Deleted successfully" });
});
