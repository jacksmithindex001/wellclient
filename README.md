# wellClient

![](https://img.shields.io/badge/code_style-standard-brightgreen.svg) ![GitHub release](https://img.shields.io/github/release/wangduanduan/wellclient.svg) ![GitHub last commit](https://img.shields.io/github/last-commit/wangduanduan/wellclient.svg) ![GitHub issues](https://img.shields.io/github/issues/wangduanduan/wellclient.svg) ![GitHub closed issues](https://img.shields.io/github/issues-closed/wangduanduan/wellclient.svg)

:iphone: :phone: :telephone_receiver: :headphones:  welljoint softphone js sdk for browser :information_desk_person: :person_with_pouting_face: 

## 浏览器支持

![Chrome](https://raw.github.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png) | ![Firefox](https://raw.github.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png) | ![Safari](https://raw.github.com/alrra/browser-logos/master/src/safari/safari_48x48.png) | ![Opera](https://raw.github.com/alrra/browser-logos/master/src/opera/opera_48x48.png) | ![Edge](https://raw.github.com/alrra/browser-logos/master/src/edge/edge_48x48.png) | ![IE](https://raw.github.com/alrra/browser-logos/master/src/archive/internet-explorer_9-11/internet-explorer_9-11_48x48.png) |
--- | --- | --- | --- | --- | --- |
Latest ✔ | Latest ✔ | Latest ✔ | Latest ✔ | Latest ✔ | 11 ✔ |


# 目录

- [快速开始](./docs/quick-start.md)
  - 运行项目和在线demo
  - 硬件要求
  - 软件要求
  - 引入JS文件
  - 配置
  - 登录
  - 调试
  - wellPhone相关
- [wellClient 核心方法说明](./docs/core-api.md)
  - wellClient.useConfig(envName): 使用配置 :white_check_mark:
  - wellClient.setConfig(config)：设置配置信息 :white_check_mark:
  -  wellClient.agentLogin(agent): 座席登录 :white_check_mark:
  - wellClient.logout()：座席登出 :white_check_mark:
  - wellClient.setAgentMode(mode)：设置座席状态 :white_check_mark:
  - wellClient.makeCall(phoneNumber, oprtions)：拨打电话 :white_check_mark:
  - wellClient.answerCall(callId)：接听电话 :white_check_mark:
  - wellClient.dropConnection(callId)：挂断链接 :white_check_mark:
  - wellClient.holdCall(callId)：保持电话 :white_check_mark:
  - wellClient.retrieveCall(callId)：取回电话 :white_check_mark:
  - wellClient.singleStepTransfer(callId,phoneNumber)：单步转移 :white_check_mark:
  - wellClient.singleStepConference(callId,phoneNumber,type)：单步会议 :white_check_mark:
  - wellClient.consult(holdCallId,phoneNumber)：咨询 :white_check_mark:
  - wellClient.conference(holdCallId, consultCallId)：会议 :white_check_mark:
  - wellClient.cancelConsult(holdCallId, consultCallId)：取消咨询 :white_check_mark:
  - wellClient.transferCall(holdCallId, consultCallId)：咨询后转移 :white_check_mark:
  - wellClient.setCallData(callId, data)：设置随路数据 :no_entry_sign:
  - wellClient.getCallData(callId)：获取随路数据 :no_entry_sign:
  - wellClient.getMyPrefix()：获取当前座席可用的前缀号码 :white_check_mark:
  - wellClient.isLogined()：获取当前座席是否登录 :white_check_mark:
  - wellClient.getConfig()：获取配置信息 :white_check_mark:
  - wellClient.getWs()：获取WebSocket对象 :white_check_mark:
  - wellClient.checkRecoverStateAbility(option)：检查恢复状态能力 :white_check_mark:
  - wellClient.stopRecording()：停止录音 :white_check_mark:
  - wellClient.startRecording()：开启录音 :white_check_mark:
  - wellClient.parkIvr(callId, ivr)：寄存IVR :construction:
  - wellClient.agentGreeting(callId, msg)：播报语音 :construction:
- [事件订阅](./docs/event-register.md)
  - wellClient.on(eventName,callback):事件订阅函数 :white_check_mark:
  - wellClient.innerOn(evnentName, callback(data){}): 订阅内部事件 :white_check_mark:
  - 订阅挂断事件：connectionCleared
  - 订阅登录失败事件：loginFailed
  - 订阅websocket断开事件：wsDisconnected
  - 订阅状态恢复成功事件：recoverStateSuccess
  - wellClient.exports=function(event){}: 所有事件的回调函数 :white_check_mark:
  - wellClient.onLog=function(msg){}: 所有日志的回调函数 :white_check_mark:
- [事件顺序说明](./docs/event-order.md)
- [事件及其数据结构](./docs/event-struct.md)
  - agentLoggedOn：座席登录事件
  - agentLoggedOff：座席登出事件
  - agentReady：座席就绪事件
  - agentNotReady：座席离席事件
  - serviceInitiated：初始化事件
  - originated：呼出事件
  - delivered：振铃事件
  - established：接通事件
  - connectionCleared：呼叫挂断事件
  - transferred：转移事件
  - conferenced：会议事件
  - retrieved：取回事件
  - held：保持事件
  - agentWorkingAfterCall：座席话后处理事件
  - agentAllocated：座席预占事件
  - recordStarted: 录音开始事件
  - recordStopped: 录音停止事件
  - failed: 外呼失败事件
- [强制操作接口](./docs/force-api.md)
  - wellClient.forceDrop(deviceId, callId): 强拆 :white_check_mark:
  - wellClient.forceJoin(deviceId, callId, phoneNumber): 强插 :white_check_mark:
  - wellClient.forceTake(deviceId, callId, phoneNumber): 接管 :white_check_mark:
  - wellClient.forceListen(callId, deviceId): 监听 :white_check_mark:
  - wellClient.forceReady(agentId, deviceId): 强制就绪 :white_check_mark:
  - wellClient.forceNotReady(agentId, deviceId):强制离席 :white_check_mark:
  - wellClient.forceLogout(agentId, deviceId): 强制签出 :white_check_mark:
- [调试工具](./docs/debug-tool.md)
- [FAQ](./docs/faq.md)
  - 点了某个按钮后，页面没有任何反应
  - 为什么我的页面没有wellClient的全局变量
  - 为什么我在电脑上登录了wellPhone，但是页面软电话登录的时候，还是报错说分机未注册
  - 页面刷新或者关闭后，软电话（即指wellClient）是否会自动登出？
  - 如果断网了，软电话是否会自动登出?
  - 软电话使用了websocket，如果因为网络不稳定，websocket断开后，是否会自动重连。
  - 软电话对浏览器有什么要求，IE浏览器支持到什么版本？
  - 直接转分机的号码形式
  - 我的浏览器支持websocket, 为什么无法建立websocekt连接
  - 从日志看收到了某个事件，但是页面没有变化。例如收到接通事件，页面按钮都没变
  - 如何下载日志？
  - 呼出就秒挂
  - 外线挂断后，软电话收不到挂断事件，软电话主动挂断却可以收到挂断事件
