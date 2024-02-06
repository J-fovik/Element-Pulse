<script setup lang="ts">
import { Gitee } from '@/config/constants'
import Hamburger from '@/components/Hamburger/index.vue' // 展开收起
import FullScreen from '@/components/FullScreen/index.vue' // 全屏非全屏
import BreadCrumb from '@/components/BreadCrumb/index.vue' // 面包屑
import useUserStore from '@/store/modules/user'
import { useRouter } from 'vue-router'
import { useAppStore } from '@/store'

const userStore = useUserStore()
const appStore = useAppStore()
const router = useRouter()
const nickname = 'admin'
// 点击设置按钮
const setVisible = () => {
  appStore.updateSettings({ globalSettings: true })
}
// 点击退出登录
const logout = async () => {
  await userStore.logout()
  // 去登录页
  router.push('/login')
}
</script>
<template>
  <a-layout-header class="app-header">
    <Hamburger />
    <BreadCrumb />
    <div class="app-helper-menu">
      <ul class="header-dropdown-wrap">
        <li> <FullScreen /></li>
        <li>
          <a-tooltip content="设置">
            <a-button class="nav-btn" type="outline" :shape="'circle'" @click="setVisible">
              <template #icon>
                <icon-settings />
              </template>
            </a-button>
          </a-tooltip>
        </li>
        <li>
          <a-dropdown class="app-overlay-menu" trigger="hover">
            <div>
              <img class="app-header-avatar" alt="avatar" src="@/assets/images/avatar.png" />
              <span className="app-name">{{ nickname }}</span>
            </div>
            <template #content>
              <a-doption>
                <a-space>
                  <icon-home />
                  <a-link @click="$router.push({ name: 'dashboard' })">首页</a-link>
                </a-space>
              </a-doption>
              <a-doption>
                <a-space>
                  <icon-github />
                  <a-link :href="Gitee" target="_blank" rel="noopener noreferrer">项目地址</a-link>
                </a-space>
              </a-doption>
              <a-divider />
              <a-doption @click="logout">
                <a-space>
                  <icon-export />
                  <span>登出</span>
                </a-space>
              </a-doption>
            </template>
          </a-dropdown>
        </li>
      </ul>
    </div>
  </a-layout-header>
</template>
