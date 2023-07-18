import { Request, Response } from "express";
import ACCOUNT from "../model/account";

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
};
module.exports = accountController;
