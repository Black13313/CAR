export default interface ActionItemsModel {
    id?: number,
    class_name: string,
    method_name: string,
    action_Description: string
    action_item_id: number;
    actionName: string;
    role_id: number;
    roleName: string;
    allowed: boolean;
}

export const ActionItemsValue: ActionItemsModel = {
    actionName: "",
    action_item_id: 0,
    allowed: false,
    roleName: "",
    role_id: 0,
    method_name: "",
    action_Description: "",
    class_name: ""
};
