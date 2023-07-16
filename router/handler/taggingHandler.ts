import express, { Router } from "express";
const { createTagging } = require("../../controller/taggingController");

const router: Router = express.Router();
router.get("/")
router.post("/", createTagging);

module.exports = router;
