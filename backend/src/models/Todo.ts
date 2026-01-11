import mongoose, { Document, Schema } from "mongoose";

export interface Itodo extends Document {
  title: string;
  completed: boolean;
}


const todoSchema = new Schema<Itodo>({
  title: { type: String, required: true },
  completed: { type: Boolean, default: false },
});

const Todo = mongoose.model<Itodo>("Todo", todoSchema);

export default Todo;
