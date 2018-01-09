import { struct } from 'superstruct'

import translateApi from '@/api/index'
import serverAddress from '@/config/server-address.conf'

let API = {}
let SERVERHOST = {}

export function configServer (param) {
  const Param = struct({
    dest: struct.enum(['AWS']),
    autoAnswer: 'boolean?',
    needLog: 'boolean?',
    reportLog: 'boolean?'
  }, {
    autoAnswer: false,
    needLog: true,
    reportLog: true
  })

  Param(param)

  SERVERHOST = serverAddress[param.dest]
  API = translateApi(SERVERHOST)
  console.log(API)

  API.login.fire('', {
    username: '5001',
    password: 'Aa1234569',
    namespace: 'zhen04.cc'
  })
  .then((res) => {
    console.log(res)
  })
  .catch((err) => {
    console.error(err)
  })
}

export function logServerAddress () {
  console.log('sdfsdf')
  console.log(serverAddress)
  console.log('--------')

  const asss = [1, 2, 3]
  asss.forEach(element => {
    console.log(this.asss)
    console.log(element)
  })
}
