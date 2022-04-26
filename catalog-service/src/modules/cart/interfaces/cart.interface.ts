import { ObjectId } from 'mongoose';
export interface ICart {
  id?: string | ObjectId;
  items: any[]; // json string
  subTotal: number;
}
