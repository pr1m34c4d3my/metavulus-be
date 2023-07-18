import mongoose from "mongoose";
import { timeZone } from "../utils/timezone";
const { Schema } = mongoose;

const comment = new Schema({
  idPost: {
    type: String,
    required: true,
  },
  idAccount: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "account",
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  isDeleted: {
    type: Boolean,
    default: 0,
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

const COMMENT = mongoose.model("comment", comment);
export default COMMENT;
