import { Request, Response } from "express";
import TAGGING from "../model/tagging";

const taggingController = {
  createTagging: async (req: Request, res: Response) => {
    const { nama } = req.body;
    try {
      const newTagging = new TAGGING({
        nama: nama,
      });
      await newTagging.save();
      res.status(201).json(newTagging);
    } catch (error) {
      res.status(500).json({ error: "Failed to create tag" });
    }
  },
};
module.exports = taggingController;
