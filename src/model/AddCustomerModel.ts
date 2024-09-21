export default interface AddCustomerModel {
  id?: number;
  custName: string;
  custNameEng: string;
  account_number: string;
  custAddress: string;
  custMobile: string;
  othercontact?: string;
  custSocial?: string;
  custLevel?: number;
}

export const CustomerValue: AddCustomerModel = {
  custName: "",
  custNameEng: "",
  account_number: "",
  custAddress: "",
  custMobile: "",
};
