export default interface UserFromModel {
    UserID?: number;
    UserName: string;
    UserPassword: string;
    UserFirstName: string;
    UserLastName: string;
    userType: number;
    companyId: number;
    userTypeName: string;
    mail: string;
    sex: string;
    phone: string;
    user_otp: string;
    MachineCode: string;
    userstatus: number;
    lang: string;
    roleid: number;
    roleName: string;
    createdById: number;
    dateofbirth?: string;
    connectionid: string;
    lat: number;
    lng: number;
}


export const DefaultValue: UserFromModel = {
    MachineCode: "",
    UserFirstName: "",
    UserLastName: "",
    UserName: "",
    UserPassword: "",
    companyId: 0,
    connectionid: "",
    createdById: 0,
    dateofbirth: "",
    lang: "",
    lat: 0,
    lng: 0,
    mail: "",
    phone: "",
    roleName: "",
    roleid: 0,
    sex: "",
    userType: 1,
    userTypeName: "",
    user_otp: "",
    userstatus: 1
}
