<template>
  <a-select
    v-model:value="selected"
    show-search
    placeholder="ເລືອກແຂວງ"
    :options="items"
    :field-names="{label: 'DesignationLao', value: 'ProvinceID'}"
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
import ProvinceModel from "@/model/ProvinceModel";

const props = defineProps({
  value: {type: Number},
});
const emits = defineEmits(["selected", "DesignationLao"]);
const items = ref<ProvinceModel[]>([])
const selected = ref<number>();
const isLoading = ref<boolean>()

onMounted(async () => {
  await getItems()
  selected.value = props.value ?? undefined
})

const getItems = async () => {
  try {
    items.value = await DataService.getProvince()
  } catch (err) {
    items.value = []
  }
}

const optionFilter = (input: string, item: any) => {
  return item.name.toLowerCase().indexOf(input.toLowerCase()) >= 0;
}

const onSelected = () => {
  emits("selected", selected.value);
  const item = items.value.find(x => x.ProvinceID === selected.value)
  emits("DesignationLao", item?.DesignationLao);
}

watch(() => props.value, (val) => selected.value = val ?? undefined)
</script>

<style scoped>

</style>