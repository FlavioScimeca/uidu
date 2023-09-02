import { IOffer } from '@/model/offer';
import mongoose, { Schema, model, InferSchemaType } from 'mongoose';
import questionSchema from './question-schema';
import { companySchema } from './company-schema';

const offerSchema = new Schema<IOffer>(
  {
    name: { type: String, required: true },
    company: companySchema,
    salary: { type: Number, required: true },
    equity: { type: Number, required: true },
    bonus: { type: Number, required: true },

    culture: { type: String, required: true },
    learning: { type: String, required: true },
    opportunities: { type: String, required: true },
    healthcare: { type: String, required: true },

    questions: [{ type: mongoose.Schema.Types.ObjectId, ref: questionSchema }],
  },
  {
    timestamps: true,
  }
);

type Offer = InferSchemaType<typeof offerSchema>;

export default mongoose.models.Offer || model<Offer>('Offer', offerSchema);
