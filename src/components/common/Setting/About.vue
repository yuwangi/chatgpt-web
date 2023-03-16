<script setup lang='ts'>
import { onMounted, ref } from 'vue'
import { NImage, NSpin } from 'naive-ui'
import { fetchChatConfig } from '@/api'

interface ConfigState {
  timeoutMs?: number
  reverseProxy?: string
  apiModel?: string
  socksProxy?: string
  httpsProxy?: string
}

const loading = ref(false)

const config = ref<ConfigState>()

async function fetchConfig() {
  try {
    loading.value = true
    const { data } = await fetchChatConfig<ConfigState>()
    config.value = data
  }
  finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchConfig()
})
</script>

<template>
  <NSpin :show="loading">
    <div class="p-4 space-y-4">
      <div class="p-2 space-y-2 flex items-center justify-center">
        <!-- <NImageGroup> -->
        <!-- <NSpace> -->
        <div>
          <div class="font-bold text-md mb-3">
            微信交流群
          </div>
          <NImage
            width="300"
            src="https://yuwangi-1308727407.cos.ap-chengdu.myqcloud.com/qun-liao-p1.jpg"
          />
        </div>
        <div class="ml-8">
          <div class="font-bold text-md mb-3">
            商务合作
          </div>
          <NImage
            width="300"
            src="https://yuwangi-1308727407.cos.ap-chengdu.myqcloud.com/wechat.jpg"
          />
        </div>
        <!-- </NSpace> -->
        <!-- </NImageGroup> -->
      </div>
      <!-- <p>{{ $t("setting.api") }}：{{ config?.apiModel ?? '-' }}</p>
      <p>{{ $t("setting.reverseProxy") }}：{{ config?.reverseProxy ?? '-' }}</p>
      <p>{{ $t("setting.timeout") }}：{{ config?.timeoutMs ?? '-' }}</p>
      <p>{{ $t("setting.socks") }}：{{ config?.socksProxy ?? '-' }}</p> -->
    </div>
  </NSpin>
</template>
