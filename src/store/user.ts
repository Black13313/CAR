import { defineStore } from 'pinia';
import {h, reactive} from "vue";
import AuthModel from "../model/AuthModel";
import UserMenuModel from "../model/UserMenuModel";
import {
  ControlOutlined,
  FileAddOutlined,
  UsergroupAddOutlined,
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
  LockOutlined,
  UserDeleteOutlined,
} from "@ant-design/icons-vue";
import BranchUserModel from "../model/BranchUserModel";
const menuIcons: any = {
  'Security': h(SettingOutlined),
  'Customers': h(UsergroupAddOutlined),
  'Log Off': h(LogoutOutlined),
  'Change Password': h(LockOutlined),
  'Orders': h(FileAddOutlined),
  'Roles': h(ControlOutlined),
  'Users Management': h(UserOutlined),
  'Manage Online Account': h(UserDeleteOutlined),
  'Settings': h(SettingOutlined),
};
export const userStore = defineStore('user', {
  state: () => reactive<AuthModel>({
    userId: 0,
    username: '',
    UserOtp: '',
    Userstatus: 0,
    CompanyId: 0,
    access_token: '',
    refresh_token: '',
    token_expired: '',
    FirstName: '',
    LastName: '',
    userTypeId: 0,
    ProfileURL: '',
    CompanyName: '',
    LAT: '',
    LNG: '',
    userBranch: <BranchUserModel[]>[],
    Menus: [],
    selectedParentMenu: undefined,
    hideSubMenu: false
  }),
  actions: {
    setUserData(data: any) {
      Object.assign(this.$state, data);
    },
    clearUserData() {
      this.userId = 0;
      this.username = '';
      this.UserOtp = '';
      this.Userstatus = 0;
      this.CompanyId = 0;
      this.access_token = '';
      this.refresh_token = '';
      this.token_expired = '';
      this.FirstName = '';
      this.LastName = '';
      this.userTypeId = 0;
      this.ProfileURL = '';
      this.CompanyName = '';
      this.LAT = '';
      this.LNG = '';
      this.userBranch = [];
      this.Menus = [];
      this.selectedParentMenu = undefined;
      this.hideSubMenu = false;
    },

    isAuthenticated() {
      return !!this.access_token;
    },
    getUserMenu(isParent: boolean = false, parentId?: number) {
      let menus: UserMenuModel[] = (this.Menus && this.Menus.length > 0) ? [...this.Menus] : [];

      if (isParent) menus = (this.Menus && this.Menus.length > 0) ? [...this.Menus] : [];

      if (!isParent && !parentId) return [];

      // get sub menu
      if (parentId) {
        const subMenu = this.Menus?.filter((m: UserMenuModel) => m.menuID === parentId);
        if (subMenu && subMenu.length > 0 && subMenu[0].children) {
          menus = subMenu[0].children || [];
        } else {
          menus = [];
        }
      }

      if (!menus || menus.length <= 0) return [{}];

      return menus.map((m: UserMenuModel) => {
        // add sub menu
        const children = m.children?.map((i: UserMenuModel) => {
          return {
            key: i.menuID,
            icon: '',
            label: this.lang === 'lo' ? i.menuNameLao : i.menuNameEng,
            title: this.lang === 'lo' ? i.menuNameLao : i.menuNameEng,
            route: i.pageurl,
            parent: m.menuID
          };
        }) || [];

        // add main menu
        return {
          key: m.menuID,
          icon: menuIcons[m.menuNameEng],
          label: this.lang === 'lo' ? m.menuNameLao : m.menuNameEng,
          title: this.lang === 'lo' ? m.menuNameLao : m.menuNameEng,
          route: m.pageurl,
          children,
        };
      });
    },
  },
  persist: {
    storage: localStorage
  }
});
