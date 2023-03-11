import { ss } from '@/utils/storage'

const LOCAL_NAME = 'userStorage'

export interface UserInfo {
  avatar?: string
  name: string
  description: string
}

export interface UserState {
  userInfo: UserInfo
}

export function defaultSetting(): UserState {
  return {
    userInfo: {
      // avatar: 'https://yuwangi.github.io/images/20190930145233.jpg',
      name: 'User',
      description: '欢迎加入 <a class="text-blue-500 cursor-pointer" target="_blank" href="http://101.200.160.219:8888/down/W8wso5BddSJb">群组</a> | <a class="text-blue-500 cursor-pointer" target="_blank" herf="http://101.200.160.219:8888/down/yCWy3hhvhrgM">作者</a>',
    },
  }
}

export function getLocalState(): UserState {
  const localSetting: UserState | undefined = ss.get(LOCAL_NAME)
  return { ...defaultSetting(), ...localSetting }
}

export function setLocalState(setting: UserState): void {
  ss.set(LOCAL_NAME, setting)
}
