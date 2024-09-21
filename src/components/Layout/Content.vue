<script setup lang="ts">
import IconLogout from "@/components/Icon/IconLogout.vue";
import IconAllow from "@/components/Icon/IconAllow.vue";
import {userStore} from "@/store/user";

const user = userStore()

</script>

<template>
  <a-layout-content style="margin: 0 16px" class="">
    <div class="flex flex-col">
      <div>
        <div class="justify-end flex gap-3  mt-4">
          <div class="bg-white rounded-full px-6 shadow">
            <div class="mt-6">
              <IconAllow/>
            </div>
          </div>
          <div class=" py-4 w-96 px-4 bg-white rounded-3xl flex shadow">
            <div class="flex items-center gap-2">
              <div>
                <a-avatar
                    src="https://joeschmoe.io/api/v1/random"/>
              </div>
              <div>
                <a>{{ user.FirstName }} {{ user.LastName }}</a>
                <div>
                  <a>{{ user.username }}</a>
                </div>
              </div>
              <div class="justify-end ml-44 flex text-end">
                <div>
                  <IconLogout @click="user.clearUserData"/>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
      <router-view class="mt-4"/>
    </div>
  </a-layout-content>
</template>

<style scoped>

</style>