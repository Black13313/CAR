<template>
  <a-spin size="large"
          v-if="roles.length === 0"
          tip="Loading..."></a-spin>
  <panel class="px-4" v-else title="ຈັດການສິດນຳໃຊ້">
    <div>
      <div>
        <div class="justify-end flex text-end gap-4 py-4">
          <a-input-search size="large" class="w-96" v-model:value="search" placeholder="ຄົ້ນຫາດ້ວຍຊື່ສິດ"/>
          <a-button size="large" type="primary" @click="getRoles">ຣີໂຫລດ</a-button>
          <a-button size="large" type="primary" @click="showModal">ສ້າງ</a-button>
        </div>
      </div>
      <a-table :columns="RoleTable" :data-source="RolesFiltered" :scroll="{ x: 1000 }">
        <template #bodyCell="{ column, record, text }">
          <template v-if="column.key === 'operation'">
            <div class="flex gap-1 items-center justify-end">
              <div>
                <TooltipButton type="primary" size="middle" label="" tooltip="View" @click="handleView(record.id)">
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
                  <a-button class="text-white bg-amber-500" @click="handledit(record.id)">
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
                    <span>Menu</span>
                  </template>
                  <a-button @click="handleChange(record.id, record.code)">
                    <div class="flex gap-1">
                      <div>
                        <PlusCircleOutlined />
                      </div>
                    </div>
                  </a-button>
                </a-tooltip>
              </div>
              <a-popconfirm
                  title="ທ່ານຕ້ອງການລົບແທ້ບໍ?"
                  ok-text="ແມ່ນ"
                  cancel-text="ບໍ່ແມ່ນ"
                  @confirm="() => confirm(record.id)"
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
    <a-modal v-model:open="open" title="ສິດຜູ້ໃຊ້" :footer="null">
      <div>
        <a-form layout="vertical"
                @finish="handleSubmit"
                :model="form"
        >
          <a-form-item label="code"
                       name="code"
                       :rules="[{ required: true, message: 'Please input your Code!' }]"
          >
            <a-input v-model:value="form.code" size="large" placeholder="Code"/>
          </a-form-item>
          <a-form-item label="description"
                       name="description"
                       :rules="[{ required: true, message: 'Please input your description!' }]"
          >
            <a-textarea size="large" placeholder="description" v-model:value="form.description"/>
          </a-form-item>
          <a-form-item>
            <a-button html-type="submit" size="large" type="primary" class="w-full">
              ສົ່ງ
            </a-button>
          </a-form-item>
        </a-form>
      </div>
    </a-modal>

  </panel>
</template>
<script setup lang="ts">
import Panel from "@/components/Layout/Panel.vue";
import UserService from "@/service/UserService";
import {computed, onMounted, reactive, ref, UnwrapRef} from "vue";
import router from "@/router";
import {EyeOutlined, EditOutlined, PlusCircleOutlined, DeleteOutlined} from "@ant-design/icons-vue";
import RoleTable from "@/views/UserandRole/Role/RoleTable";
import {message} from "ant-design-vue";
import RoleModel, {RoleModelValue} from "@/model/RoleModel";

const selectedRoleId = ref<number | null>(null);
const open = ref<boolean>(false);
const roles = ref([])
const form: UnwrapRef<RoleModel> = reactive({...RoleModelValue});

const showModal = () => {
  open.value = true;
  selectedRoleId.value = null;
};

onMounted(async () => {
  await getRoles()
});

const search = ref<string>("");
const RolesFiltered = computed(() => {
  const filter = new RegExp(search.value, "i");
  if (!search.value) {
    return roles.value;
  }
  return roles.value.filter((role: any) => {
    return (role.code && filter.test(role.code)) || (role.description && filter.test(role.description));
  });
});

const handleSubmit = async () => {
  try {
    if (form.id) {
      await UserService.updateRole(form, form.id);
      message.success("ແກ້ໄຂສຳເລັດ");
    } else {
      await UserService.addRole(form);
      message.success('ສ້າງສຳເລັດ');
    }
    open.value = false;
    await getRoles();
  } catch (error) {
    message.error('ມີບັນຫາໃນການສ້າງ');
    console.error(error);
  }
};


const getRoles = async () => {
  try {
    const res = await UserService.getRole();
    roles.value = res
  } catch (error) {
  }
};
const handleChange = async (id: number, name: string) => {
  return router.push(`/Roles/Menu/${id}/${name}`)
}
const handleView = async (id: number) => {
  return router.push(`/ViewUsers/${id}`);
}

const handledit = async (id: number) => {
  try {
    const res = await UserService.getRoleById(id);
    form.code = res.data.Model.code;
    form.description = res.data.Model.description;
    form.id = res.data.Model.id;
    open.value = true;
  } catch (error) {
    message.error('Error loading role data');
    console.error(error);
  }
};

const confirm = async (id: number) => {
  try {
    const res = await UserService.DeleteRole(id)
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