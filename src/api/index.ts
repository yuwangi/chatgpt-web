import type { AxiosProgressEvent, GenericAbortSignal } from 'axios'
import { post } from '@/utils/request'
import { getToken } from '@/store/modules/auth/helper'
import { enCrypto } from '@/utils/crypto/index'
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
    onDownloadProgress?: (progressEvent: AxiosProgressEvent) => void },
) {
  const times = new Date().getTime()
  const random = times.toString().slice(-5)
  return post<T>({
    url: '/chat-process',
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
