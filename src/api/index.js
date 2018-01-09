import qs from 'qs'
import cstaApiConfig from '@/config/api.conf'
import constant from '@/const/base'
import {
  templateQuery,
  myFetch
} from '@/util/index'

var ServerAddressConfig = {}
// let sdkHost = ''f
// let loginHost = ''
// let logHost = ''
// let httpProtocol = ''
// let wsProtocol = ''

function fire (queryParam = {}, body) {
  let url = templateQuery(this.path, queryParam)
  let host = ServerAddressConfig[this.serverAddress]
  url = ServerAddressConfig.httpProtocol + host + url
  let init = {
    method: this.method,
    headers: {
      'Content-Type': this.contentType || constant.json
    },
    mode: 'cors',
    cache: 'default'
  }

  if (body && init.headers['Content-Type'] === constant.json) {
    init.body = JSON.stringify(body)
  } else if (body && init.headers['Content-Type'] === constant.formData) {
    init.body = qs.stringify(body)
  }

  return myFetch(url, init)
}

function translateApi (_serverAddress) {
  ServerAddressConfig = _serverAddress
  let api = {}

  cstaApiConfig.forEach((item) => {
    api[item.name] = item
    api[item.name].fire = fire
  })

  return api
}

export default translateApi
