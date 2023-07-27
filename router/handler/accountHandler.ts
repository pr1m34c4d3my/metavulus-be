import express, { Router } from "express";
const {
  createAccount,
  getAllAccount,
  getAccountByUsernameOrName,
  getAccountById,
  updateAccount,
  accountDelete,
  login,
  validateUsername,
  validateEmail,
} = require("../../controller/accountController");
import { redisMiddleware } from "../../middleware/redisMiddleware";

const router: Router = express.Router();
router.get("/", getAllAccount);
router.post("/", createAccount);
router.get("/getAccountByUsernameOrName/:username", getAccountByUsernameOrName);
router.get("/validateUser/:username", validateUsername);
router.get("/validateEmail/:email", validateEmail);
router.get("/getAccountById/:Id", getAccountById);
router.patch("/", updateAccount);
router.delete("/", accountDelete);
router.post("/login", login);
module.exports = router;
