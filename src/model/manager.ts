import { ICompany } from './company';
import { IOffer } from './offer';

export interface IManager {
  _id: string;
  name: string;
  own_company: ICompany;
  offers: IOffer[];
}
