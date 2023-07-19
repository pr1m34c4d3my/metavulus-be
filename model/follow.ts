import mongoose from "mongoose";
import { timeZone } from "../utils/timezone";
const { Schema } = mongoose;

const followAccount = new Schema({
  following: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'account',
    required: true,
  },
  followers: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'account',
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: timeZone(),
  },
  updatedAt: {
    type: Date,
  },
});

const FOLLOWACCOUNT = mongoose.model("followAccount", followAccount);
export default FOLLOWACCOUNT;
