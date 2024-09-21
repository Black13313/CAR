<script setup lang="ts">
import {computed, onMounted, ref, watch} from "vue";
import dayjs from "dayjs";

const props = defineProps({
  value: {
    type: String,
  }
})
const emit = defineEmits(['input'])
const dateOfBirth = ref<string>('')
const formattedDateOfBirth = computed(() => {
  const dob = dateOfBirth.value;
  if (!dob) return "";

  const parts = dob.split("/");
  const day = parts[0] || "";
  const month = parts[1] || "";
  const year = parts[2] || "";

  return `${day.padStart(2, "0")}/${month.padStart(2, "0")}/${year.padStart(4, "0")}`;
})

onMounted(() => {
  if (props.value) dateOfBirth.value = props.value
})

const updateDateOfBirth = () => {
  const dob = dateOfBirth.value.replace(/\D/g, "");
  let day = dob.slice(0, 2);
  let month = dob.slice(2, 4);
  let year = dob.slice(4);
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();

  if (day && Number(day) <= 0) day = "0"
  if (Number(day) > 31) day = ""
  if (month && Number(month) <= 0) month = "0"
  if (Number(month) > 12) month = ""
  if (year.length === 4 && (Number(year) < 1970 || Number(year) > (currentYear + 30))) year = ""

  let formatted = day;
  if (month) formatted += `/${month}`;
  if (year) formatted += `/${year}`;

  dateOfBirth.value = formatted;
  emit('input', dateOfBirth.value.slice(0, 10))
}

const onBlur = () => {
  const dob = dateOfBirth.value.replace(/\D/g, "");
  const date = dayjs(dateOfBirth.value, 'DD/MM/YYYY').format('YYYY-MM-DD')
  const year = dob.slice(4);

  if (!dayjs(date).isValid() || `${year}`.length !== 4) {
    dateOfBirth.value = '';
  }
}

watch(() => props.value, (val) => {
  if (val) dateOfBirth.value = val
  if (!val) dateOfBirth.value = ''
})

watch(() => dateOfBirth.value, (val) => {
  if (val.length >= 10) dateOfBirth.value = val.slice(0, 10);
})
</script>

<template>
  <a-input v-model:value="dateOfBirth"
           size="large"
           @input="updateDateOfBirth"
           @blur="onBlur"
           autocomplete="off"
           placeholder="ວວ/ດດ/ປປປປ"/>
</template>

<style scoped>

</style>