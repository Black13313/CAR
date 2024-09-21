import ResponseData from "../model/ResponseData";
import http from "./http";
import ExchangeModel from "../model/ExchangeModel";
import getOrderByID from "../model/getOrderStepbyID.model";

class DataService {

    async getProvince(): Promise<any> {
        return await http.get(`/StandardData/getProvince`).then((res: ResponseData) => res.data?.Model);
    }

    async getCompany(): Promise<any> {
        return await http.get(`/StandardData/getCompany`).then((res: ResponseData) => res.data?.Model);
    }

    async getDistrict(provinceId?: number): Promise<any> {
        return await http.get(`/StandardData/getDistrict/${provinceId}`).then((res: ResponseData) => res.data?.Model);
    }

    async getBranchCompany(companyid?: number): Promise<any> {
        return await http.get(`/StandardData/getBranchBycompany/${companyid}`).then((res: ResponseData) => res.data?.Model);
    }

    async getAction(): Promise<any> {
        return await http.get(`/UserRole/getActionItemsAsync`).then((res: ResponseData) => res.data?.Model);
    }

    async getExchangeRate(form: ExchangeModel): Promise<any> {
        return await http.post(`/StandardData/getExchangeRate`, form).then((res: ResponseData) => res.data?.Model);
    }

    async getCurreny(): Promise<any> {
        return await http.get(`/StandardData/getCurrency`).then((res: ResponseData) => res.data?.Model);
    }

    async AddExchangeRate(from: ExchangeModel): Promise<any> {
        return await http.post(`/StandardData/AddExchangeRate`, from).then((res: ResponseData) => res.data?.Model);
    }

    async getAllItems(): Promise<any> {
        return await http.get(`/StandardData/getAllItems`).then((res: ResponseData) => res.data?.Model);
    }

    async getOrderStep(orderId: string): Promise<any> {
        return await http.post(`/Order/getOrderStep/${orderId}`).then((res: ResponseData) => res.data?.Model);
    }

    async getApproveOrderStep(fromSate: getOrderByID): Promise<any> {
        return await http.post(`/Order/approveOrderStep`, fromSate).then((res: ResponseData) => res.data?.Model);
    }

    async getOrderById(orderId: string): Promise<any> {
        return await http.post(`/Order/getOrder/${orderId}`).then((res: ResponseData) => res.data?.Model);
    }

    async getVillage(districtId?: number): Promise<any> {
        return await http.get(`/StandardData/getVillage/${districtId}`).then((res: ResponseData) => res.data?.Model);
    }

    async getPaymentType(): Promise<any> {
        return await http.post(`/StandardData/getPaymentType`).then((res: ResponseData) => res.data?.Model);
    }
    async getSex(): Promise<any> {
        return [
            {sex: 'M', name: 'ຊາຍ'},
            {sex: 'S', name: 'ຍິງ'},
        ];
    }
    async getStatus(): Promise<any> {
        return [
            {value: '1', name: 'ສຳເລັດ'},
            {value: '2', name: 'ລໍ່ຖ້າ'},
            {value: '5', name: 'ຍົກເລີກ'},
        ];
    }
}

export default new DataService();
