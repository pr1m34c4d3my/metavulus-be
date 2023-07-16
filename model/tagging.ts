import mongoose from "mongoose";
import { timeZone } from "../utils/timezone";
const { Schema } = mongoose;

const tagging = new Schema({
  nama: {
    type: String,
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

const TAGGING = mongoose.model("tagging", tagging);
export default TAGGING;
