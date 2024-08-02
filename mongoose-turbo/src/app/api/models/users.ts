import mongoose, { Document, Model, Schema } from "mongoose";

export interface IUser extends Document {
  firstName?: string;
  lastName?: string;
  fullName?: string;
  userService: string;
  email: string;
  username: string;
  password: string;
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
  status?: string;
  role: string[];
  matchPassword(enteredPassword: string): Promise<boolean>;
}
console.log('user initiated')
const userSchema = new Schema<IUser>(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    fullName: {
      type: String,
    },
    userService: {
      type: String,
      required: true,
      default: "Local",
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    resetPasswordToken: {
      type: String,
    },
    resetPasswordExpires: {
      type: Date,
    },
    status: {
      type: String,
    },
    role: [{ type: String }],
  },
  {
    timestamps: true,
  }
);



const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>("User", userSchema, "user");

export default User;
