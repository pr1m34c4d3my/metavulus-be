import mongoose from "mongoose";
import { timeZone } from "../utils/timezone";
const { Schema } = mongoose;

const post = new Schema({
  idAccount: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "account",
    required: true,
  },
  post: {
    type: String,
    required: true,
  },
  idImage: {
    type: String,
  },

  idTag: {
    type: String,
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

const POST = mongoose.model("post", post);
export default POST;
