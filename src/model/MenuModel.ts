export default interface MenuModel {
    children: any[];
    menuID: number;
    menuNameLao: string;
    route: string;
    menuNameEng: string;
    icon: string;
    label: string;
    menuGroup: number;
    menuActive: number;
    FormName: string;
    imageName: string;
    OpenType: number;
    shortorder: number;
    menutype: number;
    pageurl: string;
    status: number;
    icon_url: string;
}

export const listMenuValue:MenuModel = {
    route: "",
    icon: "",
    label: "",
    FormName: "",
    OpenType: 0,
    children: [],
    icon_url: "",
    imageName: "",
    menuActive: 0,
    menuGroup: 0,
    menuID: 0,
    menuNameEng: "",
    menuNameLao: "",
    menutype: 0,
    pageurl: "",
    shortorder: 0,
    status: 0
}