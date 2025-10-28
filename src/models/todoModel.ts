import mongoose, { Schema, Document } from "mongoose";

export interface ITODO extends Document {
  name: string;
  description: string;
  deadline: Date;
  completed: boolean;
  priority: number;
}
const TODOSchema = new Schema<ITODO>(
  {
    name: { type: String, required: true },
    description: { type: String, required: false },
    deadline: { type: Date, required: false },
    completed: { type: Boolean, default: false },
    priority: {type: Number, default: 1}
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<ITODO>("TODO", TODOSchema);
