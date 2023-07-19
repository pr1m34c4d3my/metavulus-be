import { Request, Response } from "express";
import FOLLOWACCOUNT from "../model/follow";

const followAccountController = {
  getAllFollowers: async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const getFollowers = async () => {
        const followers = await FOLLOWACCOUNT.find({ followers: id }).populate(
          "follower"
        );
        return followers.map((follower) => follower.followers);
      };

      res.status(200).json(getFollowers());
    } catch (error) {
      res.status(500).json({ error: "Failed to create tag" });
    }
  },
  createFollowAccount: async (req: Request, res: Response) => {
    const { idAccountFollowing, idAccountFollowed } = req.body;
    try {
      const createFollowAccount = new FOLLOWACCOUNT({
        following: idAccountFollowed,
        followers: idAccountFollowing,
      });
      await createFollowAccount.save();
      res.status(200).json({ message: createFollowAccount });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
  getAllFollowing: async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const getFollowing = async () => {
        const following = await FOLLOWACCOUNT.find({ following: id }).populate(
          "following"
        );
        return following.map((follower) => follower.following);
      };

      res.status(200).json(getFollowing());
    } catch (error) {
      res.status(500).json({ error: "Failed to create tag" });
    }
  },
};
module.exports = followAccountController;
