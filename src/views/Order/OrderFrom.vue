<script setup lang="ts">
import Panel from "@/components/Layout/Panel.vue";
import DataService from "@/service/DataService";
import {computed, onMounted, reactive, ref, UnwrapRef} from "vue";
import ItemModel from "@/model/ItemModel";
import CurrencySelect from "@/components/CurrencySelect.vue";
import CustomerSelect from "@/components/CustomerSelect.vue";
import {userStore} from "@/store/user";
import BranchSelect from "@/components/BranchSelect.vue";
import {formatMoney} from "@/util/helper";
import OrderModel, {DefaultValue} from "@/model/OrderModel";
import {message} from "ant-design-vue";
import OrderService from "@/service/OrderService";
import router from "@/router";
import {showLoading} from "@/service/helper";

const EstimateTime = ref<OrderModel[]>([]);
const Item = ref<ItemModel[]>([]);
const taxAmount = ref<number>(10);
const selectedItems = ref<number[]>([]);
const formState = reactive<OrderModel>(DefaultValue) as UnwrapRef<OrderModel>
const user = userStore()
onMounted(async () => {
  await GetlistItem()
})
const GetlistItem = async () => {
  try {
    Item.value = await DataService.getAllItems()
    console.log(Item.value);
  } catch (error) {
    throw new Error('Failed to fetch Item All ');
  }
}


const handleSubmit = async () => {
  try {
    if (selectedItems.value.length === 0) {
      message.error('ກາລຸນາເລືອກລາຍການກ່ອນການສ້າງອໍເດີ້!');
      return;
    }
    formState.taxAmount = Number(taxValue),
    formState.createdById = user.userId
    formState.userId = user.userId
    formState.orderDate = new Date().toISOString();
    formState.totalorderAmount = totalPayable.value
    formState.orderAmount = totalPrice.value
    await OrderService.AddOrder(formState);
    message.success('ສ້າງສຳເລັດ');
    return router.push('/Orders')
  } catch (error) {
    message.error('ມີບັນຫາໃນການສ້າງ');
    console.error(error);
  }
};
const handleCheckboxChange = (id: number) => {
  const selectedItem = Item.value.find(item => item.itemId === id);
  if (!selectedItem) return;

  if (selectedItems.value.includes(id)) {
    selectedItems.value = selectedItems.value.filter(itemId => itemId !== id);
    formState.detail = formState.detail.filter(detail => detail.itemId !== id);
  } else {
    selectedItems.value.push(id);
    formState.detail.push({
      id: 0,
      orderNo: formState.orderNo,
      itemId: selectedItem.itemId,
      itemName: selectedItem.itemNameLao,
      itemQty: 1,
      itemPrice: selectedItem.itemBuyPrice,
      itemAmount: selectedItem.itemBuyPrice
    });
  }
};

const totalPrice = computed(() => {
  return selectedItems.value.reduce((sum, itemId) => {
    const selectedItem = Item.value.find(item => item.itemId === itemId);
    return sum + (selectedItem?.itemBuyPrice || 0);
  }, 0);
});
const taxValue = computed(() => {
  const tax = taxAmount.value / 100;
  return totalPrice.value * tax;
});

const totalPayable = computed(() => {
  return totalPrice.value + taxValue.value;
})
const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};
</script>

<template>
  <div>
    <div class="flex  gap-3">
      <panel class="mt-6 py-4 px-4 w-6/12 ">
        <h1 class="text-xl font-semibold">
          ຂໍ້ມູນລູກຄ້າ
        </h1>
        <div class="mt-2">
          <a-form layout="vertical"
                  @finish="handleSubmit"
                  @finishFailed="onFinishFailed"
                  :model="formState"
                  name="basic"
          >
            <a-row :gutter="24">
              <a-col :span="8">
                <a-form-item label="Customer"
                             name="customerId"
                             :rules="[{ required: true, message: 'ກາລຸນາເລືອກລູກຄ້າ!' }]"
                >
                  <CustomerSelect
                      :value="formState.customerId"
                      @selected="(val: number) => formState.customerId = val"/>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="customerMobile"
                             name="customerMobile"
                             :rules="[{ required: true, message: 'ກາລຸນາປ້ອນເບີໂທລະສັບລູກຄ້າ!' }]">
                  <a-input size="large" placeholder="customerMobile"
                           v-model:value="formState.customerMobile"/>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="ສາຂາ"
                             name="branchId"
                             :rules="[{ required: true, message: 'ກາລຸນາເລືອກສາຂາ!' }]"
                >
                  <BranchSelect
                      :value="formState.branchId"
                      @selected="(val: number) => formState.branchId = val"
                  />
                </a-form-item>
              </a-col>
            </a-row>
            <a-row :gutter="24">
              <a-col :span="8">
                <a-form-item label="ມື້ສ້າງ"
                             name="checkInTime"
                             :rules="[{ required: true, message: 'ກາລຸນາເລືອກມື້ສ້າງ!' }]">
                  <a-date-picker size="large" class="w-full"
                                 v-model:value="formState.checkInTime" show-time/>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="estCheckOut"
                             name="estCheckOut"
                             :rules="[{ required: true, message: 'ກາລຸນາເປ້ອນເບີໂທລະສັບລູກຄ້າລືອກເວລາສຳເລັດ!' }]">
                  <a-date-picker size="large" placeholder="estCheckOut" class="w-full"
                                 v-model:value="formState.estCheckOut" show-time/>
                </a-form-item>
              </a-col>

<!--              <a-col :span="8">-->
<!--                <a-form-item label="Currency">-->
<!--                  <CurrencySelect-->
<!--                      :value="formState.currencyId"-->
<!--                      @selected="(val: number) => formState.currencyId = val"/>-->
<!--                </a-form-item>-->
<!--              </a-col>-->
            </a-row>
            <div class="mt-3">
              <a-button size="large" class="w-full" type="primary" html-type="submit">ສ້າງອໍເດີ້</a-button>
            </div>
          </a-form>
        </div>
      </panel>
      <div>
        <panel class="mt-6 py-4 px-4 w-96">

          <h1 class="text-xl font-semibold">
            ລາຍການ
          </h1>
          <div v-for="item in Item" :key="item.itemId" class="flex mt-2 items-center space-x-2">
            <a-checkbox
                :checked="selectedItems.includes(item.itemId)"
                @change="handleCheckboxChange(item.itemId)"
            />
            <div class="flex items-center justify-between">
              <div>
                <span class="text-xl">{{ item.itemNameLao }} |</span>
              </div>
              <div class="font-semibold">
                <span>{{ formatMoney(item.itemBuyPrice) }} ກີບ</span>
              </div>
            </div>
          </div>
        </panel>
        <panel class="mt-3 py-4 px-4">
          <div class="">
            <div class="flex justify-between">
              <div>
                <p>ຍອດລວມ</p>
              </div>
              <div class="">
                {{ formatMoney(totalPrice) }} ກີບ
              </div>
            </div>
            <div class="flex justify-between">
              <div>
                <p>ອາກອນ</p>
              </div>
              <div class="">
                {{ formatMoney(taxValue) }} ກີບ%
              </div>
            </div>
            <div class="flex justify-between font-semibold  mt-5 text-xl">
              <div>
                <p>ຍອດທີ່ຕ້ອງຈ່າຍ</p>
              </div>
              <div class="">
                {{ formatMoney(totalPayable) }} ກີບ
              </div>
            </div>
          </div>
        </panel>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>