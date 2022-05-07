export interface ISaleReport {
  _id?: string;
  orderNumber: number;
  completedOrder: number;
  failedOrder: number;
  productNumber: number;
  itemNumber: number;
  orderTotal: number;
  deliveryFee: number;
  revenue: number;
  // profit: number;
  day: Date;
}
