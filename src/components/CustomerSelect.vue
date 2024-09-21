<template>
  <a-select
      v-model:value="selected"
      show-search
      placeholder="ເລືອກລູກຄ້າ"
      :options="items"
      :field-names="{label: 'custName', value: 'id'}"
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
import UserService from "@/service/UserService";
import CustomerModel from "@/model/CustomerModel";
const props = defineProps({
  value: {type: Number || String},
});
const emits = defineEmits(["selected"]  );
const items = ref<CustomerModel[]>([])
const selected = ref<number>();
const isLoading = ref<boolean>()

onMounted(async () => {
  await getItems()
  selected.value = props.value ?? undefined
})

const getItems = async () => {
  try {
    const payload = {
      pagesize: 0,
      pagenumber: 0,
      searchtext: ""
    }
    const cu = await UserService.getCustomer(payload)
    items.value = [{
      id: 0,
      custName: 'ລູກຄ້າທັງໝົດ'
    }, ...cu]
  } catch (err) {
  }
}

const optionFilter = (input: string, item: any) => {
  return item.name.toLowerCase().indexOf(input.toLowerCase()) >= 0;
}

const onSelected = () => {
  emits("selected", selected.value);
  const item = items.value.find(x => x.id === selected.value)
}

watch(() => props.value, (val) => selected.value = val ?? undefined)
</script>

<style scoped>

</style>
