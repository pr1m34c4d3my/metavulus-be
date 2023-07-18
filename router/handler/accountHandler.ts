import express, { Router } from "express";
const {
  createAccount,
  getAllAccount,
  getAccountByUsernameOrName,
  getAccountById,
  updateAccount,
  accountDelete,
} = require("../../controller/accountController");

const router: Router = express.Router();
router.get("/", getAllAccount);
router.post("/", createAccount);
router.get("/getAccountByUsernameOrName/:username", getAccountByUsernameOrName);
router.get("/getAccountById/:Id", getAccountById);
router.patch("/", updateAccount);
router.delete("/", accountDelete);
module.exports = router;
