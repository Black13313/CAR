<script setup lang="ts">
import Panel from "@/components/Layout/Panel.vue";
import {onMounted, ref} from 'vue';
import DataService from "@/service/DataService";
import ActionItemsModel from "@/model/ActionItemsModel";
import {message} from "ant-design-vue";
import {useRouter} from "vue-router";
import http from "@/service/http";
import UserService from "@/service/UserService";
import MenuModel from "@/model/MenuModel";

const routes = useRouter();
const activeKey = ref('1');
const checkedAction = ref<number[]>([]);
const checkedMenu = ref<number[]>([]);
const Action = ref<ActionItemsModel[]>([]);
const menuallow = ref<MenuModel[]>([]);
const initialCheckedAction = ref<number[]>([]);
const roleId = routes.currentRoute.value.params.id;
const roleName = routes.currentRoute.value.params.name;


onMounted(async () => {
  await GetlistAction()
  await getUserActionSub()
  await getMenuItemwithChild()
  await getUserMenuSub()
})

const GetlistAction = async () => {
  try {
    Action.value = await DataService.getAction()
  } catch (error) {
    throw new Error('Failed to fetch Customer All ');
  }
}

const getMenuItemwithChild = async () => {
  try {
    menuallow.value = await UserService.getMenuItemwithChild()
  } catch (error) {
    throw new Error('Failed to fetch Customer All ');
  }
}

const getUserActionSub = async () => {
  try {
    const RoleAction = await UserService.AllowActionsbyRoleAsync(Number(roleId));
    console.log(RoleAction);
    if (RoleAction.length > 0) {
      checkedAction.value = RoleAction
          .filter((action: any) => action.allowed)
          .map((action: any) => action.action_item_id);
      console.log(checkedAction.value);
    }
  } catch (error) {
    checkedAction.value = [];
  }
};

const getUserMenuSub = async () => {
  try {
    const RoleMenu = await UserService.getMenuItemwithChild(Number(roleId));
    if (RoleMenu.length > 0) {
      checkedMenu.value = RoleMenu.map((m: any) => m.menuID);
    }
  } catch (error) {
    checkedMenu.value = []
  }
};

const SaveActionSubordinate = async () => {
  try {
    const actionPayload = Action.value.map((action) => {
      return {
        role_id: Number(roleId),
        action_item_id: action.id,
        allowed: checkedAction.value.includes(Number(action.id))
      };
    });
    console.log(actionPayload);
    await http.post(`/UserRole/insertAllowRoleActionList/${roleId}`, actionPayload);
    message.success('Actions saved successfully');
  } catch (error) {
    message.error('Failed to save actions');
    console.error(error);
  }
};

const SaveMenuSubordinate = async () => {
  try {
    const MenuPayload = menuallow.value.map((menu) => {
      return {
        role_id: Number(roleId),
        menu_item_id: menu.menuID,
        allowed: checkedMenu.value.includes(menu.menuID)
      };
    });
    console.log(MenuPayload);
    await http.post(`/UserRole/insertAllowMenuRoleList/${roleId}`, MenuPayload);
    message.success('Menu saved successfully');
  } catch (error) {
    message.error('Failed to save actions');
    console.error(error);
  }
};


</script>

<template>
  <div>
    <Panel>
      <div>
        <h1 class="text-xl font-semibold px-4 py-3 ">
          {{roleName}}
        </h1>
      </div>
    </Panel>
    <Panel class="px-4 py-3 mt-6">
      <a-tabs v-model:activeKey="activeKey" type="card">
        <a-tab-pane key="1" tab="ActionItem">
          <a-checkbox-group
              v-model:value="checkedAction">
            <div class="grid grid-cols-1 gap-2">
              <div v-for="a in Action"
                   :key="a.id">
                <a-checkbox
                    :value="a.id">{{ a.action_Description }} | {{ a.class_name }}
                </a-checkbox>
              </div>
            </div>
          </a-checkbox-group>
          <a-form class="flex justify-end mt-6">
            <a-form-item>
              <a-button size="large" type="primary" @click="SaveActionSubordinate">ບັນທຶກ</a-button>
            </a-form-item>
            <a-form-item>
              <a-button size="large" class="ml-2" @click="routes.push('/Roles')">ຍ້ອນກັບ</a-button>
            </a-form-item>
          </a-form>
        </a-tab-pane>
        <a-tab-pane key="2" tab="Menu">
          <a-checkbox-group
              v-model:value="checkedMenu">
            <div class="grid grid-cols-1 gap-2">
              <div v-for="m in menuallow"
                   :key="m.menuID">
                <a-checkbox
                    :value="m.menuID">{{ m.menuNameLao || m.menuNameEng }}
                </a-checkbox>
              </div>
            </div>
          </a-checkbox-group>
          <a-form class="flex justify-end mt-6">
            <a-form-item>
              <a-button size="large" type="primary" @click="SaveMenuSubordinate">ບັນທຶກ</a-button>
            </a-form-item>
            <a-form-item>
              <a-button size="large" class="ml-2" @click="routes.push('/Roles')">ຍ້ອນກັບ</a-button>
            </a-form-item>
          </a-form>
        </a-tab-pane>
      </a-tabs>
    </Panel>
  </div>
</template>

<style scoped>

</style>