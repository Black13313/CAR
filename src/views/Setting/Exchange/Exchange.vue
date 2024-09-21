<template>
  <div>
    <panel class="px-4 py-4">
      <div>
        <a-date-picker size="large" class="w-2/12" @change="getExchangeRate" v-model:value="formState.exchangeDate"/>
      </div>
      <a-row v-for="(s, index) in exchange" :key="index" :gutter="24" class="py-2 mt-6">
        <a-col :span="6">
          <span>{{ s.currencyCode }}</span>
        </a-col>
        <a-col :span="6">
          <a-input-number v-model:value="s.exchange_rate"
                          :min="1"
                          @change="handleInputChange(s)"/>
          <a-divider type="vertical"/>
          <a>ປະຫວັດ</a>
        </a-col>
        <a-col v-if="editedItems.includes(s)" :span="6">
          <a-button type="primary"  @click="handleSubmit(s)">save</a-button>
        </a-col>
      </a-row>
    </panel>
  </div>
</template>

<script setup lang="ts">
import Panel from "@/components/Layout/Panel.vue";
import DataService from "@/service/DataService";
import {onMounted, reactive, ref, UnwrapRef} from "vue";
import CurrencyModel from "@/model/CurrencyModel";
import ExchangeModel, {listExchangeValue} from "@/model/ExchangeModel";
import {message} from "ant-design-vue";
import {userStore} from "@/store/user";

const user = userStore()
const currency = ref<CurrencyModel[]>([]);
const formState: UnwrapRef<ExchangeModel> = reactive({...listExchangeValue});
const exchange = ref<ExchangeModel[]>([])
const editedItems = ref<ExchangeModel[]>([]);
onMounted(async () => {
  await getCurrency()
  await getExchangeRate()
});

const getExchangeRate = async () => {
  try {
    const result = await DataService.getExchangeRate(formState);
    if (result.length === 0) {
      exchange.value = currency.value.map(c => ({
        currencyCode: c.code,
        currency_id: c.CurrencyID,
        exchange_rate: null,
        CreatedById: user.userId,
        exchange_date: new Date().toISOString(),
      }));
    } else {
      exchange.value = result;
    }
  } catch (error) {
    console.error(error);
  }
};

const getCurrency = async () => {
  try {
    currency.value = await DataService.getCurreny();
  } catch (error) {
  }
};

const handleInputChange = (item: ExchangeModel) => {
  if (!editedItems.value.includes(item)) {
    editedItems.value.push(item);
  }
};

const handleSubmit = async (item: ExchangeModel) => {
  try {
    item.CreatedById = user.userId;
    await DataService.AddExchangeRate(item);
    message.success('ບັນທຶກສຳເລັດ');
    editedItems.value = editedItems.value.filter(i => i !== item);
    await getExchangeRate();
  } catch (error) {
    message.error('ມີບັນຫາໃນການບັນທຶກ');
    console.error(error);
  }
};
</script>
