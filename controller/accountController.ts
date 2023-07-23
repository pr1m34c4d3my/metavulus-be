import { NextFunction, Request, Response } from "express";
import ACCOUNT from "../model/account";
import { redisCache } from "../configRedis";
const { timeZone, utils, responseHandler } = require("../utils");

const accountController = {
  createAccount: async (req: Request, res: Response, next: NextFunction) => {
    const { username, password, email, lastLogin, role, accountDetail } =
      req.body;
    const { fullName, mobileNumber, sex, birth, description, profilePicture } =
      accountDetail;
    try {
      if (!utils.isValidEmail(email)) {
        return res
          .status(400)
          .json(responseHandler.failed(res.statusCode, "Email Is Not Valid"));
      }

      if (!utils.validateStrongPassword(password)) {
        return res
          .status(400)
          .json(
            responseHandler.failed(
              res.statusCode,
              "Password required min 8 character"
            )
          );
      }

      if (!utils.mobileNumberIndonesia(mobileNumber)) {
        return res
          .status(400)
          .json(
            responseHandler.failed(
              res.statusCode,
              "Mobile Number is not valid"
            )
          );
      }
      const newAccount = new ACCOUNT({
        username: username,
        password: await utils.hashPassword(password),
        email: email,
        lastLogin: lastLogin,
        role: role,
        accountDetail: {
          fullName: fullName,
          mobileNumber: mobileNumber,
          sex: sex,
          birth: birth,
          description: description,
          profilePicture: profilePicture,
        },
      });
      await redisCache.delete(req.originalUrl);
      await newAccount.save();
      res.status(201).json(responseHandler.success(res.statusCode, newAccount));
    } catch (error: any) {
      res.status(500).json(responseHandler.failed(res.statusCode, error)).end();
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
      await redisCache.setAll(req.originalUrl, account)
      res.status(200).json(responseHandler.success(res.statusCode, account));
    } catch (error: any) {
      res.status(500).json(responseHandler.failed(res.statusCode, error)).end();
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
      res.status(200).json(responseHandler.success(res.statusCode, account));
    } catch (error: any) {
      res.status(500).json(responseHandler.failed(res.statusCode, error)).end();
    }
  },

  getAccountById: async (req: Request, res: Response) => {
    const { Id } = req.params;
    try {
      const account = await ACCOUNT.find({
        _id: Id,
      });
      res.status(200).json(responseHandler.success(res.statusCode, account));
    } catch (error: any) {
      res.status(500).json(responseHandler.failed(res.statusCode, error)).end();
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
        .json(responseHandler.success(res.statusCode, updateAccount));
    } catch (error: any) {
      res.status(500).json(responseHandler.failed(res.statusCode, error)).end();
    }
  },

  accountDelete: async (req: Request, res: Response) => {
    const { id } = req.body;

    try {
      await ACCOUNT.findByIdAndDelete(id);
      res.status(200).json(responseHandler.success(res.statusCode));
    } catch (error: any) {
      res.status(500).json(responseHandler.failed(res.statusCode, error)).end();
    }
  },

  login: async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
      const account = await ACCOUNT.findOne({ email: email });
      if (!account) {
        return res
          .status(404)
          .json(responseHandler.failed(res.statusCode, "Email not found"));
      }

      if (!utils.comparePassword(password, account.password)) {
        return res
          .status(401)
          .json(
            responseHandler.failed(res.statusCode, "Password is not valid")
          );
      }

      const token = utils.generateToken(account._id, account.email);

      res.status(200).json(
        responseHandler.success(res.statusCode, {
          id: account._id,
          email: account.email,
          token,
        })
      );
    } catch (error: any) {
      res.status(500).json(responseHandler.failed(res.statusCode, error)).end();
    }
  },
};
module.exports = accountController;
