import http from "./http";
import ResponseData from "../model/ResponseData";
import OrderModel from "../model/OrderModel";
import OrderPayModel from "../model/OrderPayModel";


class OrderService {
    async AddOrder(formState: OrderModel): Promise<any> {
        return await http.post(`/Order/Add`, formState).then((res: ResponseData) => res);
    }
    async getOrderList(formState: OrderModel): Promise<any> {
        return await http.post(`/Order/listOrderPaging`, formState).then((res: ResponseData) => res.data?.Model);
    }
    async getOrderEstimateTime(): Promise<any> {
        return await http.post(`/Order/EstimateTime`).then((res: ResponseData) => res.data?.Model);
    }
    async PayOrders(formState: OrderPayModel): Promise<any> {
        return await http.post(`/Order/payOrder`,formState).then((res: ResponseData) => res.data?.Model);
    }
    async CancelOrders(formState: OrderModel, remark: string): Promise<any> {
        return await http.post(`/Order/cancelOrder/${remark}`,formState).then((res: ResponseData) => res.data?.Model);
    }
}

export default new OrderService();
