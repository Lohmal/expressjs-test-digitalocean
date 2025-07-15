import mongoose, { Schema, Document } from "mongoose";
import { IForm } from "../interfaces/IForm";

interface IFormDocument extends Document {
  name: string;
  email: string;
  message: string;
}

const formSchema = new Schema<IFormDocument>(
  {
    name: {
      type: String,
      required: [true, "İsim alanı zorunludur"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email alanı zorunludur"],
      trim: true,
      lowercase: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Geçerli bir email adresi girin"],
    },
    message: {
      type: String,
      required: [true, "Mesaj alanı zorunludur"],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Form = mongoose.model<IFormDocument>("Form", formSchema);

export default Form;
