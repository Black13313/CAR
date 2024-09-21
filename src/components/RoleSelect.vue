<template>
  <a-select
      v-model:value="selected"
      show-search
      placeholder="ເລືອກສິດນຳໃຊ້"
      :options="items"
      :field-names="{label: 'code', value: 'id'}"
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
import RoleModel from "@/model/RoleModel";
const props = defineProps({
  value: {type: Number || String},
});
const emits = defineEmits(["selected"]  );
const items = ref<RoleModel[]>([])
const selected = ref<number>();
const isLoading = ref<boolean>()

onMounted(async () => {
  await getItems()
  selected.value = props.value ?? undefined
})

const getItems = async () => {
  try {
    const role = await UserService.getRole()
    items.value = [{
      id: 0,
      code: 'ສິດນຳໃຊ້ທັງໝົດ'
    }, ...role]
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
