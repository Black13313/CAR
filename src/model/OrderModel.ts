interface OrderDetail {
    id: number;
    orderNo?: string;
    itemId: number;
    itemName: string;
    itemQty: number;
    itemPrice: number;
    itemAmount: number;
}
export default interface OrderModel {
    orderNo?: string;
    userName: string;
    remark: string;
    discountAmount: number;
    createdDateTime: string;
    code: string;
    orderDate: string;
    currencyName: string;
    totalorderAmount: number;
    exchangeDate: string;
    ReferenceType: string;
    ReferenceId: string;
    TranDate: string;
    Userid: number;
    stepId: number;
    Note: string;
    branchId: number;
    customerId: number;
    userId: number;
    customerName: string;
    customerMobile: string;
    checkInTime: string;
    estCheckOut: string;
    checkOut: string;
    orderAmount: number;
    taxAmount: number;
    orderStatusName: string;
    currencyId: number;
    orderStatus: number;
    createdById: number;
    updatedById: number;
    fromDate?: string;
    toDate?: string;
    status?: number;
    pagesize?: number;
    pagenumber?: number;
    detail: OrderDetail[];

}


export const DefaultValue: OrderModel = {
    code: "",
    discountAmount: 0,
    remark: "",
    createdDateTime: "",
    userName: "",
    currencyName: "",
    orderStatusName: "",
    customerName: "",
    exchangeDate: new Date().toISOString(),
    ReferenceId: "",
    ReferenceType: "",
    TranDate: "",
    Userid: 0,
    stepId: 0,
    totalorderAmount: 0,
    Note: "",
    fromDate: new Date().toISOString(),
    pagenumber: 1,
    pagesize: 50,
    status: 1,
    toDate: new Date().toISOString(),
    branchId: 0,
    checkInTime: "",
    checkOut: "",
    createdById: 0,
    currencyId: 1,
    customerId: 0,
    customerMobile: "",
    estCheckOut: "",
    orderAmount: 0,
    orderDate: "",
    orderNo: "",
    orderStatus: 1,
    taxAmount: 0,
    updatedById: 0,
    userId: 0,
    detail: []
}
