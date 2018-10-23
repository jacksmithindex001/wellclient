<!-- TOC -->

- [1. 调试工具](#1-调试工具)
  - [1.1. wellClient.getCallMemory(): 获取wellClient内部数据](#11-wellclientgetcallmemory-获取wellclient内部数据)
  - [1.2. wellClient.log(msg): 输出日志信息](#12-wellclientlogmsg-输出日志信息)
  - [1.3. wellClient.error(msg): 输出错误日志信息](#13-wellclienterrormsg-输出错误日志信息)
  - [1.4. wellClient.setDebug(isDebug): 输出错误日志信息](#14-wellclientsetdebugisdebug-输出错误日志信息)
  - [1.5. wellClient.isPhoneNumber(phoneNumber): 判断字符串是否是合法的号码](#15-wellclientisphonenumberphonenumber-判断字符串是否是合法的号码)
  - [1.6. 事件日志方法](#16-事件日志方法)
  - [1.7. wellClient.getLog(): 获取所有事件日志, 日志会在控制台输出](#17-wellclientgetlog-获取所有事件日志-日志会在控制台输出)
  - [1.8. wellClient.downloadLog()：下载所有事件日志，日志文件会以txt格式下载](#18-wellclientdownloadlog下载所有事件日志日志文件会以txt格式下载)
  - [1.9. wellClient.enableLog(): 启用事件日志记录功能](#19-wellclientenablelog-启用事件日志记录功能)
  - [1.10. wellClient.disableLog(): 禁用事件日志记录功能](#110-wellclientdisablelog-禁用事件日志记录功能)

<!-- /TOC -->

# 1. 调试工具
## 1.1. wellClient.getCallMemory(): 获取wellClient内部数据

`Example`

```
wellClient.getCallMemory()
```

[⬆ 回到顶部](#1-调试工具)

## 1.2. wellClient.log(msg): 输出日志信息

参数 | 类型 | 是否必须 |  默认值 | 描述
---|---|---|---|---
msg | string,object,array,... | 否 |  | 变量名

`Example`

```
wellClient.log('test');
```

[⬆ 回到顶部](#1-调试工具)

## 1.3. wellClient.error(msg): 输出错误日志信息

参数 | 类型 | 是否必须 |  默认值 | 描述
---|---|---|---|---
msg | string,object,array,... | 否 |  | 变量名

`Example`

```
wellClient.error('test');
```

[⬆ 回到顶部](#1-调试工具)

## 1.4. wellClient.setDebug(isDebug): 输出错误日志信息

参数 | 类型 | 是否必须 |  默认值 | 描述
---|---|---|---|---
isDebug | boolean | 是 |  | 变量名

`Example`

```
wellClient.setDebug(true);
```

[⬆ 回到顶部](#1-调试工具)

## 1.5. wellClient.isPhoneNumber(phoneNumber): 判断字符串是否是合法的号码

参数 | 类型 | 是否必须 |  默认值 | 描述
---|---|---|---|---
phoneNumber | string | 是 |  | 变量名

`Example`

```
// 因为不仅仅有手机号，还有分机号，所以isPhoneNumber函数只是去验证传入的字符串是否全是数字
wellClient.isPhoneNumber('144124');
```

[⬆ 回到顶部](#1-调试工具)

## 1.6. 事件日志方法

- 事件日志最多记录2500行日志, 超出会自动覆盖
- 事件记录是异步的记录，降低对页面其他业务的影响
- 日志功能默认开启
- 可以通过wellClient.disableLog()关闭日志记录功能。
- 每次登出后，日志会自动清空

[⬆ 回到顶部](#1-调试工具)

## 1.7. wellClient.getLog(): 获取所有事件日志, 日志会在控制台输出
## 1.8. wellClient.downloadLog()：下载所有事件日志，日志文件会以txt格式下载
## 1.9. wellClient.enableLog(): 启用事件日志记录功能
## 1.10. wellClient.disableLog(): 禁用事件日志记录功能

示例：

```
> wellClient.getEventLog()
08:00:00.000 "---- Session started: Wed May 17 2017 19:46:46 GMT+0800 (中国标准时间) ----

[2017-05-17 19:46:53]: {"eventName":"agentLoggedOn","eventTime":"2017.05.17 19:46:53","eventType":"agent","serial":8343236,"params":{"_amqpTopic":"event.csta.zhen04.cc","agent":"5006@zhen04.cc","subscriptionId":"http%3A%2F%2F172.20.1.113%3A58080%2Fevent-sink%2Fcsta%2Fzhen04.cc"},"_type":"component.cti.event.AgentLoggedOnEvent","topics":["agentLoggedOn","agent:5006@zhen04.cc","device:8006@zhen04.cc","agent:zhen04.cc","CtiRouter_ctirouter-757zm","agent","csta"],"namespace":"zhen04.cc","srcDeviceId":"8006@zhen04.cc","deviceId":"8006@zhen04.cc","agentId":"5006@zhen04.cc","agentMode":"NotReady","devices":{"Voice":"8006@zhen04.cc"}}

[2017-05-17 19:46:53]: {"eventName":"agentNotReady","eventTime":"2017.05.17 19:46:53","eventType":"agent","serial":8343237,"params":{"_amqpTopic":"event.csta.zhen04.cc","agent":"5006@zhen04.cc","subscriptionId":"http%3A%2F%2F172.20.1.113%3A58080%2Fevent-sink%2Fcsta%2Fzhen04.cc"},"_type":"component.cti.event.AgentNotReadyEvent","topics":["agent:5006@zhen04.cc","device:8006@zhen04.cc","agent:zhen04.cc","CtiRouter_ctirouter-757zm","agent","agentNotReady","csta"],"namespace":"zhen04.cc","srcDeviceId":"8006@zhen04.cc","deviceId":"8006@zhen04.cc","agentId":"5006@zhen04.cc","agentMode":"NotReady","devices":{"Voice":"8006@zhen04.cc"}}


---- Log retrieved: Wed May 17 2017 19:47:01 GMT+0800 (中国标准时间) ----
---- Session duration: 00:00:15 ----"
```

[⬆ 回到顶部](#1-调试工具)