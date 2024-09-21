export default interface CompanyModel {
    comID: number;
    comName: string;
    comAddress: string;
    comTel: string;
    comFax: string;
    comEmail: string;
    comDescription1: string;
    comDescription2: string;
    comLogo: string;
    comStatus: number;
}


export const DefaultValue: CompanyModel = {
    comAddress: "",
    comDescription1: "",
    comDescription2: "",
    comEmail: "",
    comFax: "",
    comID: 0,
    comLogo: "",
    comName: "",
    comStatus: 0,
    comTel: ""
}
