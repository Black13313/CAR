<script setup lang="ts">
import Panel from "@/components/Layout/Panel.vue";
import RoleSelect from "@/components/RoleSelect.vue";
import routes from "@/router";
import {onMounted, reactive, ref, UnwrapRef, watch} from "vue";
import UserFromModel, {DefaultValue} from "@/model/UserFromModel";
import {message, SelectProps} from "ant-design-vue";
import {formatDate, hashPassword, showLoading} from "@/util/helper";
import {userStore} from "@/store/user";
import CompanySelect from "@/components/CompanySelect.vue";
import dayjs from "dayjs";
import {useRoute} from "vue-router";
import UserService from "@/service/UserService";
import DataService from "@/service/DataService";
import BranchModel from "@/model/BranchModel";
import router from "@/router";
import http from "@/service/http";

const initialCheckedBranch = ref<number[]>([]);

const activeKey = ref('1');
const userId = ref<number | null>(null);
const formState = reactive<UserFromModel>(DefaultValue) as UnwrapRef<UserFromModel>
const confirmPassword = ref<string>('');
const user = userStore()
const route = useRoute()
const checkedBranch = ref<number[]>([]);
const branchList = ref<BranchModel[]>([]);
const Iduser = route.params.id
onMounted(async () => {
  userId.value = Number(route.params.id);
  if (userId.value) {
    try {
      const response = await UserService.getUserById(userId.value);
      if (response.status === 200 && response.data?.Model) {
        const userData = response.data.Model;
        formState.UserFirstName = userData.UserFirstName || '';
        formState.UserLastName = userData.UserLastName || '';
        formState.UserName = userData.UserName || '';
        formState.sex = userData.sex || '';
        formState.dateofbirth = formState.dateofbirth || '';
        formState.roleid = userData.roleid || 0;
        formState.companyId = userData.companyId || 0;
        formState.mail = userData.mail || '';
        formState.phone = userData.phone || '';
        formState.MachineCode = userData.MachineCode || '';
        formState.UserPassword = '';
        formState.userstatus = userData.userstatus || 0;
        await GetBranch()
        await getUserBranchSub()
      }
    } catch (error) {
      message.error('An error occurred while fetching user data');
      throw error;
    }
  }
});

const GetBranch = async () => {
  try {
    branchList.value = await DataService.getBranchCompany(user.CompanyId)
  } catch (error) {
    branchList.value = []
    throw error;
  }
}
const getUserBranchSub = async () => {
  try {
    const userBranch = await UserService.getUserBranch(Number(Iduser));
    if (userBranch.length > 0) {
      checkedBranch.value = userBranch.map((b: any) => b.branchid);
    }
  } catch (error) {
    checkedBranch.value = []
  }
};
const SaveBranchSubordinate = async () => {
  try {
    const selectedSubordinates = checkedBranch.value.map((branchId: number) => {
      return {
        userId: Number(Iduser),
        branchid: branchId,
        userName: user.username,
        //branchName: branch ? branch.Branch : '',
      }
    })
    await http.post(`/Users/AddUserBranch/${Iduser}`, selectedSubordinates)
    message.success(' added successfully');
    // return routes.push('/Users')
  } catch (error) {
    message.error('Failed  add subordinates');
    console.error(error);
  }
};
const submitForm = async () => {
  if (formState.UserPassword.length < 6) {
    message.error('Password must be at least 6 characters long.');
    return;
  }
  if (formState.UserPassword !== confirmPassword.value) {
    message.error('Password and Confirm Password do not match.');
    return;
  }
  try {
    formState.UserPassword = hashPassword(formState.UserPassword);
    formState.createdById = user.userId;
    let response;
    if (userId.value) {
      formState.UserID = userId.value = Number(route.params.id);
      response = await UserService.UpdateUser(formState, userId.value);
    } else {
      response = await UserService.AddUser(formState);
    }
    if (response.status === 200) {
      message.success('User saved successfully!');
      return router.push('/Users');
    } else {
      message.error('Failed to save user');
    }
  } catch (error) {
    message.error('An error occurred while saving user data');
    throw error;
  }
};
const Sex = ref<SelectProps['options']>([
  {
    value: 'M',
    label: 'ຊາຍ',
  },
  {
    value: 'F',
    label: 'ຍິງ',
  },
]);
const DateNoInput = ref(formState.dateofbirth ? formatDate(formState.dateofbirth) : '');

watch(DateNoInput, (newDate: any) => {
  formState.dateofbirth = dayjs(newDate).isValid() ? dayjs(newDate).toISOString() : undefined;
});


watch(DateNoInput, (newDate) => {
  if (newDate.length === 4 || newDate.length === 7) {
    DateNoInput.value = newDate + '-';
  }
});

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};
</script>

<template>
  <div>
    <panel class="px-4 py-4">
      <a-tabs v-model:activeKey="activeKey" type="card">
        <a-tab-pane key="1" tab="ຟອມຜູ້ໃຊ້">
          <a-form layout="vertical"
                  @finish="submitForm"
                  @finishFailed="onFinishFailed"
                  :model="formState"
          >
            <a-row :gutter="24">
              <a-col :span="8">
                <a-form-item label="FirstName"
                             name="UserFirstName"
                             :rules="[{ required: true, message: 'ກາລຸນາປ້ອນຊື່!' }]"

                >
                  <a-input size="large" placeholder="FirstName" v-model:value="formState.UserFirstName"/>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="LastName"
                             name="UserLastName"
                             :rules="[{ required: true, message: 'ກາລຸນາປ້ອນນາມສະກຸນ!' }]"

                >
                  <a-input size="large" placeholder="LastName" v-model:value="formState.UserLastName"/>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="UserName"
                             name="UserName"
                             :rules="[{ required: true, message: 'ກາລຸນາປ້ອນຊື່ຜູ້ໃຊ້!' }]"

                >
                  <a-input size="large" placeholder="UserName" v-model:value="formState.UserName"/>
                </a-form-item>
              </a-col>
            </a-row>
            <a-row :gutter="24">
              <a-col :span="8">
                <a-form-item label="sex"
                             name="sex"
                             :rules="[{ required: true, message: 'ກາລຸນາເລືອກເພດ!' }]"

                >
                  <a-select size="large" :options="Sex" v-model:value="formState.sex"/>

                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="dateofbirth"
                             name="DateNoInput"
                >
                  <a-input v-model:value="DateNoInput" placeholder="ປປປປ-ດດ-ວວ" size="large"/>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="role"
                             name="roleid"
                             :rules="[{ required: true, message: 'ກາລຸນາເລືອກສິດນຳໃຊ້' }]"
                >
                  <RoleSelect
                      :value="formState.roleid"
                      @selected="(val: number) => formState.roleid = val"
                      @name="(val: string) => formState.roleName = val"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="Company"
                             name="companyId"
                             :rules="[{ required: true, message: 'ກາລຸນາເລືອກບໍລິສັດ!' }]"
                >
                  <CompanySelect
                      :value="formState.companyId"
                      @selected="(val: number) => formState.companyId = val"/>
                </a-form-item>
              </a-col>
            </a-row>
            <a-row :gutter="24">
              <a-col :span="8">
                <a-form-item label="mail"
                             name="mail">
                  <a-input size="large" placeholder="mail" v-model:value="formState.mail"/>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="phone"
                             name="phone"
                             :rules="[{ required: true, message: 'ກາລຸນາປ້ອນເບີໂທລະສັບ!' }]"
                >
                  <a-input size="large" placeholder="phone" v-model:value="formState.phone"/>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="MachineCode"
                             name="MachineCode"
                             :rules="[{ required: true, message: 'ກາລຸນາປ້ອນ MachineCode!' }]"
                >
                  <a-input size="large" placeholder="MachineCode" v-model:value="formState.MachineCode"/>
                </a-form-item>
              </a-col>
            </a-row>
            <a-row :gutter="24">
              <a-col :span="8">
                <a-form-item label="Password"
                             name="UserPassword"
                             :rules="[{ required: true, message: 'ກາລຸນາປ້ອນລະຫັດຜ່ານ!' }]"
                >
                  <a-input-password size="large" placeholder="Password" v-model:value="formState.UserPassword"/>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="Confirm Password"
                             name="confirmPassword"
                             :rules="[{ required: true, message: 'ກາລຸນາຢືນຢັນລະຫັດຜ່ານ!' }]"
                >
                  <a-input-password size="large" placeholder="Confirm Password" v-model:value="confirmPassword"/>
                </a-form-item>
              </a-col>
            </a-row>
            <a-checkbox v-model:value="formState.userstatus">ເປີດໃຊ້ງານ</a-checkbox>
            <a-row :gutter="24" class="mt-4 justify-end">
              <a-col>
                <a-form-item>
                  <a-button size="large" type="primary" html-type="submit">ບັນທຶກ</a-button>
                </a-form-item>
              </a-col>
              <a-col>
                <a-form-item>
                  <a-button size="large" class="ml-2" @click="router.push('/Users')">ຍ້ອນກັບ</a-button>
                </a-form-item>
              </a-col>
            </a-row>
          </a-form>
          <a-form class="justify-end flex">

          </a-form>
        </a-tab-pane>
        <a-tab-pane key="2" tab="ສາຂາ" v-if="$route.path === `/users/${Iduser}/from`">
          <a-checkbox-group
              v-model:value="checkedBranch">
            <div class="grid grid-cols-2 gap-2">
              <div v-for="branch in branchList"
                   :key="branch.Id">
                <a-checkbox
                    :value="branch.Id">{{ branch.Branch }}
                </a-checkbox>
              </div>
            </div>
          </a-checkbox-group>
          <a-form class="flex justify-end mt-6">
            <a-form-item>
              <a-button size="large" type="primary" @click="SaveBranchSubordinate">ບັນທຶກ</a-button>
            </a-form-item>
            <a-form-item>
              <a-button size="large" class="ml-2" @click="routes.push('/Users')">ຍ້ອນກັບ</a-button>
            </a-form-item>
          </a-form>
        </a-tab-pane>
      </a-tabs>
    </panel>
  </div>
</template>

<style scoped></style>