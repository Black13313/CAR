<template>
  <a-select
    v-model:value="selected"
    show-search
    placeholder="ເລືອກບ້ານ"
    :options="items"
    :field-names="{ label: 'name', value: 'id' }"
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
import VillageModel from "@/model/VillageModel";

const props = defineProps({
  value: {type: Number},
  districtId: {type: Number, required: false},
});
const emits = defineEmits(["selected", "name"]);
const items = ref<VillageModel[]>([]);
const selected = ref<number>();
const isLoading = ref<boolean>(false);

onMounted(async () => {
  if (props.districtId) {
    await getItems();
  }
  selected.value = props.value ?? undefined;
});

const getItems = async () => {
  try {
    isLoading.value = true;
    items.value = await DataService.getVillage(props.districtId);
    isLoading.value = false;
    const selectedItem = items.value.find(item => item.VillageId === props.value);
    if (selectedItem) {
      selected.value = selectedItem.VillageId;
      emits("selected", selectedItem.VillageId);
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
  const item = items.value.find(x => x.VillageId === selected.value);
  emits("name", item?.LaDesc);
};

const clearSelect = () => {
  selected.value = undefined;
  items.value = [];
  emits("selected", selected.value);
  emits("name", "");
}

watch(() => props.value, (val) => {
  selected.value = val ?? undefined;
  const item = items.value.find(x => x.VillageId === val);
  emits("name", item?.LaDesc);
});

watch(() => props.districtId, async (val) => {
  if (val) {
    await getItems();
  } else {
    clearSelect()
  }
});
</script>

<style scoped>
</style>
