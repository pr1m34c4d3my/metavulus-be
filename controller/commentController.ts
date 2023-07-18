import { Request, Response } from "express";
import COMMENT from "../model/comment";
import { timeZone } from "../utils/timezone";

const commentController = {
  createComment: async (req: Request, res: Response) => {
    const { idPost, idAccount, comment } = req.body;
    try {
      const newComment = new COMMENT({
        idPost: idPost,
        idAccount: idAccount,
        comment: comment,
      });
      await newComment.save();
      res.status(201).json({
        message: newComment,
      });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  getAllComment: async (req: Request, res: Response) => {
    try {
      const comment = await COMMENT.find({
        isDeleted: 0,
      }).populate({
        path: "idAccount",
        select: "username",
        model: "account",
      });
      res.status(200).json({ message: comment });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
      console.log(error);
    }
  },
  getCommentById: async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const comment = await COMMENT.find({
        _id: id,
      }).populate({
        path: "idAccount",
        select: "username",
        model: "account",
      });
      res.status(200).json({ message: comment });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
  updateComment: async (req: Request, res: Response) => {
    const { id, comment } = req.body;

    try {
      const updateComment = {
        _id: id,
        comment: comment,
        updatedAt: timeZone(),
      };
      await COMMENT.findByIdAndUpdate(id, updateComment);
      res.status(200).json({
        message: updateComment,
      });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  commentDelete: async (req: Request, res: Response) => {
    const { id } = req.body;

    try {
      const deleteComment = {
        isDeleted: 1,
        updatedAt: timeZone(),
      };
      await COMMENT.findByIdAndUpdate(id, deleteComment);
      res.status(200).json({
        message: "Comment Deleted",
      });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
};
module.exports = commentController;
