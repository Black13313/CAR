<script setup lang="ts">
import Content from "@/components/Layout/Content.vue";
import Header from "@/components/Layout/Header.vue";
import SideLayout from "@/components/Layout/SideLayout.vue";
import LoginPage from "@/views/HomePage/LoginPage.vue";
import {userStore} from "@/store/user";
import router from "@/router";
import {onMounted} from "vue";

const userState = userStore()
onMounted(async () => {
  if (!userState?.isAuthenticated()) {
    return router.push('/login')
  } else {
  }
})
</script>

<template>
  <a-layout style="min-height: 100vh"
            v-if="userState?.isAuthenticated()">
    <SideLayout/>
    <Header/>
    <Content/>
  </a-layout>
  <LoginPage v-else/>
</template>

<style scoped>

</style>
