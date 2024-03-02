import mongoose from "mongoose";
import { hashPassword, verifyPassword } from "../utils/hashFunction.js";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

UserSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await hashPassword(user.password);
  }
  next();
});

UserSchema.methods.verifyPassword = async function (password) {
  const user = this;
  return await verifyPassword(password, user.password);
};

export default mongoose.model("User", UserSchema);
