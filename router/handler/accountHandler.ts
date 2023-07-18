import express, { Router } from "express";
const {
  createAccount,
  getAllAccount,
} = require("../../controller/accountController");

const router: Router = express.Router();
router.get("/", getAllAccount);
router.post("/", createAccount);

module.exports = router;
