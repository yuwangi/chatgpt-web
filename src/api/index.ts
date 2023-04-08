import type { AxiosProgressEvent, GenericAbortSignal } from 'axios'
import { post } from '@/utils/request'
import { getToken } from '@/store/modules/auth/helper'
import { enCrypto } from '@/utils/crypto/index'
import { useAuthStore, useSettingStore } from '@/store'

export function fetchChatAPI<T = any>(
  prompt: string,
  options?: { conversationId?: string; parentMessageId?: string },
  signal?: GenericAbortSignal,
) {
  return post<T>({
    url: '/chat',
    data: { prompt, options },
    signal,
  })
}

export function fetchChatConfig<T = any>() {
  return post<T>({
    url: '/config',
  })
}

export function fetchChatAPIProcess<T = any>(
  params: {
    prompt: string
    options?: { conversationId?: string; parentMessageId?: string }
    signal?: GenericAbortSignal
    model?: string
    onDownloadProgress?: (progressEvent: AxiosProgressEvent) => void },
) {
  const settingStore = useSettingStore()
  const authStore = useAuthStore()
  const times = new Date().getTime()
  const random = times.toString().slice(-5)

  let data: Record<string, any> = {
    prompt: params.prompt,
    options: params.options,
    secretKey: getToken(),
    random,
    salt: enCrypto(`yuwangifeng${params.prompt.length}19901102${random}`, `${random}`),
  }

  if (authStore.isChatGPTAPI) {
    data = {
      ...data,
      systemMessage: settingStore.systemMessage,
      temperature: settingStore.temperature,
      top_p: settingStore.top_p,
    }
  }
  console.log(params.model)
  return post<T>({
    url: params.model === 'gpt-3.5' ? '/proxy-api/chat-process' : '/proxy-api/chat-process4',
    data,
    signal: params.signal,

    onDownloadProgress: params.onDownloadProgress,
  })
}

export function fetchBingAPIProcess<T = any>(
  params: {
    prompt: string
    options?: { jailbreakConversationId?: string; parentMessageId?: string }
    signal?: GenericAbortSignal
    onDownloadProgress?: (progressEvent: AxiosProgressEvent) => void },
) {
  const times = new Date().getTime()
  const random = times.toString().slice(-5)

  return post<T>({
    url: '/chat-bing-api/bing-process',
    data: { secretKey: getToken(), random, prompt: params.prompt, times, options: params.options, salt: enCrypto(`yuwangifeng${params.prompt.length}19901102${random}`, `${random}`) },
    signal: params.signal,

    onDownloadProgress: params.onDownloadProgress,
  })
}

export function fetchVerify<T = any>(token: string) {
  return post<T>({
    url: '/verify',
    data: { token },
  })
}

export function deduction<T = any>(params: { balance: number }) {
  return post<T>({
    url: '/deduction',
    data: { secretKey: getToken(), balance: params.balance },
  })
}
export function getBalance<T = any>() {
  return post<T>({
    url: '/getBalance',
    data: { secretKey: getToken() },
  })
}

export function fetchSession<T>() {
  return post<T>({
    url: '/session',
  })
}
