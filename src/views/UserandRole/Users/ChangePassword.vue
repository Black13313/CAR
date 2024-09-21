<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { computed, ref } from "vue";
import http from "@/service/http";
import {hashPassword} from "@/util/helper";
import {message} from "ant-design-vue";
import Panel from "@/components/Layout/Panel.vue";
import router from "@/router";

const routes = useRouter();
const userId = routes.currentRoute.value.params.id;

const newpassword = ref<string | null>(null);
const oldpassword = ref<string | null>(null);
const confirmpassword = ref<string | null>(null);

const save = async () => {

  const param = {
    Passkey: "",
    DigitalSignature: "",
    userId: userId,
    currentPassword: hashPassword(oldpassword.value),
    NewPass: hashPassword(newpassword.value),
  };

  try {
    const response = await http.post("/Users/ResetPassword", param);
    if (response.status === 200) {
      message.success("Password changed successfully");
    } else {
      message.error("Error changing password");
    }
  } catch (error) {
    console.error(error);
    message.error("An error occurred while changing the password");
  }
};
</script>

<template>
  <div>
   <Panel class="px-4 py-5" title="ປຽ່ນລະຫັດຜ່ານ">
     <div>
       <a-form layout="vertical">
         <a-form-item label="currentPassword">
           <a-input-password size="large" v-model:value="oldpassword" placeholder="currentPassword"/>
         </a-form-item>
         <a-form-item label="newpassword">
           <a-input-password size="large" v-model:value="newpassword" placeholder="newpassword"/>
         </a-form-item>
         <div class="flex gap-5 text-end justify-end">
           <div>
             <a-button label="Save" tooltip="Save" size="large" type="primary" @click="save">ບັນທຶກ</a-button>
           </div>
           <div>
             <a-button label="Cancel" tooltip="Cancel" size="large" @click="router.push('/Users')">ຍ້ອນກັບ</a-button>
           </div>
         </div>
       </a-form>
     </div>
   </Panel>
  </div>
</template>

<style scoped>
/* Add your styles here */
</style>
