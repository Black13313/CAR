<template>
  <header>
    <div class="max-w-screen">
      <div class="sm:flex sm:items-center sm:justify-between mb-3 text-xl font-bold text-black">
        {{ title }}

      </div>
      <a-breadcrumb-item v-if="routePath.length > 3">
        {{ capitalize(routePath[3]) }}
      </a-breadcrumb-item>
    </div>
  </header>
</template>

<script setup lang="ts">
import { capitalize } from "@/util/helper";
import { useRoute } from "vue-router";
import { ref, computed, watch } from "vue";

const route = useRoute();
const routePath = ref<string[]>([]);

watch(() => route.path, currentPath => {
  routePath.value = currentPath.split("/");
});

const isCustomerRoute = computed(() => route.path.startsWith("/customer"));

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

<style scoped>
/* Add your scoped styles here */
</style>
