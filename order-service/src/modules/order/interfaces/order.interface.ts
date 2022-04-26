export interface IOrder {
  _id?: string;
  id?: string;
  code: string;
  status: string;
  orderTotal: number;
  itemTotal: number;
  deliveryFee: number;
  deliveryStatus: string;
  deliveryMethodId: string;
  paymentStatus: string;
  paymentMethodId: string;
  customerInfo: Record<string, any>;
  userId?: string;
}
