<template>
  <a-select
      v-model:value="selected"
      show-search
      placeholder="ເລືອກສາຂາ"
      :options="items"
      :field-names="{label: 'Branch', value: 'Id'}"
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
import RoleModel from "@/model/RoleModel";
import DataService from "@/service/DataService";
import {userStore} from "@/store/user";
const props = defineProps({
  value: {type: Number || String},
});
const emits = defineEmits(["selected"]  );
const items = ref<RoleModel[]>([])
const selected = ref<number>();
const isLoading = ref<boolean>()
const user = userStore()
onMounted(async () => {
  await getItems()
  selected.value = props.value ?? undefined
})

const getItems = async () => {
  try {
    const cu = await DataService.getBranchCompany(user.CompanyId)
    items.value = [{
      Id: 0,
      Branch: 'ສາຂາທັງໝົດ'
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
