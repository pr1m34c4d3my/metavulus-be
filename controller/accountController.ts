import { Request, Response } from "express";
import ACCOUNT from "../model/account";
const { timeZone, utils, responseHandler } = require("../utils");

const accountController = {
  checkUserExist: async (email: string) => {
    try {
      const account = await ACCOUNT.find({ email: email });
      if (account.length === 0) {
        return false;
      }
      return true;
    } catch (error) {
      console.log(error);
    }
  },
  
  createAccount: async (req: Request, res: Response) => {
    const { username, password, email, lastLogin, accountDetail } = req.body;
    const { fullName, mobileNumber, sex, birth, description, profilePicture } =
      accountDetail;
    try {
      if (!utils.isValidEmail(email)) {
        return res.status(400).json(
          responseHandler.failed("Validation Failed", res.statusCode, {
            email: "Email Is Not Valid",
          })
        );
      }

      if (!utils.validateStrongPassword(password)) {
        return res.status(400).json(
          responseHandler.failed("Validation Failed", res.statusCode, {
            password: "Password required min 8 character",
          })
        );
      }

      if (!utils.mobileNumberIndonesia(mobileNumber)) {
        return res.status(400).json(
          responseHandler.failed("Validation failed", res.statusCode, {
            mobileNumber: "Mobile Number is not valid in indonesia",
          })
        );
      }

      const isExist = await accountController.checkUserExist(email);
      if (isExist) {
        return res.status(400).json(
          responseHandler.failed("Validation Failed", res.statusCode, {
            email: "Email Already Used",
          })
        );
      }

      const newAccount = new ACCOUNT({
        username: username,
        password: await utils.hashPassword(password),
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
      res
        .status(201)
        .json(
          responseHandler.success(
            "Succesfully Create Account",
            res.statusCode,
            newAccount
          )
        );
    } catch (error: any) {
      res
        .status(500)
        .json(responseHandler.failed(error.message, res.statusCode, error))
        .end();
    }
  },

  getAllAccount: async (req: Request, res: Response) => {
    try {
      const account = await ACCOUNT.find().select({
        password: 0,
        createdAt: 0,
        __v: 0,
        "accountDetail.description": 0,
        "accountDetail.accountInactive": 0,
        "accountDetail.accountLock": 0,
        "accountDetail.verificationStatus": 0,
      });
      res
        .status(200)
        .json(
          responseHandler.success("Succesfully fetch", res.statusCode, account)
        );
    } catch (error: any) {
      res
        .status(500)
        .json(responseHandler.failed(error.message, res.statusCode, error))
        .end();
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
      res
        .status(200)
        .json(
          responseHandler.success("Succesfully fetch", res.statusCode, account)
        );
    } catch (error: any) {
      res
        .status(500)
        .json(responseHandler.failed(error.message, res.statusCode, error))
        .end();
    }
  },

  getAccountById: async (req: Request, res: Response) => {
    const { Id } = req.params;
    try {
      const account = await ACCOUNT.find({
        _id: Id,
      });
      res
        .status(200)
        .json(
          responseHandler.success("Succesfully fetch", res.statusCode, account)
        );
    } catch (error: any) {
      res
        .status(500)
        .json(responseHandler.failed(error.message, res.statusCode, error))
        .end();
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
      res
        .status(200)
        .json(
          responseHandler.success("Succesfully update", res.statusCode, updateAccount)
        );
    } catch (error: any) {
      res
        .status(500)
        .json(responseHandler.failed(error.message, res.statusCode, error))
        .end();
    }
  },

  accountDelete: async (req: Request, res: Response) => {
    const { id } = req.body;

    try {
      await ACCOUNT.findByIdAndDelete(id);
      res
      .status(200)
      .json(
        responseHandler.success("Succesfully Delete Account", res.statusCode)
      );
    } catch (error: any) {
      res
        .status(500)
        .json(responseHandler.failed(error.message, res.statusCode, error))
        .end();
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

      if (!utils.comparePassword(password, account.password)) {
        return res.status(401).json(
          responseHandler.failed("Authentication Failed", res.statusCode, {
            password: "Password is not valid",
          })
        );
      }

      const token = utils.generateToken(account._id, account.email);

      res.status(200).json(
        responseHandler.success("Succesfully login", res.statusCode, {
          id: account._id,
          email: account.email,
          token,
        })
      );
    } catch (error: any) {
      res
        .status(500)
        .json(responseHandler.failed(error.message, res.statusCode, error))
        .end();
    }
  },
};
module.exports = accountController;
