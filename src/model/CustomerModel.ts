export default interface CustomerModel {
    id?: number;
    custName?: string;
    custNameEng?: string;
    account_number?: string;
    custAddress?: string;
    custMobile?: string;
    othercontact?: string;
    custSocial?: string;
    pagesize?: number;
    searchtext?: string;
    pagenumber?: number;
    custLevel?: number;
}

export const listCustomerValue:CustomerModel = {
    pagenumber: 1,
    pagesize: 50,
    searchtext: "",
    account_number: "",
    custAddress: "",
    custLevel: 0,
    custMobile: "",
    custName: "",
    custNameEng: "",
    custSocial: "",
    othercontact: ""
}