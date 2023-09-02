import { ICompany } from '@/model/company';
import { Schema } from 'mongoose';

export const companySchema = new Schema<ICompany>({
  name: String,
  role: String,
  organization: String,
  number_employers: Number,
});
