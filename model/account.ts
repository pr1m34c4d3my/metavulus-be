import mongoose from "mongoose";
import { timeZone } from "../utils/timezone";
const { Schema } = mongoose;

const account = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },

  lastLogin: {
    type: Date,
  },
  accountDetail: {
    fullName: {
      type: String,
    },
    mobileNumber: {
      type: Number,
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
