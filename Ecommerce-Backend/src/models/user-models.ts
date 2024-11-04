import { model, Schema } from "mongoose";
import validator from "validator";

interface TUser extends Document{
    _id: string;
    name: string;
    email: string;
    photo: string;
    role:"admin" | "user"
    gender: "male" | "female";
    dob: Date;
    createdAt: Date;
    updatedAt: Date;
    age:number;
}
const userSchema = new Schema(
  {
    _id: {
      type: String,
      required: [true, "Please enter your ID"],
    },
    name: {
      type: String,
      required: [true, "Please enter your name"],
    },
    email: {
      type: String,
      required: [true, "Please enter your email"],
      unique: true,
      validator: validator.default.isEmail,
    },
    photo: {
      type: String,
      required: [true, "Please add your photo"],
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    gender: {
      type: String,
      enum: ["male", "female"],
      required: [true, "Please select your gender"],
    },
    dob: {
      type: Date,
      required: [true, "Please enter your date of birth"],
    },
  },
  {
    timestamps: true,
  }
);

userSchema.virtual("age").get(function () {
  const today = new Date();
  const dob = this.dob;
  let age = today.getFullYear() - dob.getFullYear();

  if (
    today.getMonth() < dob.getMonth() ||
    (today.getMonth() === dob.getMonth() && today.getDate() < dob.getDate())
  )
    age--;

  return age;
});

export const User = model<TUser>("User", userSchema);