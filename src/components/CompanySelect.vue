<template>
  <a-select
      v-model:value="selected"
      show-search
      placeholder="ເລືອກບໍລິສັດ"
      :options="items"
      :field-names="{label: 'comName', value: 'comID'}"
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
import DataService from "@/service/DataService";
import CompanyModel from "@/model/CompanyModel";

const props = defineProps({
  value: {type: Number},
});
const emits = defineEmits(["selected"]);
const items = ref<CompanyModel[]>([])
const selected = ref<number>();
const isLoading = ref<boolean>()

onMounted(async () => {
  await getItems()
  selected.value = props.value ?? undefined
})

const getItems = async () => {
  try {
    const Account = await DataService.getCompany();
    if (Array.isArray(Account)) {
      items.value = [{
        comID: 0,
        comName: 'ບໍລິສັດທັງໝົດ'
      }, ...Account];
    } else {
      items.value = [{
        comID: 0,
        comName: 'ບໍລິສັດທັງໝົດ'
      }, Account];
    }
  } catch (err) {
    console.error("Error fetching companies:", err);
  }
}


const optionFilter = (input: string, item: any) => {
  return item.name.toLowerCase().indexOf(input.toLowerCase()) >= 0;
}

const onSelected = () => {
  emits("selected", selected.value);
  const item = items.value.find(x => x.comID === selected.value)
}

watch(() => props.value, (val) => selected.value = val ?? undefined)
</script>

<style scoped>

</style>
