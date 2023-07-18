import express, { Router } from "express";
const {
  createComment,
  getAllComment,
  getCommentById,
  updateComment,
  commentDelete,
} = require("../../controller/commentController");

const router: Router = express.Router();
router.post("/", createComment);
router.get("/", getAllComment);
router.get("/getCommentById/:id", getCommentById);
router.patch("/", updateComment);
router.patch("/deleteComment", commentDelete);

module.exports = router;
