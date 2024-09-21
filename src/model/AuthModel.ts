import BranchUserModel from "./BranchUserModel";

export default interface AuthModel {
    userId: number;
    username: string;
    UserOtp: string;
    Userstatus: number;
    CompanyId: number;
    access_token: string;
    refresh_token: string;
    token_expired: string;
    lang?: string,
    FirstName: string;
    LastName: string;
    userTypeId: number;
    ProfileURL: string;
    CompanyName: string;
    LAT: string;
    LNG: string;
    userBranch: BranchUserModel[];
    Menus: Array<any>;
    selectedParentMenu?: any;
    hideSubMenu: boolean;
}
