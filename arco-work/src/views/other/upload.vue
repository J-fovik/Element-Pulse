<template>
    <div >
        <a-card title="上传图片" style="height: calc(100vh - 98px);">
            <ol class="app-order-list px-3">
                <li>
                    <h3> 假设最多只能上传1张 </h3>
                    <UploadImg v-model:imageUrl="userInfo.avatar" :limit="uploadConfig1.limit" />
                </li>
                <li>
                    <h3> 假设最多只能上传3张 </h3>
                    <UploadImg v-model:imageUrl="userInfo.avatar" :data="uploadConfig2.data"
                        :headers="uploadConfig2.headers" />
                </li>
            </ol>
        </a-card>
    </div>
</template>
<script lang="ts" setup>
import { ref ,reactive} from 'vue';
import UploadImg from '@/components/UploadImg.vue'

// 上传配置
const uploadConfig1 = reactive({
    // 上传需要参数
    data: {},
    limit: 1,
    // 单个文件大小限制
    fileSize: 0.5,
})

const uploadConfig2 = reactive({
    // 上传需要参数
    data: {
        dir: 'avatar',
    },
    // auth
    headers: {
        Authorization: 'getToken()',
    },
    // 单个文件大小限制
    fileSize: 0.5,
})

const userInfo = reactive({
    avatar: '',
})


</script>