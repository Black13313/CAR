<script setup lang="ts">
import {computed, onMounted, ref} from 'vue';
import router from '@/router';
import {userStore} from "@/store/user";
import MenuModel from "@/model/MenuModel";

const openKeys = ref<string[]>(['']);
const collapsed = ref<boolean>(false);
const selectedKeys = ref<string[]>(['1']);
const user = userStore()

onMounted(async () => {
  console.log(user.getUserMenu(true));
})
const parentMenu = computed<MenuModel[]>(() => {
  return user.getUserMenu(true) as  MenuModel[];
});

const handleMenuSelect = (menu: MenuModel) => {
  if (menu?.route) {
    router.push(menu.route).catch(err => {
      console.error('Navigation Error:', err);
    });
  } else {
    console.warn('No route found for menu:', menu);
  }
}

</script>

<template>
    <a-layout-sider v-model:collapsed="collapsed" class="my-side-menu">
      <div class="h-full flex flex-col justify-center">
        <a-affix :offset-top="120">
        <div class="logo">
          <h1 class="text-white text-2xl text-center py-3 font-semibold">
            {{user.CompanyName}}
          </h1>
          <link rel="icon" type="image/svg+xml" href="/vite.svg"/>
        </div>
        <div>
          <ul class="my-menu">
            <template v-for="(menu, index) in parentMenu" :key="index">
              <!-- Parent menu item -->
              <li class="flex text-sm" @click="handleMenuSelect(menu)">
                <component :is="menu.icon"/>
                <p>{{menu.label}}</p>
              </li>

              <!-- Child menu items if any -->
              <ul v-if="menu.children" class="my-sub-menu">
                <li v-for="(child, childIndex) in menu.children" :key="childIndex" class="flex" @click="handleMenuSelect(child)">
                  <component :is="child.icon"/>
                  <p>{{child.label}}</p>
                </li>
              </ul>
            </template>
          </ul>
        </div>
        </a-affix>

      </div>
    </a-layout-sider>
</template>

<style scoped>
.my-side-menu.ant-layout-sider {
  position: relative;
  z-index: 1;
  @apply bg-gradient-to-br from-[#0DB5E8] to-[#008BCB];
}

.my-side-menu.ant-layout-sider::before {

  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0.1; /* Adjust opacity level */
  z-index: -1; /* Place behind the content */
  background-image: url("../../assets/wing.png");
  background-repeat: no-repeat;
  background-position: left bottom;
  background-size: 90%;
}

.my-menu {
  @apply text-xl text-white px-3;
}

.my-menu li {
  @apply flex items-center py-2 px-4 cursor-pointer hover:bg-white hover:text-[#008BCB] rounded-3xl;
}

.my-menu li p {
  @apply pt-1 pl-3;
}
</style>