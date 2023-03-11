<script setup lang='ts'>
import { onMounted, ref } from 'vue'
import { NImage, NSpin } from 'naive-ui'
import { fetchChatConfig } from '@/api'

interface ConfigState {
  timeoutMs?: number
  reverseProxy?: string
  apiModel?: string
  socksProxy?: string
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
      <div class="p-2 space-y-2 flex items-center justify-center dark:bg-neutral-700">
        <!-- <NImageGroup> -->
        <!-- <NSpace> -->
        <div>
          <div class="font-bold text-md mb-3">
            微信交流群
          </div>
          <NImage
            width="300"
            src="http://101.200.160.219:8888/down/W8wso5BddSJb"
          />
        </div>
        <div class="ml-8">
          <div class="font-bold text-md mb-3">
            作者
          </div>
          <NImage
            width="300"
            src="http://101.200.160.219:8888/down/yCWy3hhvhrgM"
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
