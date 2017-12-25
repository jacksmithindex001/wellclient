const config = {
  indexPageUrl: '../../index.html',
  yes: 'yes',
  no: 'no'
}

var DB = {}
DB.get = function (key) {
  return localStorage.getItem(key)
}
DB.set = function (key, value) {
  if (typeof key !== 'string') {
    throw new TypeError('key must string type')
  }
  value = typeof value === 'string' ? value : JSON.stringify(value)
  localStorage.setItem(key, value)
}

var cache = {
  tabId: null,
  opened: false
}

var chrome = window.chrome
var localStorage = window.localStorage

var RSS = {}

RSS.updateTab = function (tabId, option) {
  chrome.tabs.update(tabId, option)
}

RSS.onClickBrowserAction = function () {
  if (localStorage.getItem('opened')) {
    RSS.updateTab(cache.tabId, {active: true})
  } else {
    chrome.tabs.create({url: config.indexPageUrl}, function (tab) {
      localStorage.setItem('opened', true)
      cache.opened = true
      cache.tabId = tab.id
    })
  }
}

RSS.onRemovedTab = function (tab) {
  if (tab.id === cache.tabId) {
    localStorage.setItem('opened', false)
    cache.opened = false
    cache.tabId = null
  }
}

chrome.browserAction.onClicked.addListener(RSS.onClickBrowserAction)
chrome.tabs.onRemoved.addListener(RSS.onRemovedTab)
