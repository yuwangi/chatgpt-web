import CryptoJS from 'crypto-js'

const CryptoSecret = '__nana5201314__'

// interface EnParam {
//   data?: any
//   random?: number | string
// }

export function enCrypto(data: any, random?: number | string) {
  const str = JSON.stringify(data)
  const secret = random ? `__haha${random}343046650__` : CryptoSecret
  return CryptoJS.AES.encrypt(str, secret).toString()
}

export function deCrypto(data: any, random?: number | string) {
  const bytes = CryptoJS.AES.decrypt(data, `__haha${random}343046650__`)
  const str = bytes.toString(CryptoJS.enc.Utf8)

  if (str)
    return JSON.parse(str)

  return null
}
declare global {
  interface Window {
    mozRTCPeerConnection?: typeof RTCPeerConnection
    webkitRTCPeerConnection?: typeof RTCPeerConnection
  }
}

interface RTCSessionDescriptionInit {
  sdp?: string
  type?: RTCSdpType
}

// 获取客户端IP
export function getUserIP(onNewIP: (ip: string) => void): void {
  const MyPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection
  const pc: RTCPeerConnection = new MyPeerConnection({
    iceServers: [],
  })
  const noop: () => void = () => {}
  const localIPs: { [key: string]: boolean } = {}
  const ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g
  const iterateIP: (ip: string) => void = (ip: string) => {
    if (!localIPs[ip])
      onNewIP(ip)
    localIPs[ip] = true
  }
  pc.createDataChannel('')
  pc.createOffer()
    .then((sdp: RTCSessionDescriptionInit) => {
      const text = sdp.sdp || ''
      text.split('\n').forEach((line: string) => {
        if (!line.includes('candidate'))
          return
        line.match(ipRegex)?.forEach(iterateIP)
      })
      pc.setLocalDescription(sdp, noop, noop)
    })
    .catch((reason: any) => {})
  pc.onicecandidate = (ice: RTCPeerConnectionIceEvent) => {
    if (
      !ice
      || !ice.candidate
      || !ice.candidate.candidate
      || !ice.candidate.candidate.match(ipRegex)
    )
      return
    ice.candidate.candidate.match(ipRegex)?.forEach(iterateIP)
  }
}
