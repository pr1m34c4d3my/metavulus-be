import mongoose from "mongoose";
import { timeZone } from "../utils/timezone";
const { Schema } = mongoose;

const account = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },

  lastLogin: {
    type: Date,
  },
  role: {
    type: String,
    required: true,
  },
  hubspotId: {
    type: String,
  },
  accountDetail: {
    fullName: {
      type: String,
    },
    mobileNumber: {
      type: Number,
      unique: true,
    },
    sex: {
      type: String,
    },

    birth: {
      type: Date,
    },

    description: {
      type: String,
    },

    accountInactive: {
      type: Boolean,
      default: 0,
    },
    accountLock: {
      type: Boolean,
      default: 0,
    },

    profilePicture: {
      type: String,
    },

    verificationStatus: {
      type: Boolean,
      default: 0,
    },
  },
  createdAt: {
    type: Date,
    default: timeZone(),
  },

  updatedAt: {
    type: Date,
  },
});

const ACCOUNT = mongoose.model("account", account);
export default ACCOUNT;
