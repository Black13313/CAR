export default interface BankModel {
    id: number;
    articleId: number;
    bankName: string;
    bankAccountName: string;
    bankAccountNo: string;
    Status: number;
}

export const defaultValue:BankModel = {
    id: 0,
    Status: 0,
    articleId: 0,
    bankAccountName: "",
    bankAccountNo: "",
    bankName: ""
}