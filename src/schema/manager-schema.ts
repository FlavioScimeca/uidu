import { IManager } from '@/model/manager';
import mongoose, { Schema, model, InferSchemaType } from 'mongoose';
import offerSchema from './offer-schema';
import { companySchema } from './company-schema';

const managerSchema = new Schema<IManager>({
  name: { type: String, required: true, unique: true },
  own_company: companySchema,
  offers: [{ type: mongoose.Schema.Types.ObjectId, ref: offerSchema }],
});

type Manager = InferSchemaType<typeof managerSchema>;

export default mongoose.models.Manager ||
  model<Manager>('Manager', managerSchema);
