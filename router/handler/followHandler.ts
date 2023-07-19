import express, { Router } from "express";
const {
  getAllFollowing,
  getAllFollowers,
  createFollowAccount,
} = require("../../controller/followAccountController");

const router: Router = express.Router();
router.get("/getAllFollowing/:id", getAllFollowing);
router.get("/getAllFollowers/:id", getAllFollowers);
router.post("/", createFollowAccount);

module.exports = router;
