import { Request, Response } from "express";
import ACCOUNT from "../model/account";
import { timeZone } from "../utils/timezone";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const accountController = {
  checkUserExist: async (email: string) => {
    try {
      const account = await ACCOUNT.find({ email: email });
      if (account) {
        return true;
      }
      return false;
    } catch (error) {
      console.log(error);
    }
  },
  createAccount: async (req: Request, res: Response) => {
    const { username, password, email, lastLogin, accountDetail } = req.body;
    const { fullName, mobileNumber, sex, birth, description, profilePicture } =
      accountDetail;
    try {
      const isExist = await accountController.checkUserExist(email);
      if (isExist) {
        return res.status(400).json({ message: "Email Already Used" });
      }
      bcrypt.hash(password, 10, async (err: any, hash: any) => {
        if (err) {
          return res.status(500).json({ message: "Internal Server Error" });
        }

        const newAccount = new ACCOUNT({
          username: username,
          password: hash,
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
      });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  getAllAccount: async (req: Request, res: Response) => {
    try {
      const account = await ACCOUNT.find({
        $where: `isDeleted ===${0}`,
      });
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

  login: async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
      const account = await ACCOUNT.findOne({ email: email });
      if (!account) {
        return res
          .status(404)
          .json({ message: "Authentication failed. User not found." });
      }
      bcrypt.compare(password, account.password, (err: any, result: any) => {
        if (err || !result) {
          return res.status(401).json({
            message: "Authentication failed. Invalid email or password.",
          });
        }

        const token = jwt.sign(
          { id: account._id, email: account.email },
          process.env.SECRETKEYS,
          {
            expiresIn: "1h",
          }
        );
        const decodedToken = jwt.decode(token); // Decoding the token to access the payload
        const expiresIn = Math.floor(
          (decodedToken.exp - Date.now() / 1000) / 3600
        );

        res.json({
          id: account._id,
          email: account.email,
          token,
          expiresIn: expiresIn,
        });
      });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
};
module.exports = accountController;
