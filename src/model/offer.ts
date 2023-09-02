import { ICompany } from './company';
import { IQuestion } from './question';

export interface IOffer {
  _id: string;
  name: string;
  salary: number;
  equity: number;
  bonus: number;
  company: ICompany;
  culture: string;
  learning: string;
  opportunities: string;
  healthcare: string;

  questions?: IQuestion[];
}
