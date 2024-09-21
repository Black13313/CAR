import http from "./http";
import ResponseData from "../model/ResponseData";
import UserModel from "../model/UserModel";
import RoleModel from "../model/RoleModel";
import UserFromModel from "../model/UserFromModel";
import BranchUserModel from "../model/BranchUserModel";
import CustomerModel from "../model/CustomerModel";

class UserService {
    async UserLogin(formState: UserModel): Promise<any> {
        return await http.post(`/Users/UserLogin`, formState).then((res: ResponseData) => res);
    }

    async getlistUser(): Promise<any> {
        return await http.post(`/Users/listusers`).then((res: ResponseData) => res);
    }

    async getRole(): Promise<any> {
        return await http.get(`/UserRole/listRolesAsync`).then((res: ResponseData) => res.data?.Model)
    }
    async getCustomer(payload: CustomerModel): Promise<any> {
        return await http.post(`/Customer/getCustomer`, payload).then((res: ResponseData) => res.data?.Model)
    }
    async getUserBranch(userid: number): Promise<[]> {
        return await http.post(`/Users/GetUserBranch/${userid}`).then((res: ResponseData) => res.data?.Model);
    }

    async AllowActionsbyRoleAsync(roleid: number): Promise<[]> {
        return await http.get(`/UserRole/getRolesWithCollectionByIdAsync/${roleid}`).then((res: ResponseData) => res.data?.Model.AllowedRoleActions
        );
    }

    async getMenuItemwithChild(roleid: number = 0): Promise<[]> {
        return await http.get(`/UserRole/getMenuItemwithChild/${roleid}`).then((res: ResponseData) => res.data?.Model
        );
    }

    async getRoleById(roleid: number): Promise<any> {
        return await http.get(`/UserRole/getRolesById/${roleid}`).then((res: ResponseData) => res)
    }

    async getUserById(userid: number): Promise<any> {
        return await http.post(`/Users/GetUserById/${userid}`).then((res: ResponseData) => res)
    }

    async addRole(role: RoleModel): Promise<any> {
        return await http.post(`/UserRole/addRole`, role).then((res: ResponseData) => res)
    }

    async AddUserBranch(userid: number, branch: BranchUserModel): Promise<any> {
        return await http.post(`/Users/AddUserBranch/${userid}`, branch).then((res: ResponseData) => res)
    }

    async updateRole(role: RoleModel, roleid: number): Promise<any> {
        return await http.post(`/UserRole/updateRole/${roleid}`, role).then((res: ResponseData) => res)
    }

    async UpdateUser(user: UserFromModel, userid: number): Promise<any> {
        return await http.post(`/Users/UpdateUser`, user).then((res: ResponseData) => res)
    }

    async AddUser(user: UserFromModel): Promise<any> {
        return await http.post(`/Users/AddUser`, user).then((res: ResponseData) => res)
    }

    async AddCustomer(cu: CustomerModel): Promise<any> {
        return await http.post(`/Customer/Add`, cu).then((res: ResponseData) => res)
    }

    async UpdateCustomer(cu: CustomerModel): Promise<any> {
        return await http.post(`/Customer/Update`, cu).then((res: ResponseData) => res)
    }

    async DeleteRole(roleid: number): Promise<any> {
        return await http.post(`/UserRole/deleteRole/${roleid}`).then((res: ResponseData) => res)
    }

    async DeleteCustomer(custid: number): Promise<any> {
        return await http.post(`/Customer/Delete/${custid}`).then((res: ResponseData) => res)
    }

    async DeleteUser(userid: number): Promise<any> {
        return await http.post(`/Users/DeleteUser/${userid}`).then((res: ResponseData) => res)
    }
}

export default new UserService();
