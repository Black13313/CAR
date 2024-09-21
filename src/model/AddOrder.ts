export default interface AddOrderModel {
  orderNo?: string;
  orderDate?: Date;
  branchId?: number;
  customerId?: number;
  userId?: number;
  customerMobile: string;
  checkInTime?: Date;
  estCheckOut?: Date;
  checkOut?: Date;
  orderAmount: number;
  taxAmount?: number;
  currencyId?: number;
  orderStatus?: number;
  createdById?: number;
  createdDateTime?: Date;
  updatedById?: number;
  updatedDateTime?: Date;
  detail? : []
}

export const AddOrderValue : AddOrderModel = {

  customerId : 0,
  userId : 0,
  customerMobile : '',
  orderAmount : 0

}
