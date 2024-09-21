<template>
  <a-select
      v-model:value="selected"
      show-search
      placeholder="ເລືອກສະກຸນເງິນ"
      :options="items"
      :field-names="{label: 'DesignationLao', value: 'CurrencyID'}"
      :filter-option="optionFilter"
      :loading="isLoading"
      :disabled="isLoading"
      @change="onSelected"
      clear-icon
      allow-clear
      size="large">
  </a-select>
</template>

<script setup lang="ts">
import {onMounted, ref, watch} from "vue";
import CurrencyModel from "@/model/CurrencyModel";
import DataService from "@/service/DataService";
const props = defineProps({
  value: {type: Number || String},
});
const emits = defineEmits(["selected"]  );
const items = ref<CurrencyModel[]>([])
const selected = ref<number>();
const isLoading = ref<boolean>()

onMounted(async () => {
  await getItems()
  selected.value = props.value ?? undefined
})

const getItems = async () => {
  try {
    const role = await DataService.getCurreny()
    items.value = [{
      CurrencyID: 0,
      DesignationLao: 'ສະກຸນເງິນໃຊ້ທັງໝົດ'
    }, ...role]
  } catch (err) {
  }
}

const optionFilter = (input: string, item: any) => {
  return item.name.toLowerCase().indexOf(input.toLowerCase()) >= 0;
}

const onSelected = () => {
  emits("selected", selected.value);
  const item = items.value.find(x => x.CurrencyID === selected.value)
}

watch(() => props.value, (val) => selected.value = val ?? undefined)
</script>

<style scoped>

</style>
