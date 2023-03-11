import { ss } from '@/utils/storage'

const LOCAL_NAME = 'chatStorage'

export function defaultState(): Chat.ChatState {
  const uuid = Date.now()
  return { active: uuid, history: [{ uuid, title: 'New Chat', isEdit: false }], chat: [{ uuid, data: [] }] }
  // chatStore.addHistory({ title: 'New Chat', uuid: Date.now(), isEdit: false })
}

export function getLocalState(): Chat.ChatState {
  const localState = ss.get(LOCAL_NAME)
  console.log('========')
  return localState ?? defaultState()
}

export function setLocalState(state: Chat.ChatState) {
  ss.set(LOCAL_NAME, state)
}
