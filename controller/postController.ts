import { Request, Response } from "express";
import POST from "../model/post";
import { timeZone } from "../utils/timezone";

const postController = {
  createPost: async (req: Request, res: Response) => {
    const { idAccount, post, idImage, idTag } = req.body;
    try {
      const newPost = new POST({
        idAccount: idAccount,
        post: post,
        idImage: idImage,
        idTag: idTag,
      });
      await newPost.save();
      res.status(201).json({
        message: newPost,
      });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  getAllPost: async (req: Request, res: Response) => {
    try {
      const post = await POST.find({
        isDeleted: 0,
      }).populate({
        path: "idAccount",
        select: "username",
        model: "account",
      });
      res.status(200).json({ message: post });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
      console.log(error);
    }
  },
  getPostById: async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const post = await POST.find({
        _id: id,
      }).populate({
        path: "idAccount",
        select: "username",
        model: "account",
      });
      res.status(200).json({ message: post });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
  updatePost: async (req: Request, res: Response) => {
    const { id, post, idImage, idTag } = req.body;

    try {
      const updatePost = {
        _id: id,
        post: post,
        idImage: idImage,
        idTag: idTag,
        updatedAt: timeZone(),
      };
      await POST.findByIdAndUpdate(id, updatePost);
      res.status(200).json({
        message: updatePost,
      });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  postDelete: async (req: Request, res: Response) => {
    const { id } = req.body;

    try {
      const deletePost = {
        isDeleted: 1,
        updatedAt: timeZone(),
      };
      await POST.findByIdAndUpdate(id, deletePost);
      res.status(200).json({
        message: "Post Delete",
      });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
};
module.exports = postController;
