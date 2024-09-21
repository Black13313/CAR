<script setup lang="ts">

import Panel from "@/components/Layout/Panel.vue";
import UserOnlineTable from "@/views/UserandRole/Users/ClearUser/UserOnlineTable";
</script>

<template>
<div>
  <Panel class="px-4 py-4" title="ເຄຍຜູ້ໃຊ້ໃນລະບົບ">
    <a-table :columns="UserOnlineTable" :scroll="{ x: 1000 }"/>
  </Panel>
</div>
</template>

<style scoped>

</style>