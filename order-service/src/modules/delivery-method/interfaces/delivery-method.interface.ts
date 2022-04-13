export interface IDeliveryMethod {
  _id?: string;
  name: string;
  detail: string;
  fixedFee?: number;
  isEnabled: boolean;
}
