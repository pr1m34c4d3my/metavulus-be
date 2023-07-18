import express, { Router } from "express";
const {
  createPost,
  getAllPost,
  getPostById,
  updatePost,
  postDelete,
} = require("../../controller/postController");

const router: Router = express.Router();
router.post("/", createPost);
router.get("/", getAllPost);
router.get("/getPostById/:id", getPostById);
router.patch("/", updatePost);
router.patch("/deletePost", postDelete);
module.exports = router;
