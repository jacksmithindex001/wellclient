import qs from 'qs'
import cstaApiConfig from '@/config/cata-api'
import constant from '@/config/constant'
import {
  templateQuery,
  myFetch
} from '@/util/index'

var serverAddress = {}
// let sdkHost = ''f
// let loginHost = ''
// let logHost = ''
// let httpProtocol = ''
// let wsProtocol = ''

function fire (queryParam = {}, body) {
  let url = templateQuery(this.path, queryParam)
  let init = {
    method: this.method,
    headers: {
      contentType: this.contentType || constant.json
    },
    mode: 'cors',
    cache: 'default'
  }

  if (body && init.headers.contentType === constant.json) {
    init.body = JSON.stringify(body)
  } else if (body && init.headers.contentType === constant.formData) {
    init.body = qs.stringify(body)
  }

  return myFetch(url, body)
}

function translateApi (_serverAddress) {
  serverAddress = _serverAddress
  let api = {}

  cstaApiConfig.forEach((item, key) => {

  })

  return api
}

export default translateApi
