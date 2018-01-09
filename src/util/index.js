/* global fetch */
import 'whatwg-fetch'
const templateRE = /{{([^}]+)?}}/

export function templateQuery (tpl = '', data = {}) {
  var match = ''

  while ((match = templateRE.exec(tpl))) {
    tpl = tpl.replace(match[0], data[match[1]])
  }

  return tpl
}

export function myFetch (url, init) {
  return new Promise((resolve, reject) => {
    fetch(url, init)
    .then((res) => {
      if (res.ok) {
        if (res.headers.get('content-type').includes('application/json')) {
          resolve(res.json())
        }
      } else {
        reject(res)
      }
    })
    .catch((err) => {
      reject(err)
    })
  })
}
