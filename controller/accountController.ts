import { Request, Response } from "express";
import ACCOUNT from "../model/account";
import { timeZone } from "../utils/timezone";

const accountController = {
  createAccount: async (req: Request, res: Response) => {
    const { username, password, email, lastLogin, accountDetail } = req.body;
    const { fullName, mobileNumber, sex, birth, description, profilePicture } =
      accountDetail;
    try {
      const newAccount = new ACCOUNT({
        username: username,
        password: password,
        email: email,
        lastLogin: lastLogin,
        accountDetail: {
          fullName: fullName,
          mobileNumber: mobileNumber,
          sex: sex,
          birth: birth,
          description: description,
          profilePicture: profilePicture,
        },
      });
      await newAccount.save();
      res.status(201).json({
        message: newAccount,
      });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
  getAllAccount: async (req: Request, res: Response) => {
    try {
      const account = await ACCOUNT.find();
      res.status(200).json({ message: account });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
  getAccountByUsernameOrName: async (req: Request, res: Response) => {
    const { username } = req.params;
    try {
      const account = await ACCOUNT.find({
        $or: [
          { username: { $regex: username, $options: "i" } },
          { "accountDetail.fullName": { $regex: username, $options: "i" } },
        ],
      });
      res.status(200).json({ message: account });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
  getAccountById: async (req: Request, res: Response) => {
    const { Id } = req.params;
    try {
      const account = await ACCOUNT.find({
        _id: Id,
      });
      res.status(200).json({ message: account });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
  updateAccount: async (req: Request, res: Response) => {
    const { username, password, email, lastLogin, accountDetail, id } =
      req.body;
    const { fullName, mobileNumber, sex, birth, description, profilePicture } =
      accountDetail;

    try {
      const updateAccount = {
        username: username,
        password: password,
        email: email,
        lastLogin: lastLogin,
        accountDetail: {
          fullName: fullName,
          mobileNumber: mobileNumber,
          sex: sex,
          birth: birth,
          description: description,
          profilePicture: profilePicture,
        },
        updatedAt: timeZone(),
      };
      await ACCOUNT.findByIdAndUpdate(id, updateAccount);
      res.status(200).json({
        message: updateAccount,
      });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
  accountDelete: async (req: Request, res: Response) => {
    const { id } = req.body;

    try {
      await ACCOUNT.findByIdAndDelete(id);
      res.status(200).json({
        message: "Successfully Account Delete",
      });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
};
module.exports = accountController;
