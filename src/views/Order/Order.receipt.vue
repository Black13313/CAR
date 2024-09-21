<script setup lang="ts">
import DataService from "@/service/DataService";
import {useRoute} from "vue-router";
import {onMounted, ref} from "vue";
import OrderModel from "@/model/OrderModel";
import ItemModel from "@/model/ItemModel";
import {formatDate, formatDatetime, formatNumber, showLoading} from "@/service/helper";

const route = useRoute();
const orderId = route.params.id;
const order = ref<OrderModel | null>(null);
const items = ref<ItemModel[]>([]);

onMounted(async () => {
  await getOrder();
});

const getOrder = async () => {
  try {
    showLoading();
    const fetchedOrder = await DataService.getOrderById(String(orderId));
    order.value = fetchedOrder;
    items.value = fetchedOrder.detail || [];
    console.log(order.value);
  } catch (err) {
    console.error(err);
  }
};

const onPrint = () => {
  window.print();
};
</script>

<template>
  <div class="flex justify-center py-12">
    <a-button size="large" @click="onPrint">ພິມ</a-button>
  </div>

  <template v-if="order">
    <div class="flex items-center justify-center">
      <div id="receipt" class="receipt-width bg-white rounded-xl shadow-md p-4 text-black">
        <div class="text-center flex justify-center">
          <img src="../../assets/Logo.png" height="160" width="160"/>
        </div>
        <h1 class="text-xl font-bold mb-0 text-center">ໃບບິນຮັບເງິນ</h1>
        <p class="text-sm font-bold text-center mb-0">AKAT Carcare</p>
        <p class="text-xs text-center mb-2"></p>
        <div class="mt-2 text-xs">ວັນທີ: {{ formatDatetime(order.createdDateTime) }}</div>
        <p class="text-xs mb-0">ເລກໃບບີນ: {{ order.orderNo }}</p>
        <p class="text-xs mb-0">ຜູ້ສ້າງ: {{ order.userName }}</p>
        <p class="text-xs mb-0">ເບີໂທ: {{ order.customerMobile }}</p>
        <hr class="my-2 border-dashed">

        <div class="flex text-xs mb-0">
          <div class="flex-1">ຊື່ລູກຄ້າ:</div>
          <div class="text-right">{{ order.customerName }}</div>
        </div>
        <div class="flex text-xs mb-0">
          <div class="flex-1">ເບີໂທ:</div>
          <div class="text-right">{{ order.customerMobile }}</div>
        </div>
<!--        <div class="flex text-xs mb-01">-->
<!--          <div class="flex-1">ເຊັກອິນ:</div>-->
<!--          <div class="text-right">{{ formatDatetime(order.checkInTime) }}</div>-->
<!--        </div>-->
<!--        <div class="flex text-xs mb-0">-->
<!--          <div class="flex-1">ເຊັກເອົ້າ:</div>-->
<!--          <div class="text-right">{{ formatDatetime(order.estCheckOut) }}</div>-->
<!--        </div>-->
        <div class="flex text-xs mb-0">
          <div class="flex-1">ສະກຸນເງິນ:</div>
          <div class="text-right">{{ order.currencyName }}</div>
        </div>
        <div class="flex text-xs mb-0">
          <div class="flex-1">ສະຖານະ:</div>
          <div class="text-right">{{ order.orderStatusName }}</div>
        </div>
        <hr class="my-2 border-dashed">
        <div class="text-xs">
          <div class="flex justify-between text-center mb-2">
            <h1 class="flex-1">ລາຍການ</h1>
            <h1 class="flex-1">ຈຳນວນ</h1>
            <h1 class="flex-1">ລາຄາ</h1>
          </div>
          <div v-for="item in items" :key="item.id" class="flex justify-between gap-4 px-0.5 mt-2">
            <p class="flex-1 text-left">{{ item.itemName }} </p>
            <p class="flex-1 text-center">{{ item.itemQty }} </p>
            <p class="flex-1 text-right">{{ formatNumber(item.itemAmount) }}</p>
          </div>
        </div>


        <hr class="my-2 border-dashed">

        <div class="flex text-xs mb-1">
          <div class="flex-1">Sub Total:</div>
          <div class="text-right">{{ formatNumber(order.orderAmount) }} {{ order.currencyName }}</div>
        </div>
        <div class="flex text-xs mb-1">
          <div class="flex-1">Discount:</div>
          <div class="text-right">0</div>
        </div>
        <div class="flex text-xs mb-1">
          <div class="flex-1">VAT:</div>
          <div class="text-right">{{ formatNumber(order.taxAmount) }}</div>
        </div>
<!--        <div class="flex text-xs mb-1">-->
<!--          <div class="flex-1">Cash:</div>-->
<!--          <div class="text-right">0</div>-->
<!--        </div>-->
<!--        <div class="flex text-xs mb-1">-->
<!--          <div class="flex-1">Change:</div>-->
<!--          <div class="text-right">0</div>-->
<!--        </div>-->
        <hr class="my-2 border-dashed">

        <p class="text-sm text-right font-semibold mb-2">Total: {{ formatNumber(order.totalorderAmount) }}
          {{ order.currencyName }}</p>
        <hr class="my-2 border-dashed">

        <p class="text-xs mb-1 text-center">***Thanks You.***</p>
      </div>
    </div>
  </template>
  <a-empty v-else/>
</template>

<style scoped>
.receipt-width {
  width: 55mm;
}
</style>
