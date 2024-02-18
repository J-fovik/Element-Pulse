<template>
    <!-- 宽度根据仓库存储设置 -->
    <div class="f-menu" :style="{ width: $store.state.asideWidth }">
        <el-menu :default-active="defaultActive" unique-opened :collapse="isCollapse" default-active="2" class="border-0"
            @select="handleSelect" :collapse-transition="false">

            <template v-for="(item, index) in asideMenus" :key="index">
                <!-- 当路由菜单有二级路由时 -->
                <el-sub-menu v-if="item.child && item.child.length > 0" :index="item.name">
                    <template #title>
                        <el-icon>
                            <component :is="item.icon"></component>
                        </el-icon>
                        <span>{{ item.name }}</span>
                    </template>
                    <!-- 遍历二级路由 -->
                    <el-menu-item v-for="(k, i) in item.child" :key="i" :index="k.frontpath">
                        <el-icon>
                            <component :is="k.icon"></component>
                        </el-icon>
                        <span>{{ k.name }}</span>
                    </el-menu-item>
                </el-sub-menu>
                <!-- 只有一级路由 -->
                <el-menu-item v-else :index="item.frontpath">
                    <el-icon>
                        <component :is="item.icon"></component>
                    </el-icon>
                    <span>{{ item.name }}</span>
                </el-menu-item>
            </template>
        </el-menu>
    </div>
</template>
<script setup>
import { computed, ref } from 'vue';
import { useRouter, useRoute ,onBeforeRouteUpdate} from 'vue-router';
import { useStore } from 'vuex';
const router = useRouter()
const store = useStore()
const route = useRoute()

// 默认选中
const defaultActive = ref(route.path)
// 监听路由变化
onBeforeRouteUpdate((to,from)=>{
    // 赋值
    defaultActive.value = to.path
})
// 是否折叠
const isCollapse = computed(() => !(store.state.asideWidth == '250px'))
// 侧边路由数组
const asideMenus = computed(() => store.state.menus)
// 点击跳转响应页面函数,传值index的值
const handleSelect = (e) => {
    router.push(e)
}
</script>
<style>
.f-menu {
    transition: all 0.2s;
    top: 64px;
    bottom: 0;
    left: 0;
    overflow-y: auto;
    overflow-x: hidden;
    @apply shadow-md fixed bg-light-50;
}
/* 滚动条样式 */
.f-menu::-webkit-scrollbar {
    width: 0px;
}
</style>