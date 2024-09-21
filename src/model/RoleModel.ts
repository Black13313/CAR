export default interface RoleModel {
    id: number,
    code: string,
    description: string,
    AllowedRoleActions: []
}

export const RoleModelValue: RoleModel = {
    id: 0,
    AllowedRoleActions: [],
    code: "",
    description: ""
}