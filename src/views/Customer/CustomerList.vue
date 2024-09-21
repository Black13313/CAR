<template>
  <a-spin size="large"
          v-if="customer.length === null"
          tip="Loading..."></a-spin>
  <panel class="px-4" v-else title="ຈັດການສິດນຳໃຊ້">
    <div>
      <div>
        <div class="justify-end flex text-end gap-4 py-4">
          <a-input-search size="large" class="w-96" v-model:value="search" placeholder="ຄົ້ນຫາດ້ວຍຊື່ລູກຄ້າ"/>
          <a-button size="large" type="primary" @click="getCustomer">ຣີໂຫລດ</a-button>
          <a-button size="large" type="primary" @click="showModal">ສ້າງ</a-button>
        </div>
      </div>
      <a-table :columns="CustomerTable" :data-source="CustomerFiltered" :scroll="{ x: 1000 }">
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
                  <a-button class="text-white bg-amber-500" @click="handledit(record, record.id)">
                    <div class="flex gap-1">
                      <div>
                        <EditOutlined/>
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
    <a-modal v-model:open="open" title="ສ້າງລູກຄ້າ" width="1000px" :footer="null">
      <div>
        <a-form layout="vertical"
                @finish="handleSubmit"
                :model="form"
        >
          <a-row :gutter="24">
            <a-col :span="8">
              <a-form-item label="custName" name="custName" :rules="[{ required: true, message: 'ກາລຸນາປ້ອນ custName!' }]">
                <a-input size="large" placeholder="custName" v-model:value="form.custName"/>
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item label="custNameEng" name="custNameEng" :rules="[{ required: true, message: 'ກາລຸນາປ້ອນ custNameEng!' }]">
                <a-input size="large" placeholder="custNameEng" v-model:value="form.custNameEng"/>
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item label="custMobile" name="custMobile" :rules="[{ required: true, message: 'ກາລຸນາປ້ອນ custMobile!' }]">
                <a-input size="large" placeholder="custMobile" v-model:value="form.custMobile"/>
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item label="custSocial" name="custSocial" :rules="[{ required: true, message: 'ກາລຸນາປ້ອນ custSocial!' }]">
                <a-input size="large" placeholder="custSocial" v-model:value="form.custSocial"/>
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item label="custAddress" name="custAddress" :rules="[{ required: true, message: 'ກາລຸນາປ້ອນ custAddress!' }]">
                <a-textarea size="large" placeholder="custAddress" v-model:value="form.custAddress"/>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="24">
            <a-col :span="8">
              <a-form-item label="account_number" name="account_number" :rules="[{ required: true, message: 'ກາລຸນາປ້ອນ account_number!' }]">
                <a-input size="large" placeholder="account_number" v-model:value="form.account_number"/>
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item label="othercontact" name="othercontact" :rules="[{ required: true, message: 'ກາລຸນາປ້ອນ othercontact!' }]">
                <a-input size="large" placeholder="othercontact" v-model:value="form.othercontact"/>
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item label="custLevel" name="custLevel" :rules="[{ required: true, message: 'ກາລຸນາປ້ອນ custLevel!' }]">
                <a-select size="large" :options="lvl" v-model:value="form.custLevel" placeholder="custLevel"/>
              </a-form-item>
            </a-col>
          </a-row>
          <a-button html-type="submit" size="large" type="primary" class="w-full">ສົ່ງ</a-button>
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
import {message, SelectProps} from "ant-design-vue";
import CustomerModel, {listCustomerValue} from "@/model/CustomerModel";
import CustomerTable from "@/views/Customer/CustomerTable";

const selectedRoleId = ref<number | null>(null);
const open = ref<boolean>(false);
const customer = ref<CustomerModel[]>([])
const form: UnwrapRef<CustomerModel> = reactive({...listCustomerValue});

const showModal = () => {
  open.value = true;
  selectedRoleId.value = null;
};

onMounted(async () => {
  await getCustomer()
});

const search = ref<string>("");
const CustomerFiltered = computed(() => {
  const filter = new RegExp(search.value, "i");
  if (!search.value) {
    return customer.value;
  }
  return customer.value.filter((c: any) => {
    return (c.custName && filter.test(c.custName)) || (c.custNameEng && filter.test(c.custNameEng));
  });
});

const lvl = ref<SelectProps['options']>([
  {
    value: '0',
    label: 'ທັງຫມົດ',
  },
  {
    value: '1',
    label: '1',
  },
  {
    value: '2',
    label: '2',
  },
  {
    value: '3',
    label: '3',
  },
]);
const handleSubmit = async () => {
  try {
    if (form.id) {
      await UserService.UpdateCustomer(form);
      message.success("ແກ້ໄຂສຳເລັດ");
    } else {
      await UserService.AddCustomer(form);
      message.success('ສ້າງສຳເລັດ');
    }
    open.value = false;
    await getCustomer();
  } catch (error) {
    message.error('ມີບັນຫາໃນການສ້າງ');
    console.error(error);
  }
};


const getCustomer = async () => {
  try {
    const payload = {
      pagesize: 50,
      pagenumber: 1,
      searchtext: ""
    }
    customer.value = await UserService.getCustomer(payload);
  } catch (error) {
  }
};
const handleChange = async (id: number) => {
  return router.push(`/Roles/Menu/${id}`)
}
const handleView = async (id: number) => {
  return router.push(`/ViewUsers/${id}`);
}

const handledit = async (record: CustomerModel, id: number) => {
  try {
    form.id = record.id;
    form.custName = record.custName;
    form.custNameEng = record.custNameEng;
    form.account_number = record.account_number;
    form.custAddress = record.custAddress;
    form.custMobile = record.custMobile;
    form.othercontact = record.othercontact;
    form.custSocial = record.custSocial;
    form.custLevel = record.custLevel;
    open.value = true;
  } catch (error) {
    message.error('Error loading role data');
    console.error(error);
  }
};

const confirm = async (id: number) => {
  try {
    const res = await UserService.DeleteCustomer(id)
    message.success('ລົບສຳເລັດ');
    await getCustomer()
  } catch (error) {
    throw error;
  }
};
const cancel = (e: MouseEvent) => {
  console.log(e);
  message.error('ລົບບໍ່ສຳເລັດ');
};
</script>