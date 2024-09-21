<script setup lang="ts">
import Panel from "@/components/Layout/Panel.vue";
import { TransactionOutlined, ContactsOutlined } from '@ant-design/icons-vue';
import router from "@/router";

</script>
<template>
  <div>
    <panel class="px-4 py-4 h-full">
      <div class="flex gap-3">
        <div class="border border-gray-200 w-2/12 shadow rounded py-12 px- text-center" @click="router.push('/excagnge')">
          <div>
            <TransactionOutlined  :style="{fontSize: '32px', color: '#08c'}"/>
          </div>
          <p class="text-xl font-semibold">
            ຈັດການເລຣດເງິນ
          </p>
        </div>
        <div class="border border-gray-200 w-2/12 shadow rounded py-12 px- text-center" @click="router.push('/excagnge')">
          <div>
            <ContactsOutlined  :style="{fontSize: '32px', color: '#08c'}"/>
          </div>
          <p class="text-xl font-semibold">
            ຈັດການສາຂາ
          </p>
        </div>
      </div>
    </panel>
  </div>
</template>
