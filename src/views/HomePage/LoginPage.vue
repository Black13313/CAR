<script setup lang="ts">
import {reactive, UnwrapRef, ref} from 'vue';
import {UserOutlined, LockOutlined} from '@ant-design/icons-vue';
import {hashPassword} from "@/util/helper";
import UserModel, {UserModelValue} from "@/model/UserModel.js";
import {message} from "ant-design-vue";
import router from "@/router";
import http from "@/service/http";
import ResponseData from "@/model/ResponseData";
import {userStore} from "@/store/user";

const formState = reactive<UserModel>(UserModelValue) as UnwrapRef<UserModel>
const isLoggingIn = ref(false)
const user = userStore()
const SubmitForm = async () => {
  try {
    isLoggingIn.value = true
    const playlood = {
      RememberMe: formState.RememberMe,
      UserName: formState.UserName,
      Password: hashPassword(formState.Password)
    }
    const res = await http.post("/Users/UserLogin", playlood) .then((res: ResponseData) => {
      message.success("ເຂົ້າສູລະບົບສຳເລັດ")
      user.setUserData(res.data.Model)
      isLoggingIn.value = false
      return router.push('/Orders')
    })
    return router.push('/Orders')
  } catch (err: any) {
    isLoggingIn.value = false
    throw new Error(err);
  }
}
</script>

<template>
  <div class="h-screen bg-gray-100 flex justify-center items-center  ">
    <div class="bg-white px-6 py-6 rounded-3xl shadow-2xl ">
      <div class="flex items-center   ">
        <div>
          <img src="../../assets/Logo.png" height="250" width="250"/>
        </div>
        <div>
          <p class="font-bold text-blue-900 text-4xl mr-6 ">CARCARE </p>
        </div>
      </div>
      <a-form
          :model="formState"
          name="normal_login"
          class="login-form ">
        <a-form-item
            label=""
            name="UserName"
            :rules=" [{ required: true, message: 'Please input your password! ' }]"
        >
          <a-input v-model:value="formState.UserName"
                   size="large"
                   placeholder="Enter password">
            <template #prefix>
              <UserOutlined class="site-form-item-icon"/>
            </template>
          </a-input>
        </a-form-item>

        <a-form-item
            label=""
            name="password"
            :rules=" [{ required: true, message: 'Please input your password! ' }]"
        >
          <a-input-password v-model:value="formState.Password"
                            size="large"
                            placeholder="Enter password">
            <template #prefix>
              <LockOutlined class="site-form-item-icon"/>
            </template>
          </a-input-password>
        </a-form-item>
        <a-form-item>
          <a-checkbox size="large"
                      v-model:checked="formState.RememberMe">
            ຈົດຈຳຂ້ອຍ
          </a-checkbox>
        </a-form-item>
        <a-form-item>
          <a-button class="login-form-button bg-blue-600  "
                    type="primary"
                    html-type="submit"
                    size="large"
                    :loading="isLoggingIn"
                    @click="SubmitForm"
                    block 
          >
            ເຂົ້າສູ່ລະບົບ
          </a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>

</template>

<style scoped>

</style>