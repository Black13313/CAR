<template>
  <a-spin size="large"
          v-if="users.length === 0"
          tip="Loading..."></a-spin>
  <panel class="px-4" v-else title="ຈັດການຜູ້ໃຊ້">
    <div>
      <div>
        <div class="justify-end flex text-end gap-4 py-4">
          <a-input-search size="large" class="w-96" v-model:value="search" placeholder="ຄົ້ນຫາດ້ວຍຊື່ຜູ້ໃຊ້"/>
          <a-button size="large" type="primary" @click="getUser">ຣີໂຫລດ</a-button>
          <a-button size="large" type="primary" @click="router.push('/users/form')">ສ້າງ</a-button>
        </div>
      </div>
      <a-table :columns="UserTable" :data-source="UserFiltered" :scroll="{ x: 1000 }">
        <template #bodyCell="{ column, record, text }">
          <template v-if="column.key === 'operation'">
            <div class="flex gap-1 justify-end">
              <div>
                <TooltipButton type="primary" size="middle" label="" tooltip="View" @click="handleView(record.UserID)">
                  <template #icon>
                    <EyeOutlined/>
                  </template>
                </TooltipButton>
              </div>
              <div>
                <a-tooltip placement="top">
                  <template #title>
                    <span>Edit</span>
                  </template>
                  <a-button class="text-white bg-amber-500" @click="handledit(record.UserID)">
                    <div class="flex gap-1">
                      <div>
                        <EditOutlined/>
                      </div>
                    </div>
                  </a-button>
                </a-tooltip>
              </div>
              <div>
                <a-tooltip placement="top">
                  <template #title>
                    <span>ChangePassword</span>
                  </template>
                  <a-button @click="handleChange(record.UserID)">
                    <div class="flex gap-1">
                      <div>
                        <KeyOutlined/>
                      </div>
                    </div>
                  </a-button>
                </a-tooltip>
              </div>
              <a-popconfirm
                  title="ທ່ານຕ້ອງການລົບແທ້ບໍ?"
                  ok-text="ແມ່ນ"
                  cancel-text="ບໍ່ແມ່ນ"
                  @confirm="() => confirm(record.UserID)"
                  @cancel="cancel">
                <a-tooltip placement="top">
                  <template #title>
                    <span>Delete</span>
                  </template>
                  <a-button class="text-white bg-red-600">
                    <div class="flex gap-1">
                      <div>
                        <DeleteOutlined/>
                      </div>
                    </div>
                  </a-button>
                </a-tooltip>
              </a-popconfirm>
            </div>
          </template>
        </template>
      </a-table>
    </div>
  </panel>
</template>
<script setup lang="ts">
import Panel from "@/components/Layout/Panel.vue";
import UserService from "@/service/UserService";
import {computed, onMounted, ref} from "vue";
import UserTable from "@/views/UserandRole/Users/UserTable";
import router from "@/router";
import {EyeOutlined, EditOutlined, KeyOutlined, DeleteOutlined} from "@ant-design/icons-vue";
import {message} from "ant-design-vue";

const users = ref([])
const search = ref<string>("");
const UserFiltered = computed(() => {
  const filter = new RegExp(search.value, "i");
  if (!search.value) {
    return users.value;
  }
  return users.value.filter((user: any) => {
    return (user.UserName && filter.test(user.UserName)) || (user.FirstName	 && filter.test(user.FirstName));
  });
});
onMounted(async () => {
  await getUser()
});
const getUser = async () => {
  try {
    const res = await UserService.getlistUser();
    users.value = res.data?.Model
  } catch (error) {
  }
};
const handleChange = async (id: number) => {
  return router.push(`/users/changepassword/${id}`)
}
const handleView = async (id: number) => {
  return router.push(`/ViewUsers/${id}`);
}
const handledit = async (id: number) => {
  return router.push(`/users/${id}/from`);
}
const confirm = async (id: number) => {
  try {
    const res = await UserService.DeleteUser(id)
    message.success('ລົບສຳເລັດ');
  } catch (error) {
    throw error;
  }
};
const cancel = (e: MouseEvent) => {
  console.log(e);
  message.error('ລົບບໍ່ສຳເລັດ');
};
</script>