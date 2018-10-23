<!-- TOC -->

- [1. 事件及其数据结构](#1-事件及其数据结构)
  - [1.1. agentLoggedOn：座席登录事件](#11-agentloggedon座席登录事件)
  - [1.2. agentLoggedOff：座席登出事件](#12-agentloggedoff座席登出事件)
  - [1.3. agentReady：座席就绪事件](#13-agentready座席就绪事件)
  - [1.4. agentNotReady：座席离席事件](#14-agentnotready座席离席事件)
  - [1.5. serviceInitiated：摘机事件](#15-serviceinitiated摘机事件)
  - [1.6. originated：呼出事件](#16-originated呼出事件)
  - [1.7. delivered：振铃事件](#17-delivered振铃事件)
  - [1.8. established：接通事件](#18-established接通事件)
  - [1.9. connectionCleared：呼叫挂断事件](#19-connectioncleared呼叫挂断事件)
  - [1.10. transferred：转移事件](#110-transferred转移事件)
  - [1.11. conferenced：会议事件](#111-conferenced会议事件)
  - [1.12. retrieved：取回事件](#112-retrieved取回事件)
  - [1.13. held：保持事件](#113-held保持事件)
  - [1.14. agentWorkingAfterCall：座席话后处理事件](#114-agentworkingaftercall座席话后处理事件)
  - [1.15. agentAllocated：座席预占事件](#115-agentallocated座席预占事件)
  - [1.16. recordStarted: 录音开始事件](#116-recordstarted-录音开始事件)
  - [1.17. recordStopped: 录音停止事件](#117-recordstopped-录音停止事件)

<!-- /TOC -->

# 1. 事件及其数据结构
大多数事件的字段都是相同的，其中有几个比较重要的8个字段。除了这8个字段，事件里的其他字段基本上没什么用，
你最好也不要去依赖其他字段，因为有可能是不稳定的字段，随着版本升级这些字段可能会消失。但是下面的8
个字段一定是稳定的的。



字段名 | 备注
--- | ---
eventName | 事件的名字
callId | 呼叫的唯一标识
namespace | 事件的域名
agentId | 座席号
callingDevice | 主叫号
calledDevice | 被叫号
eventType | 事件类型： agent(座席相关事件)，csta(呼叫相关事件)
eventTime | 事件时间戳

[⬆ 回到顶部](#1-事件及其数据结构)

## 1.1. agentLoggedOn：座席登录事件
`数据模型`
```
AgentLoggedOnEvent {
	eventName (string, optional): 事件名称 ,
	eventSrc (object, optional): 事件源 ,
	eventTime (string, optional): 事件时间 ,
	eventType (string, optional),
	serial (integer, optional): 序号 ,
	namespace (string, optional): 命名空间 ,
	srcDeviceId (string, optional): 订阅事件的设备 ,
	deviceId (string, optional): 分机号 ,
	agentId (string, optional): 座席号 ,
	agentMode (string, optional): 座席状态 = ['Ready', 'NotReady', 'WorkNotReady', 'Logout', 'Unknown'],
	devices (object, optional): 登录设备 ,
	queueId (string, optional): 队列ID ,
	propertyNames (Array[string], optional),
	eventTopics (Array[string], optional)
}
```
`示例`
```
{
  "eventName": "agentLoggedOn",
  "eventTime": "2017.03.18 14:13:24",
  "eventType": "agent",
  "serial": 11050819,
  "namespace": "zhen04.cc",
  "srcDeviceId": "8002@zhen04.cc",
  "deviceId": "8002@zhen04.cc",
  "agentId": "5002@zhen04.cc",
  "agentMode": "Ready",
  "devices": {
    "Voice": "8002@zhen04.cc"
  }
}
```

[⬆ 回到顶部](#1-事件及其数据结构)

## 1.2. agentLoggedOff：座席登出事件
`数据模型`
```
AgentLoggedOffEvent {
	eventName (string, optional): 事件名称 ,
	eventSrc (object, optional): 事件源 ,
	eventTime (string, optional): 事件时间 ,
	eventType (string, optional),
	serial (integer, optional): 序号 ,
	namespace (string, optional): 命名空间 ,
	srcDeviceId (string, optional): 订阅事件的设备 ,
	deviceId (string, optional): 分机号 ,
	agentId (string, optional): 座席号 ,
	agentMode (string, optional): 座席状态 = ['Ready', 'NotReady', 'WorkNotReady', 'Logout', 'Unknown'],
	devices (object, optional): 登录设备 ,
	queueId (string, optional): 队列ID ,
	propertyNames (Array[string], optional),
	eventTopics (Array[string], optional)
}
```
`示例`
```
{
  "eventName": "agentLoggedOff",
  "eventTime": "2017.03.18 14:35:34",
  "eventType": "agent",
  "serial": 11066842,
  "namespace": "zhen04.cc",
  "srcDeviceId": "8002@zhen04.cc",
  "deviceId": "8002@zhen04.cc",
  "agentId": "5002@zhen04.cc",
  "agentMode": "Logout",
  "devices": {
    "Voice": "8002@zhen04.cc"
  }
}
```

[⬆ 回到顶部](#1-事件及其数据结构)

## 1.3. agentReady：座席就绪事件
`数据模型`
```
AgentReadyEvent {
	eventName (string, optional): 事件名称 ,
	eventSrc (object, optional): 事件源 ,
	eventTime (string, optional): 事件时间 ,
	eventType (string, optional),
	serial (integer, optional): 序号 ,
	namespace (string, optional): 命名空间 ,
	srcDeviceId (string, optional): 订阅事件的设备 ,
	deviceId (string, optional): 分机号 ,
	agentId (string, optional): 座席号 ,
	agentMode (string, optional): 座席状态 = ['Ready', 'NotReady', 'WorkNotReady', 'Logout', 'Unknown'],
	devices (object, optional): 登录设备 ,
	propertyNames (Array[string], optional),
	eventTopics (Array[string], optional)
}

```
`示例`
```
{
  "eventName": "agentReady",
  "eventTime": "2017.03.18 14:13:24",
  "eventType": "agent",
  "serial": 11050820,
  "namespace": "zhen04.cc",
  "srcDeviceId": "8002@zhen04.cc",
  "deviceId": "8002@zhen04.cc",
  "agentId": "5002@zhen04.cc",
  "agentMode": "Ready",
  "devices": {
    "Voice": "8002@zhen04.cc"
  }
}
```

[⬆ 回到顶部](#1-事件及其数据结构)

## 1.4. agentNotReady：座席离席事件
`数据模型`
```
AgentNotReadyEvent {
	eventName (string, optional): 事件名称 ,
	eventSrc (object, optional): 事件源 ,
	eventTime (string, optional): 事件时间 ,
	eventType (string, optional),
	serial (integer, optional): 序号 ,
	namespace (string, optional): 命名空间 ,
	srcDeviceId (string, optional): 订阅事件的设备 ,
	deviceId (string, optional): 分机号 ,
	agentId (string, optional): 座席号 ,
	agentMode (string, optional): 座席状态 = ['Ready', 'NotReady', 'WorkNotReady', 'Logout', 'Unknown'],
	devices (object, optional): 登录设备 ,
	reason (string, optional): 离席原因 ,
	propertyNames (Array[string], optional),
	eventTopics (Array[string], optional)
}
```
`示例`
```
{
  "eventName": "agentNotReady",
  "eventTime": "2017.03.18 14:33:50",
  "eventType": "agent",
  "serial": 11065578,
  "namespace": "zhen04.cc",
  "srcDeviceId": "8001@zhen04.cc",
  "deviceId": "8001@zhen04.cc",
  "agentId": "5006@zhen04.cc",
  "agentMode": "NotReady",
  "devices": {
    "Voice": "8001@zhen04.cc"
  }
}
```

[⬆ 回到顶部](#1-事件及其数据结构)

## 1.5. serviceInitiated：摘机事件

摘机事件在makeCall时将会产生，这个事件只会由呼叫的发起方收到。

`数据模型`
```
ServiceInitiatedEvent {
	eventName (string, optional): 事件名称 ,
	eventSrc (object, optional): 事件源 ,
	eventTime (string, optional): 事件时间 ,
	eventType (string, optional),
	serial (integer, optional): 序号 ,
	namespace (string, optional): 命名空间 ,
	srcDeviceId (string, optional): 订阅事件的设备 ,
	callId (string, optional): 呼叫ID ,
	deviceId (string, optional): 发生变化的设备 ,
	localState (string, optional): 事件发生后设备的状态 = ['Connect', 'Initiate', 'Alerting', 'Hold', 'None', 'Queued', 'Fail', 'Idle'],
	agentStatus (string, optional): 座席状态 = ['NotReady', 'WorkNotReady', 'Idle', 'OnCallIn', 'OnCallOut', 'Logout', 'Ringing', 'OffHook', 'CallInternal', 'Dailing', 'Ringback', 'Conference', 'OnHold', 'Other'],
	originCallInfo (OriginCallInfo, optional),
	connectionId (string, optional),
	initiatedDevice (string, optional): 摘机设备 ,
	propertyNames (Array[string], optional),
	eventTopics (Array[string], optional)
}
OriginCallInfo {
	callId (string, optional),
	callingDevice (string, optional),
	calledDevice (string, optional)
}
```
`示例`
```
{
  "eventName": "serviceInitiated",
  "eventSrc": "8001@zhen04.cc",
  "eventTime": "2017.03.18 14:13:33",
  "eventType": "csta",
  "serial": 121019,
  "namespace": "zhen04.cc",
  "srcDeviceId": "8001@zhen04.cc",
  "callId": "37db6efe-57cc-4053-b0ce-24c96eba66b0",
  "deviceId": "8001@zhen04.cc",
  "localState": "Initiate",
  "connectionId": "8001@zhen04.cc|37db6efe-57cc-4053-b0ce-24c96eba66b0",
  "initiatedDevice": "8001@zhen04.cc"
}
```

[⬆ 回到顶部](#1-事件及其数据结构)

## 1.6. originated：呼出事件

呼出事件在makeCall时将会产生，与serviceInited事件一定是成对出现。

这个事件只会由呼叫的发起方收到。

`数据模型`
```
OriginatedEvent {
	eventName (string, optional): 事件名称 ,
	eventSrc (object, optional): 事件源 ,
	eventTime (string, optional): 事件时间 ,
	eventType (string, optional),
	serial (integer, optional): 序号 ,
	namespace (string, optional): 命名空间 ,
	srcDeviceId (string, optional): 订阅事件的设备 ,
	callId (string, optional): 呼叫ID ,
	deviceId (string, optional): 发生变化的设备 ,
	localState (string, optional): 事件发生后设备的状态 = ['Connect', 'Initiate', 'Alerting', 'Hold', 'None', 'Queued', 'Fail', 'Idle'],
	agentStatus (string, optional): 座席状态 = ['NotReady', 'WorkNotReady', 'Idle', 'OnCallIn', 'OnCallOut', 'Logout', 'Ringing', 'OffHook', 'CallInternal', 'Dailing', 'Ringback', 'Conference', 'OnHold', 'Other'],
	originCallInfo (OriginCallInfo, optional),
	connectionId (string, optional),
	callingDevice (string, optional): 主叫号 ,
	calledDevice (string, optional): 被叫号 ,
	propertyNames (Array[string], optional),
	eventTopics (Array[string], optional)
}
OriginCallInfo {
	callId (string, optional),
	callingDevice (string, optional),
	calledDevice (string, optional)
}
```
`示例`
```
{
  "eventName": "originated",
  "eventSrc": "8001@zhen04.cc",
  "eventTime": "2017.03.18 14:13:33",
  "eventType": "csta",
  "serial": 121021,
  "namespace": "zhen04.cc",
  "srcDeviceId": "8001@zhen04.cc",
  "callId": "37db6efe-57cc-4053-b0ce-24c96eba66b0",
  "deviceId": "8001@zhen04.cc",
  "localState": "Initiate",
  "connectionId": "8001@zhen04.cc|37db6efe-57cc-4053-b0ce-24c96eba66b0",
  "callingDevice": "8001@zhen04.cc",
  "calledDevice": "8002@zhen04.cc"
}
```

[⬆ 回到顶部](#1-事件及其数据结构)

## 1.7. delivered：振铃事件

振铃事件在呼叫到达设备时产生，在呼叫中的每一个设备都会收到一个振铃事件。

下面是不同场景下设备收到事件的情况：

1. 对于单步会议场景来说，在呼叫中的每一个设备都会收到振铃事件，包括发起会议方，被会议方，以及第三方。

2. 对于单步转移场景来说，转移目的方与被转移方将收到振铃事件，而发起转移方因为呼叫结束将不再收到振铃事件。

3. 对于咨询后会议场景来说，发起会议方与被会议方将收到振铃事件，而被保持方则不会收到振铃事件。

4. 对于咨询后转移场景来说，发起转移方与转移目的方将收到振铃事件，而被保持方则不会收到振铃事件。

判断是否本设备的呼叫只需要关注alertingDevice与srcDeviceId相同，相同则表明当前设备在振铃。

`数据模型`

```
DeliveredEvent {
	eventName (string, optional): 事件名称 ,
	eventSrc (object, optional): 事件源 ,
	eventTime (string, optional): 事件时间 ,
	eventType (string, optional),
	serial (integer, optional): 序号 ,
	namespace (string, optional): 命名空间 ,
	srcDeviceId (string, optional): 订阅事件的设备 ,
	callId (string, optional): 呼叫ID ,
	deviceId (string, optional): 发生变化的设备 ,
	localState (string, optional): 事件发生后设备的状态 = ['Connect', 'Initiate', 'Alerting', 'Hold', 'None', 'Queued', 'Fail', 'Idle'],
	agentStatus (string, optional): 座席状态 = ['NotReady', 'WorkNotReady', 'Idle', 'OnCallIn', 'OnCallOut', 'Logout', 'Ringing', 'OffHook', 'CallInternal', 'Dailing', 'Ringback', 'Conference', 'OnHold', 'Other'],
	originCallInfo (OriginCallInfo, optional),
	connectionId (string, optional),
	alertingDevice (string, optional): 振铃设备 ,
	callingDevice (string, optional): 主叫设备 ,
	calledDevice (string, optional): 被叫设备 ,
	lastRedirectionDevice (string, optional): 最后一次从..转入的设备 ,
	trunkGroup (string, optional): 中继组号 ,
	trunkMember (string, optional): 中继号 ,
	originalCallId (string, optional): 原始呼叫ID ,
	userData (UserData, optional): 随路数据 ,
	split (string, optional): 队列 ,
	callCause (string, optional): 呼叫原因 ,
	propertyNames (Array[string], optional),
	eventTopics (Array[string], optional)
  origin_dnis (string, option): 原始被叫
}
OriginCallInfo {
	callId (string, optional),
	callingDevice (string, optional),
	calledDevice (string, optional)
}
UserData {}
```

`示例1`: 无通话时，座席呼出

```
{
  "eventName": "delivered",
  "eventSrc": "8100@welljoint.cc",
  "eventTime": "2018.04.10 15:39:56",
  "eventType": "csta",
  "serial": 15296,
  "namespace": "welljoint.cc",
  "srcDeviceId": "8100@welljoint.cc",
  "callId": "5d0727a2-3c92-11e8-bbcd-33878bfda0e8",
  "deviceId": "8100@welljoint.cc",
  "localState": "Alerting",
  "connectionId": "8100@welljoint.cc|5d0727a2-3c92-11e8-bbcd-33878bfda0e8",
  "cause": "newCall",
  "alertingDevice": "8100@welljoint.cc",
  "callingDevice": "33255500@welljoint.cc",
  "calledDevice": "8100@welljoint.cc",
  "trunkGroup": "1",
  "trunkMember": "172.30.10.8",
  "userData": {
    "data": {
      "origin_dnis": "5484",
      "originalANI": "33255500@welljoint.cc",
      "originalDNIS": "8100@welljoint.cc",
      "originalCallId": "5d0727a2-3c92-11e8-bbcd-33878bfda0e8"
    }
  },
  "split": "7000@welljoint.cc"
}
```

`实例2`: 无通话时，有电话呼入

```
{
  "eventName": "delivered",
  "eventSrc": "8003@test0016.cc",
  "eventTime": "2017.06.01 11:26:24",
  "eventType": "csta",
  "serial": 421,
  "namespace": "test0016.cc",
  "srcDeviceId": "8003@test0016.cc",
  "callId": "17383bbc-467a-11e7-b3a5-39e394a1c1de",
  "deviceId": "8003@test0016.cc",
  "localState": "Alerting",
  "connectionId": "8003@test0016.cc|17383bbc-467a-11e7-b3a5-39e394a1c1de",
  "alertingDevice": "8003@test0016.cc",
  "callingDevice": "8004@test0016.cc",
  "calledDevice": "8003@test0016.cc"
}
```

[⬆ 回到顶部](#1-事件及其数据结构)

## 1.8. established：接通事件

接通事件在通话建立时产生，在呼叫中的每一个设备都会收到一个接通事件。

下面是不同场景下设备收到事件的情况：

1. 对于单步会议场景来说，在呼叫中的每一个设备都会收到接通事件，包括发起会议方，被会议方，以及第三方。

2. 对于单步转移场景来说，转移目的方与被转移方将收到接通事件，而发起转移方因为呼叫结束将不再收到接通事件。

3. 对于咨询后会议场景来说，发起会议方与被会议方将收到接通事件，而被保持方则不会收到接通事件。

4. 对于咨询后转移场景来说，发起转移方与转移目的方将收到接通事件，而被保持方则不会收到接通事件。

判断是否本设备的应答了呼叫只需要关注answeringDevice与srcDeviceId相同，相同则表明当前设备在应答了呼叫。


`数据模型`
```
EstablishedEvent {
	eventName (string, optional): 事件名称 ,
	eventSrc (object, optional): 事件源 ,
	eventTime (string, optional): 事件时间 ,
	eventType (string, optional),
	serial (integer, optional): 序号 ,
	namespace (string, optional): 命名空间 ,
	srcDeviceId (string, optional): 订阅事件的设备 ,
	callId (string, optional): 呼叫ID ,
	deviceId (string, optional): 发生变化的设备 ,
	localState (string, optional): 事件发生后设备的状态 = ['Connect', 'Initiate', 'Alerting', 'Hold', 'None', 'Queued', 'Fail', 'Idle'],
	agentStatus (string, optional): 座席状态 = ['NotReady', 'WorkNotReady', 'Idle', 'OnCallIn', 'OnCallOut', 'Logout', 'Ringing', 'OffHook', 'CallInternal', 'Dailing', 'Ringback', 'Conference', 'OnHold', 'Other'],
	originCallInfo (OriginCallInfo, optional),
	connectionId (string, optional),
	answeringDevice (string, optional): 接通设备 ,
	callingDevice (string, optional): 主叫号 ,
	calledDevice (string, optional): 被叫号 ,
	trunkGroup (string, optional): 中继组 ,
	trunkMember (string, optional): 中继号 ,
	split (string, optional): 队列 ,
	userData (UserData, optional): 随路数据 ,
	sipCallId (string, optional): Sip 呼叫ID ,
	propertyNames (Array[string], optional),
	eventTopics (Array[string], optional)
}
OriginCallInfo {
	callId (string, optional),
	callingDevice (string, optional),
	calledDevice (string, optional)
}
UserData {}
```
`示例`
```
{
  "eventName": "established",
  "eventSrc": "8002@zhen04.cc",
  "eventTime": "2017.03.18 14:13:36",
  "eventType": "csta",
  "serial": 121037,
  "namespace": "zhen04.cc",
  "srcDeviceId": "8002@zhen04.cc",
  "callId": "37db6efe-57cc-4053-b0ce-24c96eba66b0",
  "deviceId": "8002@zhen04.cc",
  "localState": "Connect",
  "connectionId": "8002@zhen04.cc|37db6efe-57cc-4053-b0ce-24c96eba66b0",
  "answeringDevice": "8002@zhen04.cc",
  "callingDevice": "8001@zhen04.cc",
  "calledDevice": "8002@zhen04.cc"
}
```

[⬆ 回到顶部](#1-事件及其数据结构)

## 1.9. connectionCleared：呼叫挂断事件

> 标志一方从呼叫中挂断

在呼叫中的所有设备都会收到此事件。

在会议场景中，任意一方从会议中退出，会议中的其它方都会收到挂断事件。

在咨询转移场景中，发起转移方以及转移目的方将收到挂断事件。

> :warning: :warning: 注意： 在外呼的时候，挂断事件会收到两个。请务必在处理挂断时间前，去判断一下。当挂断事件的releasingDevice与srcDeviceId相同时，标识本设备从呼叫中挂断，再去处理。否则就不要处理该挂断事件。

`数据模型`
```
```
`示例`
```
{
  "eventName": "connectionCleared",
  "eventSrc": "8002@zhen04.cc",
  "eventTime": "2017.03.18 14:14:15",
  "eventType": "csta",
  "serial": 121051,
  "namespace": "zhen04.cc",
  "srcDeviceId": "8002@zhen04.cc",
  "callId": "37db6efe-57cc-4053-b0ce-24c96eba66b0",
  "deviceId": "8002@zhen04.cc",
  "localState": "Queued",
  "connectionId": "8002@zhen04.cc|37db6efe-57cc-4053-b0ce-24c96eba66b0",
  "releasingDevice": "8002@zhen04.cc"
}
```

[⬆ 回到顶部](#1-事件及其数据结构)

## 1.10. transferred：转移事件

标识呼叫已从本设备转移到目的设备，转移发起方将收到此事件。

`数据模型`
```
TransferredEvent {
    eventName (string, optional): 事件名称 ,
    eventSrc (object, optional): 事件源 ,
    eventTime (string, optional): 事件时间 ,
    eventType (string, optional),
    serial (integer, optional): 序号 ,
    namespace (string, optional): 命名空间 ,
    srcDeviceId (string, optional): 订阅事件的设备 ,
    callId (string, optional): 呼叫ID ,
    deviceId (string, optional): 发生变化的设备 ,
    localState (string, optional): 事件发生后设备的状态 = ['Connect', 'Initiate', 'Alerting', 'Hold', 'None', 'Queued', 'Fail', 'Idle'],
    agentStatus (string, optional): 座席状态 = ['NotReady', 'WorkNotReady', 'Idle', 'OnCallIn', 'OnCallOut', 'Logout', 'Ringing', 'OffHook', 'CallInternal', 'Dailing', 'Ringback', 'Conference', 'OnHold', 'Other'],
    originCallInfo (OriginCallInfo, optional),
    connectionId (string, optional),
    primaryOldCall (string, optional): 转移前被保持的呼叫 ,
    secondaryOldCall (string, optional): 转移前活动的呼叫 ,
    transferringDevice (string, optional): 发起转移的设备 ,
    transferredToDevice (string, optional): 转移的目标设备 ,
    newCall (string, optional): 转移后的呼叫ID ,
    propertyNames (Array[string], optional),
    eventTopics (Array[string], optional)
}
OriginCallInfo {
    callId (string, optional),
    callingDevice (string, optional),
    calledDevice (string, optional)
}
```
`示例`
```
{
  "eventName": "transferred",
  "eventSrc": "8002@zhen04.cc",
  "eventTime": "2017.03.18 14:39:31",
  "eventType": "csta",
  "serial": 121645,
  "namespace": "zhen04.cc",
  "srcDeviceId": "8002@zhen04.cc",
  "callId": "10549a5f-41c8-4309-a1ad-faa61c8f3777",
  "deviceId": "8002@zhen04.cc",
  "localState": "Queued",
  "originCallInfo": {

  },
  "connectionId": "8002@zhen04.cc|10549a5f-41c8-4309-a1ad-faa61c8f3777",
  "primaryOldCall": "0",
  "secondaryOldCall": "10549a5f-41c8-4309-a1ad-faa61c8f3777",
  "transferringDevice": "8002@zhen04.cc",
  "transferredToDevice": "8003@zhen04.cc",
  "newCall": "10549a5f-41c8-4309-a1ad-faa61c8f3777"
}
```

[⬆ 回到顶部](#1-事件及其数据结构)

## 1.11. conferenced：会议事件

形成会议时产生此事件，在会议中的所有设备都将收到此事件。如果有新的设备加入到会议中，会议中的所有设备也将收到此事件。

外线A->坐席B->咨询坐席C-> 进入会议中：

如果B先挂断：那么收到一个挂断事件，releasingDevice是坐席自己，其他两方都会挂断;
b一共收到1个挂断事件


如果C先挂断：那么先收到的一个挂断事件,releasingDevice是C;然后B挂断，还会收到一次挂断事件，这时releasingDevice都是坐席自己;
b一共收到2个挂断事件；


如果C先挂断：那么先收到的一个挂断事件,releasingDevice是C;然后A挂断，还会收到一次挂断事件，这时releasingDevice都是A自己；
然后收到一个挂断事件，这是releasingDevice是坐席自己；B一共收到3个挂断事件。


`数据模型`
```
ConferencedEvent {
eventName (string, optional): 事件名称 ,
eventSrc (object, optional): 事件源 ,
eventTime (string, optional): 事件时间 ,
eventType (string, optional),
serial (integer, optional): 序号 ,
namespace (string, optional): 命名空间 ,
srcDeviceId (string, optional): 订阅事件的设备 ,
callId (string, optional): 呼叫ID ,
deviceId (string, optional): 发生变化的设备 ,
localState (string, optional): 事件发生后设备的状态 = ['Connect', 'Initiate', 'Alerting', 'Hold', 'None', 'Queued', 'Fail', 'Idle'],
agentStatus (string, optional): 座席状态 = ['NotReady', 'WorkNotReady', 'Idle', 'OnCallIn', 'OnCallOut', 'Logout', 'Ringing', 'OffHook', 'CallInternal', 'Dailing', 'Ringback', 'Conference', 'OnHold', 'Other'],
originCallInfo (OriginCallInfo, optional),
connectionId (string, optional),
primaryOldCall (string, optional): 会议前的被保持的呼叫 ,
secondaryOldCall (string, optional): 会议前活动的呼叫 ,
conferencingDevice (string, optional): 发起会议的设备 ,
addedParty (string, optional): 加入会议的设备 ,
newCall (string, optional): 会议后新的呼叫ID ,
eventTopics (Array[string], optional),
propertyNames (Array[string], optional)
}
OriginCallInfo {
callId (string, optional),
callingDevice (string, optional),
calledDevice (string, optional)
}
```
`示例`
```
{
  "eventName": "conferenced",
  "eventSrc": "8001@zhen04.cc",
  "eventTime": "2017.03.18 14:15:37",
  "eventType": "csta",
  "serial": 121110,
  "namespace": "zhen04.cc",
  "srcDeviceId": "8001@zhen04.cc",
  "callId": "b81b0af2-e40a-4e0e-a8ce-47be9474f245",
  "deviceId": "8003@zhen04.cc",
  "localState": "Connect",
  "connectionId": "8003@zhen04.cc|b81b0af2-e40a-4e0e-a8ce-47be9474f245",
  "primaryOldCall": "0",
  "secondaryOldCall": "b81b0af2-e40a-4e0e-a8ce-47be9474f245",
  "conferencingDevice": "8001@zhen04.cc",
  "addedParty": "8003@zhen04.cc",
  "newCall": "b81b0af2-e40a-4e0e-a8ce-47be9474f245"
}
```

[⬆ 回到顶部](#1-事件及其数据结构)

## 1.12. retrieved：取回事件

呼叫从保持状态恢复到通话状态时产生的事件，呼叫中的所有设备都将收到此事件。

`数据模型`
```
RetrievedEvent {
eventName (string, optional): 事件名称 ,
eventSrc (object, optional): 事件源 ,
eventTime (string, optional): 事件时间 ,
eventType (string, optional),
serial (integer, optional): 序号 ,
namespace (string, optional): 命名空间 ,
srcDeviceId (string, optional): 订阅事件的设备 ,
callId (string, optional): 呼叫ID ,
deviceId (string, optional): 发生变化的设备 ,
localState (string, optional): 事件发生后设备的状态 = ['Connect', 'Initiate', 'Alerting', 'Hold', 'None', 'Queued', 'Fail', 'Idle'],
agentStatus (string, optional): 座席状态 = ['NotReady', 'WorkNotReady', 'Idle', 'OnCallIn', 'OnCallOut', 'Logout', 'Ringing', 'OffHook', 'CallInternal', 'Dailing', 'Ringback', 'Conference', 'OnHold', 'Other'],
originCallInfo (OriginCallInfo, optional),
connectionId (string, optional),
retrievingDevice (string, optional): 取回设备 ,
sipCallId (string, optional): sip呼叫ID ,
propertyNames (Array[string], optional),
eventTopics (Array[string], optional)
}
OriginCallInfo {
callId (string, optional),
callingDevice (string, optional),
calledDevice (string, optional)
}
```
`示例`
```
{
  "eventName": "retrieved",
  "eventSrc": "8002@zhen04.cc",
  "eventTime": "2017.03.18 14:38:39",
  "eventType": "csta",
  "serial": 121578,
  "namespace": "zhen04.cc",
  "srcDeviceId": "8002@zhen04.cc",
  "callId": "10549a5f-41c8-4309-a1ad-faa61c8f3777",
  "deviceId": "8002@zhen04.cc",
  "localState": "Connect",
  "connectionId": "8002@zhen04.cc|10549a5f-41c8-4309-a1ad-faa61c8f3777",
  "retrievingDevice": "8002@zhen04.cc"
}
```

[⬆ 回到顶部](#1-事件及其数据结构)

## 1.13. held：保持事件

呼叫一方被保持时收到的事件，呼叫中所有设备都将收到此事件。

`数据模型`
```
HeldEvent {
eventName (string, optional): 事件名称 ,
eventSrc (object, optional): 事件源 ,
eventTime (string, optional): 事件时间 ,
eventType (string, optional),
serial (integer, optional): 序号 ,
namespace (string, optional): 命名空间 ,
srcDeviceId (string, optional): 订阅事件的设备 ,
callId (string, optional): 呼叫ID ,
deviceId (string, optional): 发生变化的设备 ,
localState (string, optional): 事件发生后设备的状态 = ['Connect', 'Initiate', 'Alerting', 'Hold', 'None', 'Queued', 'Fail', 'Idle'],
agentStatus (string, optional): 座席状态 = ['NotReady', 'WorkNotReady', 'Idle', 'OnCallIn', 'OnCallOut', 'Logout', 'Ringing', 'OffHook', 'CallInternal', 'Dailing', 'Ringback', 'Conference', 'OnHold', 'Other'],
originCallInfo (OriginCallInfo, optional),
connectionId (string, optional),
holdingDevice (string, optional): 保持设备 ,
propertyNames (Array[string], optional),
eventTopics (Array[string], optional)
}
OriginCallInfo {
callId (string, optional),
callingDevice (string, optional),
calledDevice (string, optional)
}
```
`示例`
```
{
  "eventName": "held",
  "eventSrc": "8002@zhen04.cc",
  "eventTime": "2017.03.18 14:37:57",
  "eventType": "csta",
  "serial": 121511,
  "namespace": "zhen04.cc",
  "srcDeviceId": "8002@zhen04.cc",
  "callId": "10549a5f-41c8-4309-a1ad-faa61c8f3777",
  "deviceId": "8002@zhen04.cc",
  "localState": "Hold",
  "connectionId": "8002@zhen04.cc|10549a5f-41c8-4309-a1ad-faa61c8f3777",
  "holdingDevice": "8002@zhen04.cc"
}
```

[⬆ 回到顶部](#1-事件及其数据结构)

## 1.14. agentWorkingAfterCall：座席话后处理事件
`数据模型`
```
AgentWorkingAfterCallEvent {
eventName (string, optional): 事件名称 ,
eventSrc (object, optional): 事件源 ,
eventTime (string, optional): 事件时间 ,
eventType (string, optional),
serial (integer, optional): 序号 ,
namespace (string, optional): 命名空间 ,
srcDeviceId (string, optional): 订阅事件的设备 ,
deviceId (string, optional): 分机号 ,
agentId (string, optional): 座席号 ,
agentMode (string, optional): 座席状态 = ['Ready', 'NotReady', 'WorkNotReady', 'Logout', 'Unknown'],
devices (object, optional): 登录设备 ,
eventTopics (Array[string], optional),
propertyNames (Array[string], optional)
}
```
`示例`
```
{
  "eventName": "agentWorkingAfterCall",
  "eventTime": "2017.03.24 17:53:55",
  "eventType": "agent",
  "serial": 11468024,
  "namespace": "zhen04.cc",
  "srcDeviceId": "8005@zhen04.cc",
  "deviceId": "8005@zhen04.cc",
  "agentId": "5006@zhen04.cc",
  "agentMode": "WorkNotReady",
  "devices": {
    "Voice": "8005@zhen04.cc"
  }
}
```

[⬆ 回到顶部](#1-事件及其数据结构)

## 1.15. agentAllocated：座席预占事件
`数据模型`


`示例`

```

{
  "eventName": "agentAllocated",
  "eventTime": "2017.05.10 13:54:29",
  "eventType": "agent",
  "serial": 2012088,
  "namespace": "final.cc",
  "srcDeviceId": "8001@final.cc",
  "deviceId": "8001@final.cc",
  "agentId": "5001@final.cc",
  "agentMode": "Allocated",
  "devices": {
    "Voice": "8001@final.cc"
  }
}

```
[⬆ 回到顶部](#1-事件及其数据结构)


## 1.16. recordStarted: 录音开始事件

`数据模型`


`示例`

```

{
  "eventName": "recordStarted",
  "eventSrc": "8009@bzkun.cc",
  "eventTime": "2018.07.24 11:14:39",
  "eventType": "csta",
  "serial": 1569,
  "namespace": "bzkun.cc",
  "recordId": "c0c27573-2908-4597-82d9-ea224804c1ae",
  "callId": "7829daaf-9694-4566-be58-1ac1b02f9a19",
  "deviceId": "8009@bzkun.cc",
  "fileName": "/mnt/volumes/recordings//bzkun.cc/2018/0724/8009@bzkun.cc/20180724111439_7829daaf-9694-4566-be58-1ac1b02f9a19.wav",
  "isSuccess": true

```
[⬆ 回到顶部](#1-事件及其数据结构)

## 1.17. recordStopped: 录音停止事件

`数据模型`


`示例`

```

{
  "eventName": "recordStopped",
  "eventSrc": "8009@bzkun.cc",
  "eventTime": "2018.07.24 11:15:05",
  "eventType": "csta",
  "serial": 1570,
  "namespace": "bzkun.cc",
  "srcDeviceId": "8009@bzkun.cc",
  "recordId": "c0c27573-2908-4597-82d9-ea224804c1ae",
  "isSuccess": true
}

```
[⬆ 回到顶部](#1-事件及其数据结构)