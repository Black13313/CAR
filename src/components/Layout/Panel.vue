<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    default: 'Title'
  },
  noAction: {
    type: Boolean,
    default: false
  }
});
</script>

<template>
  <div class="bg-white rounded-lg shadow">
    <slot/>
  </div>
</template>

<style scoped>

</style>
