<script setup lang="ts">
import { computed, ref } from 'vue';
import { message } from "ant-design-vue";
import http from "@/service/http";
import { LockOutlined } from "@ant-design/icons-vue";
import { userStore } from "@/store/user";
import { hashPassword } from "@/util/helper";
import Panel from '@/components/Layout/Panel.vue';

const newpassword = ref<string | null>(null);
const oldpassword = ref<string | null>(null);
const confirmpassword = ref<string | null>(null);
const userid = userStore();
const currentUser = { username: '' }; // Replace with your actual way to get the current user data
const disabled = computed(() => {
  return !(newpassword.value && oldpassword.value && confirmpassword.value);
});
const save = async () => {
  if (!newpassword.value || !oldpassword.value || !confirmpassword.value) {
    console.error('Error: Please fill in all fields');
    return;
  }

  if (newpassword.value !== confirmpassword.value) {
    console.error('Error: New passwords do not match');
    return;
  }

  const param = {
    newPassword: hashPassword(newpassword.value),
    currentPassword: hashPassword(oldpassword.value),
    confirmpassword: confirmpassword.value,
    userId: userid.userId
  };

  await http.post('/Users/ChangeMyPassword', param)
      .then(() => {
        message.success("Password changed successfully");
      })
      .catch((error) => {
        console.error('Error:', error);
      });
};
</script>

<template>
  <panel class="shadow-lg" title="ປຽ່ນລະຫັດຜ່ານ">
    <header_menu title="ປຽ່ນລະຫັດຜ່ານ" />
    <div class="flex justify-center items-center mt-12">
      <div class="w-full max-w-lg px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <div class="bg-blue-100 w-14 mx-auto rounded-full text-center py-3.5 text-blue-600">
            <LockOutlined :style="{ fontSize: '24px' }" />
          </div>
          <h1 class="mt-3 text-xl">
            ປຽ່ນລະຫັດຜ່ານ
          </h1>
          <p class="mt-4">
            To change your password, please fill in the fields below.<br>
            Your password must contain at least 8 characters,<br> it must also include at least one upper case
            letter,
            <br>one lower case letter, one number and one special character.
          </p>
        </div>
        <div class="mt-6">
          <a-form>
            <a-form-item>
              <label>
                ລະຫັດຜ່ານເກົ່າ
              </label>
              <a-input-password v-model:value="oldpassword" size="large" class="w-full">
                <template #prefix>
                  <LockOutlined class="site-form-item-icon" />
                </template>
              </a-input-password>
            </a-form-item>
            <a-form-item>
              <label>
                ລະຫັດຜ່ານໃຫມ່
              </label>
              <a-input-password v-model:value="newpassword" size="large" class="w-full">
                <template #prefix>
                  <LockOutlined class="site-form-item-icon" />
                </template>
              </a-input-password>
            </a-form-item>
            <a-form-item>
              <label>
                ຢືນຢັ້ນລະຫັດຜ່ານໃຫມ່
              </label>
              <a-input-password v-model:value="confirmpassword" size="large" class="w-full">
                <template #prefix>
                  <LockOutlined class="site-form-item-icon" />
                </template>
              </a-input-password>
            </a-form-item>
            <a-form-item>
              <a-button size="large" class="w-full mt-3" @click="save" :disabled="disabled" type="primary">
                ປຽ່ນລະຫັດຜ່ານ
              </a-button>
            </a-form-item>
          </a-form>
        </div>
      </div>
    </div>
  </panel>
</template>

<style scoped></style>
