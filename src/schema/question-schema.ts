import { IQuestion } from '@/model/question';
import mongoose, { Schema, model, InferSchemaType } from 'mongoose';

const questionSchema = new Schema<IQuestion>({
  name: { type: String, required: true },
  doubt: { type: String, required: true },
});

type Question = InferSchemaType<typeof questionSchema>;

export default mongoose.models.Question ||
  model<Question>('Question', questionSchema);
