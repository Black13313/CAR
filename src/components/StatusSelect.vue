<template>
  <a-select
      v-model:value="selected"
      show-search
      placeholder="ເລືອກສະຖານະ"
      :options="items"
      :field-names="{label: 'name', value: 'value'}"
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
import StatusModel from "@/model/StatusModel";

const props = defineProps({
  value: {type: [String]},
});
const emits = defineEmits(["value"]);
const items = ref<StatusModel[]>([])
const selected = ref<number | string>();
const isLoading = ref<boolean>()

onMounted(async () => {
  await getItems()
  selected.value = props.value ?? undefined
})

const getItems = async () => {
  try {
    items.value = await DataService.getStatus()
  } catch (err) {
  }
}

const optionFilter = (input: string, item: any) => {
  return item.name.toLowerCase().indexOf(input.toLowerCase()) >= 0;
}

const onSelected = () => {
  const item = items.value.find(x => x.value === selected.value)
  emits("value", item?.value);
}

watch(() => props.value, (val) => selected.value = val ?? undefined)
</script>

<style scoped>

</style>
