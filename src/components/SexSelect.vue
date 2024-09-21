<template>
  <a-select
      v-model:value="selected"
      show-search
      placeholder="ເລືອກເພດ"
      :options="items"
      :field-names="{label: 'name', value: 'sex'}"
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
import SexModel from "@/model/SexModel";

const props = defineProps({
  value: {type: [String]},
});
const emits = defineEmits(["sex"]);
const items = ref<SexModel[]>([])
const selected = ref<number | string>();
const isLoading = ref<boolean>()

onMounted(async () => {
  await getItems()
  selected.value = props.value ?? undefined
})

const getItems = async () => {
  try {
    items.value = await DataService.getSex()
  } catch (err) {
  }
}

const optionFilter = (input: string, item: any) => {
  return item.name.toLowerCase().indexOf(input.toLowerCase()) >= 0;
}

const onSelected = () => {
  const item = items.value.find(x => x.sex === selected.value)
  emits("sex", item?.sex);
}

watch(() => props.value, (val) => selected.value = val ?? undefined)
</script>

<style scoped>

</style>
