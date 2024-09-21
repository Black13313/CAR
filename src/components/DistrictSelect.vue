<template>
  <a-select
    v-model:value="selected"
    show-search
    placeholder="ເລືອກເມືອງ"
    :options="items"
    :field-names="{label: 'DesignationLao', value: 'DistrictID'}"
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
import DistrictModel from "@/model/DistrictModel";

const props = defineProps({
  value: {type: Number},
  provinceId: {type: Number, required: false},
});
const emits = defineEmits(["selected", "name"]);
const items = ref<DistrictModel[]>([]);
const selected = ref<number>();
const isLoading = ref<boolean>(false);

onMounted(async () => {
  selected.value = props.value ?? undefined;
  if (props.provinceId) {
    await getItems();
  }
});

const getItems = async () => {
  try {
    isLoading.value = true;
    items.value = await DataService.getDistrict(props.provinceId);
    isLoading.value = false;
    const selectedItem = items.value.find(item => item.DistrictID === props.value);
    if (selectedItem) {
      selected.value = selectedItem.DistrictID;
      emits("name", selectedItem.DesignationLao);
    } else {
      selected.value = undefined;
      emits("selected", selected.value);
      emits("name", "");
    }
  } catch (err) {
    isLoading.value = false;
  }
};

const optionFilter = (input: string, item: any) => {
  return item.name.toLowerCase().indexOf(input.toLowerCase()) >= 0;
};

const onSelected = () => {
  emits("selected", selected.value);
  const item = items.value.find(x => x.DistrictID === selected.value);
  emits("name", item?.DesignationLao);
};

const clearSelect = () => {
  selected.value = undefined;
  items.value = [];
  emits("selected", selected.value);
  emits("name", "");
}

watch(() => props.value, (val) => {
  selected.value = val ?? undefined;
  const item = items.value.find(x => x.DistrictID === val);
  emits("name", item?.DesignationLao);
});

watch(() => props.provinceId, async (val) => {
  if (val) {
    await getItems();
  } else {
    clearSelect()
  }
});
</script>

<style scoped>
</style>
