<script setup lang="ts">
import Panel from "@/components/Layout/Panel.vue";
import DataService from "@/service/DataService";
import {computed, onMounted, reactive, ref, UnwrapRef, watch} from "vue";
import OrderPayModel, {OrderPayModelValue} from "@/model/OrderPayModel";
import {useRoute} from "vue-router";
import OrderModel, {DefaultValue} from "@/model/OrderModel";
import {formatMoney, formatMoneyRate} from "@/util/helper";
import {CheckCircleFilled, CloseCircleFilled} from '@ant-design/icons-vue';
import {message} from "ant-design-vue";
import {userStore} from "@/store/user";
import CurrencyModel from "@/model/CurrencyModel";
import PaymentTypeSelect from "@/components/PaymentTypeSelect.vue";
import {formatNumber, showLoading} from "@/service/helper";
import BranchModel from "@/model/BranchModel";
import ExchangeModel from "@/model/ExchangeModel";
import OrderService from "@/service/OrderService";
import router from "@/router";
import getOrderByID from "@/model/getOrderStepbyID.model";
import Orderreceipt from "@/views/Order/Order.receipt.vue"

const inputValue = ref<string>('');
const route = useRoute()
const orderId = route.params.id
const Item = ref<OrderPayModel[]>([]);
const Order = ref<OrderModel>(DefaultValue);
const Step = ref<getOrderByID[]>([]);
const OrderPay = ref<OrderPayModel[]>([]);
const open = ref<boolean>(false);
const formState = reactive<OrderModel>(DefaultValue) as UnwrapRef<OrderModel>
const form = reactive<OrderPayModel>(OrderPayModelValue) as UnwrapRef<OrderPayModel>
const user = userStore()
const currency = ref<CurrencyModel[]>([]);
const branch = ref<BranchModel[]>([]);
const exchange = ref<ExchangeModel[]>([]);

onMounted(async () => {
  await getcurrency()
  await GetlistItem(String(orderId))
  await GetOrderbyId(String(orderId))
  await getExchangeRate()
  await GetPaymentType()
  await getBranch()
})

const selectedCurrency = computed(() => {
  let ccy = 'LAK';
  if (currency.value.length > 0) {
    const filteredCurrency = currency.value.find(x => x.CurrencyID === formState.currencyId);
    if (filteredCurrency && filteredCurrency.code) {
      ccy = filteredCurrency.code;
    }
  }
  return ccy;
});
const exchangeRate = computed(() => {
  let rate = 1;
  if (exchange.value.length > 0) {
    const data = exchange.value.filter(x => x.currencyCode === selectedCurrency.value)
    if (data.length > 0) {
      rate = data[0]['exchange_rate']
    }
  }
  return rate
})
const getcurrency = async () => {
  try {
    showLoading()
    currency.value = await DataService.getCurreny();
    console.log("Fetched currency:", currency.value); // Log the fetched data
  } catch (error) {
    console.error("Error fetching currency:", error);
  }
};
const getBranch = async () => {
  try {
    branch.value = await DataService.getBranchCompany(user.CompanyId);
    console.log("branch", branch.value);
  } catch (error) {
  }
};


const handleSubmit = async () => {
  try {
    const currentStep = Item.value.find(step => step.isCurrent === true);

    if (currentStep) {
      formState.stepId = currentStep.Stepid + 1;
    }
    formState.orderNo = String(orderId);
    formState.Userid = user.userId;
    formState.TranDate = new Date().toISOString();
    formState.ReferenceType = String(orderId);
    await DataService.getApproveOrderStep(formState)
    console.log(formState);
    message.success('ສ້າງສຳເລັດ');
    await GetlistItem(String(orderId))

  } catch (error) {
    message.error('ມີບັນຫາໃນການສ້າງ');
    console.error(error);
  }
};
const Rejected = async () => {
  try {
    formState.orderNo = String(orderId);
    formState.Userid = user.userId;
    await OrderService.CancelOrders(formState, formState.remark)
    console.log(formState);
    message.success('ຍົກເລິກສຳເລັດ');
    await GetlistItem(String(orderId))
    return router.push('/Orders')
  } catch (error) {
    message.error('ມີບັນຫາໃນການສ້າງ');
    console.error(error);
  }
};
const SubmitPay = async () => {
  try {
    form.orderNo = String(orderId)
    form.discountAmount = Order.value.discountAmount
    form.taxAmount = Order.value.taxAmount
    form.paidAmountOriginal = amountToPay.value
    form.taxValue = Order.value.taxAmount
    form.branchId = user.CompanyId
    form.paidAmount = amountToPay.value
    form.paidDate = new Date().toISOString();
    form.chequeDate = Order.orderDate;
    form.totalPaid = amountToPay.value
    form.createdById = user.userId
    form.rateId = formState.currencyId
    console.log(form);
    await OrderService.PayOrders(form)
    message.success('ສ້າງສຳເລັດ');
    return router.push(`/order/pay/${orderId}/receipt`)
  } catch (error) {
    message.error('ມີບັນຫາໃນການສ້າງ');
    console.error(error);
  }
};
const onInputNumber = (value: number | string) => {
  if (value === 'C') {
    inputValue.value = '';
  } else {
    inputValue.value += value;
  }
}
const icons = [
  "fa-clipboard",
  "fa-soap",
  "fa-shower",
  "fa-layer-group",
  "fa-check",
  "fa-file-invoice-dollar"
];
const showModal = () => {
  open.value = true;
};
const GetlistItem = async (orderId: string) => {
  try {
    showLoading()
    Item.value = await DataService.getOrderStep(orderId)
    console.log(Item.value);
  } catch (error) {
    throw new Error('Failed to fetch Item All ');
  }
}
const GetPaymentType = async () => {
  try {
    OrderPay.value = await DataService.getPaymentType()
    console.log(OrderPay.value);
  } catch (error) {
    throw new Error('Failed to fetch Item All ');
  }
}
const GetOrderbyId = async (orderId: string) => {
  try {
    Order.value = await DataService.getOrderById(orderId)
    console.log(Order.value);
  } catch (error) {
    throw new Error('Failed to fetch Item All ');
  }
}
const currentIcon = computed(() => {
  const currentStep = Item.value.find(step => step.isCurrent === true);
  if (currentStep) {
    return icons[currentStep.Stepid - 1] || icons[0];
  }
  return icons[0];
});
const getExchangeRate = async () => {
  try {
    showLoading()
    exchange.value = await DataService.getExchangeRate({exchangeDate: formState.exchangeDate})
  } catch (error) {
    throw error
  }
};
const currentStepName = computed(() => {
  const currentStep = Item.value.find(step => step.isCurrent === true);
  return currentStep ? currentStep.StepName : "No Step";
});
const remainingAmount = computed(() => {
  const totalAmount = amountToPay.value || 0;
  const receivedAmount = Number(inputValue.value) || 0;
  const change = receivedAmount - totalAmount;
  return change > 0 ? change : 0;
});
const isNonKipCurrency = computed(() => {
  const selectedCurrency = currency.value.find(
      (curr) => curr.CurrencyID === formState.currencyId
  );
  return selectedCurrency?.code !== "KIP";
});
const amountToPay = computed(() => {
  const totalAmount = Order.value.totalorderAmount || 0;
  const discountAmount = Order.value.discountAmount || 0;
  const rate = exchangeRate.value || 1;
  return (totalAmount - discountAmount) / rate;
});
watch(() => form.currencyId, (newCurrencyId) => {
  const selectedCurrency = currency.value.find(
      (curr) => curr.CurrencyID === newCurrencyId
  );
  form.currencyName = selectedCurrency ? selectedCurrency.code : '';
});

</script>

<template>
  <div v-if="Order.orderStatus === 1">
    <Orderreceipt/>
  </div>
  <div v-else class="mt-3">
    <div>
      <panel class="px-3 py-4">
        <a-steps
            label-placement="horizontal"
            status="process"
            direction="horizontal">
          <a-step
              v-for="step in Item"
              :key="step.Stepid"
              :status="step.Status === 1 ? 'finish' : 'wait'"
              :title="step.StepName"
          />
        </a-steps>
        <div class="justify-end flex mt-5 gap-3">
          <!--          Approve-->
          <a-popover placement="bottom">
            <template #content>
              <div>
                <a-form layout="vertical">
                  <a-form-item label="OrderNo">
                    <a-input size="large" placeholder="OrderNo" disabled v-model:value="Order.orderNo"/>
                  </a-form-item>
                  <a-form-item label="Note">
                    <a-input size="large" placeholder="Note" v-model:value="formState.Note"/>
                  </a-form-item>
                  <div class="justify-end flex">
                    <a-button size="large" type="primary" @click="handleSubmit">
                      Approve
                    </a-button>
                  </div>
                </a-form>
              </div>
            </template>
            <a-button size="large" type="primary" @click="showModal" class="items-center flex"
                      v-if="Item.find(step => step.Stepid < 6 && step.isCurrent)">
              <template #icon>
                <CheckCircleFilled/>
              </template>
              Approve
            </a-button>
          </a-popover>
          <!--          Rejected-->
          <a-popover placement="bottom" v-if="Item.find(step => step.Stepid < 2 && step.isCurrent)">
            <template #content>
              <div>
                <a-form layout="vertical">
                  <a-form-item label="Remark">
                    <a-input size="large" placeholder="Remark" v-model:value="formState.remark"/>
                  </a-form-item>
                  <div class="justify-end flex">
                    <a-button size="large" danger @click="Rejected">
                      Rejected
                    </a-button>
                  </div>
                </a-form>
              </div>
            </template>
            <a-button size="large" danger @click="showModal" class="items-center flex"
                      v-if="Item.find(step => step.Stepid < 6 && step.isCurrent)">
              <template #icon>
                <CloseCircleFilled/>
              </template>
              Rejected
            </a-button>
          </a-popover>
        </div>
      </panel>
    </div>
    <div class="flex gap-8 mt-6">
      <panel class="w-6/12 h-5/6 py-5 text-center">
        <i :class="`fa-solid fa-6x fa-beat-fade mt-3 ${currentIcon}`"></i>
        <p class="text-xl font-semibold mt-3">{{ currentStepName }}</p>
        <div class="px-5 mt-3">
          <div>
            <h1 class="font-semibold flex text-xl">
              ຂໍ້ມູນອໍເດີ
            </h1>
          </div>
          <div class="flex justify-between">
            <div>
              <p>ເລກທີ່ອໍເດີ້</p>
            </div>
            <div class="">
              {{ Order.orderNo }}
            </div>
          </div>
          <div class="flex justify-between">
            <div>
              <p>ຍອດທີ່ຕ້ອງຈ່າຍ</p>
            </div>
            <div class="">
              {{ formatMoney(Order.orderAmount) }}
            </div>
          </div>
          <div class="flex justify-between">
            <div>
              <p>ອາກອນ</p>
            </div>
            <div class="">
              {{ formatMoney(Order.taxAmount) }} ກີບ
            </div>
          </div>
          <div class="flex justify-between">
            <div>
              <p>ສ່ວນຫລຸດ</p>
            </div>
            <div class="">
              {{ formatMoney(Order.discountAmount) }} ກີບ
            </div>
          </div>
          <div>
            <div class="flex font-semibold text-xl mt-4 justify-between">
              <div>
                <p>ຍອດລວມທີ່ຕ້ອງຈ່າຍ</p>
              </div>
              <div class="">
                {{ formatMoneyRate(amountToPay) }}  <span>{{ selectedCurrency }}</span>
              </div>
            </div>
            <div class="flex font-semibold text-xl  justify-between">
              <div>
                <p>ເລຣດທີ່ຕ້ອງຈ່າຍ</p>
              </div>
              <div class="">
                {{ formatMoneyRate(amountToPay) }} <span>{{ selectedCurrency }}</span>
              </div>
            </div>
          </div>
        </div>
      </panel>

      <template v-if="Item.find(step => step.Stepid === 6 && step.isCurrent)">
        <panel class="w-4/12 px-4 py-4">
          <div>
            <div>
              <PaymentTypeSelect class="w-full mt-5"
                                 :value="form.paymetType"
                                 @selected="(val: number) => form.paymetType = val"/>
              <a-radio-group
                  v-if="currency.length > 0"
                  v-model:value="formState.currencyId"
                  button-style="solid"
                  size="large"
                  class="mt-3"
                  :style="{ width: '100%' }">
                <a-radio-button
                    v-for="(item, index) in currency"
                    :key="index"
                    :value="item.CurrencyID"
                    :style="{ width: `${100 / currency.length}%`, textAlign: 'center' }">
                  {{ item.code }}
                </a-radio-button>
              </a-radio-group>
              <p v-else>Loading currency data...</p>

            </div>
            <div class="flex items-center  mt-3.5">
              <h1 class="flex-1 font-bold text-xl">ຈຳນວນເງິນຮັບມາ</h1>
              <h1 class="text-right font-bold text-2xl">{{ formatNumber(Number(inputValue)) }} <span>{{
                  selectedCurrency
                }}</span></h1>
            </div>
            <div class="flex items-center">
              <h1 class="flex-1 font-bold text-xl">ອັດຕາແລກປຽ່ນ</h1>
              <h1 class="text-right font-bold text-2xl">{{ formatNumber(Number(exchangeRate)) }}
                <span>{{ selectedCurrency }}</span></h1>
            </div>
            <div class="flex items-center text-xl">
              <h1 class="flex-1 font-bold">ເງິນທອນ</h1>
              <h1 class="text-right font-bold text-2xl">{{ formatMoneyRate(remainingAmount, 'en-US') }} <span>{{
                  selectedCurrency
                }}</span></h1>
            </div>
            <div class=" items-center">
              <h1 class="flex-1">ຫມາຍເຫດ</h1>
              <a-input size="large" placeholder="ຫມາຍເຫດ" v-model:value="form.remark"/>
            </div>
            <div class="flex justify-center py-4">
              <table>
                <tr>
                  <td>
                    <button class="butto" @click="onInputNumber(1)">1</button>
                  </td>
                  <td>
                    <button class="butto" @click="onInputNumber(2)">2</button>
                  </td>
                  <td>
                    <button class="butto" @click="onInputNumber(3)">3</button>
                  </td>
                </tr>
                <tr>
                  <td>
                    <button class="butto" @click="onInputNumber(4)">4</button>
                  </td>
                  <td>
                    <button class="butto" @click="onInputNumber(5)">5</button>
                  </td>
                  <td>
                    <button class="butto" @click="onInputNumber(6)">6</button>
                  </td>
                </tr>
                <tr>
                  <td>
                    <button class="butto" @click="onInputNumber(7)">7</button>
                  </td>
                  <td>
                    <button class="butto" @click="onInputNumber(8)">8</button>
                  </td>
                  <td>
                    <button class="butto" @click="onInputNumber(9)">9</button>
                  </td>
                </tr>
                <tr>
                  <td>
                    <button class="butto" @click="onInputNumber(0)">0</button>
                  </td>
                  <td>
                    <button class="butto" @click="onInputNumber('00')">00</button>
                  </td>
                  <td>
                    <button class="butto" @click="onInputNumber('C')">C</button>
                  </td>
                </tr>
                <tr>
                  <td colspan="3" class="pt-5">
            <span class="bg-black text-center px-28 py-3 rounded-xl text-white mb-3 font-semibold my-4"
                  @click="SubmitPay"
            >
              ຊໍາລະ
            </span>
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </panel>
      </template>
    </div>
  </div>

</template>

<style scoped>

.butto {
  width: 76px;
  height: 60px;
  font: normal 25pt Tahoma;
  border-radius: 6pt;
  background-color: black;
  color: white;
  margin: 4px;
}
</style>