<script setup lang="ts">
import Panel from "@/components/Layout/Panel.vue";
import router from '@/router';
import {computed, onMounted, reactive, ref, UnwrapRef} from 'vue';
import OrderModel, {DefaultValue} from "@/model/OrderModel";
import OrderService from "@/service/OrderService";
import dayjs, {Dayjs} from 'dayjs';
import {formatDate, showLoading} from "@/service/helper";
import {formatMoney} from "@/util/helper";
import StatusSelect from "@/components/StatusSelect.vue";
import BranchSelect from "@/components/BranchSelect.vue";

const formState = reactive<OrderModel>(DefaultValue) as UnwrapRef<OrderModel>
const Item = ref<OrderModel[]>([]);
const search = ref<string>("");
const open = ref<boolean>(false);
const EstimateTime = ref<{ Note: string }>({Note: ''});
const OrderFiltered = computed(() => {
  const filter = new RegExp(search.value, "i");
  if (!search.value) {
    return Item.value;
  }
  return Item.value.filter((order: OrderModel) => {
    return (order.orderNo && filter.test(order.orderNo)) || (order.customerMobile && filter.test(order.customerMobile));
  });
});
onMounted(async () => {
  await GetlistItem()
  await GetEstimateTime()
})
const GetlistItem = async () => {
  try {
    showLoading()
    Item.value = await OrderService.getOrderList(formState)
    console.log(Item.value);
  } catch (error) {
    throw new Error('Failed to fetch Item All ');
  }
}

const GetEstimateTime = async () => {
  try {
    showLoading()
    EstimateTime.value = await OrderService.getOrderEstimateTime()
    console.log(Item.value);
  } catch (error) {
    throw new Error('Failed to fetch Item All ');
  }
}

const state = reactive({
  checked1: false,
});
const rangePresets = ref([
  {label: 'Last 7 Days', value: [dayjs().add(-7, 'd'), dayjs()]},
  {label: 'Last 14 Days', value: [dayjs().add(-14, 'd'), dayjs()]},
  {label: 'Last 30 Days', value: [dayjs().add(-30, 'd'), dayjs()]},
  {label: 'Last 90 Days', value: [dayjs().add(-90, 'd'), dayjs()]},
]);

const handleDateChange = (dates: [Dayjs, Dayjs] | null) => {
  if (dates) {
    formState.fromDate = dates[0].format('YYYY-MM-DD');
    formState.toDate = dates[1].format('YYYY-MM-DD');
    GetlistItem()
  } else {
    formState.fromDate = dayjs().startOf('day').format('YYYY-MM-DD');
    formState.toDate = dayjs().endOf('day').format('YYYY-MM-DD');
  }
  console.log(formState);
};
</script>

<template>
  <div class="container mx-auto px-4">
    <div>
      <panel class="mt-6 py-4 px-4">
        <div class="flex flex-wrap justify-between items-center gap-3">
          <div class="flex flex-wrap gap-3 items-center">
            <a-range-picker :presets="rangePresets" size="large" @change="handleDateChange"/>
            <a-input-search size="large" type="search" placeholder="ຄົ້ນຫາດ້ວຍ ເລກອໍເດີ້ , ຊື່ລູກຄ້າ" class="w-full md:w-96"
                            v-model:value="search"/>
            <a-button size="large" @click="GetlistItem">ຣີໂຫລດ</a-button>
            <a-button type="primary" size="large" @click="router.push('/order/from')">ສ້າງອໍເດີ້</a-button>
          </div>
          <div class="text-xl font-semibold text-right mt-4 lg:mt-0 w-full lg:w-auto">
            {{ EstimateTime.Note }}
          </div>
        </div>
      </panel>

      <panel class="mt-4" title="ລາຍການ ອໍເດີ້">
        <div class="px-4 py-6">
          <section class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
            <div v-for="(b, index) in OrderFiltered" :key="b.orderNo">
              <div class="shadow-xl bg-white rounded-lg cursor-pointer" @click="router.push(`/order/pay/${b.orderNo}`)">
                <div class="py-3 rounded-tl-lg rounded-tr-lg text-center text-lg"
                     :class="{
    'bg-amber-400': b.orderStatus === 2,
    'bg-green-400': b.orderStatus === 1,
    'bg-red-400': b.orderStatus === 5
  }">
                  ເລກອໍເດີ້: <span class="font-semibold">#{{ b.orderNo }}</span>
                </div>
                <div class="px-3 py-3">
                  <div class="flex pb-2.5 font-semibold">
                    <div class="flex-1">{{b.customerName}}</div>
                    <div class="text-right">{{ b.customerMobile }}</div>
                  </div>
                  <div class="flex pb-2.5">
                    <div class="flex-1">ເຂົ້າໃຊ້ວັນທີ:</div>
                    <div class="text-right  font-semibold">{{ formatDate(b.checkInTime) }}</div>
                  </div>
                  <div class="flex pb-2.5">
                    <div class="flex-1">ຈຳນວນເງິນ:</div>
                    <div class="text-right text-xl font-semibold">
                      {{ formatMoney(b.orderAmount) }}
                    </div>
                  </div>
                  <div class="flex">
                    <div class="flex-1">ສະຖານະ:</div>
                    <div class="text-right font-semibold text-orange-400">
                      {{b.orderStatusName}}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <template v-if="OrderFiltered.length === 0">
            <a-empty/>
          </template>
        </div>
      </panel>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 100%;
}

@media (min-width: 640px) {
  .container {
    max-width: 640px;
  }
}

@media (min-width: 768px) {
  .container {
    max-width: 768px;
  }
}

@media (min-width: 1024px) {
  .container {
    max-width: 1024px;
  }
}

@media (min-width: 1280px) {
  .container {
    max-width: 1280px;
  }
}
</style>
