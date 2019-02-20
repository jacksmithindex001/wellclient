<!-- TOC -->

- [1. 关于软电话收到事件的顺序](#1-关于软电话收到事件的顺序)
  - [1.1. 手工呼出类型](#11-手工呼出类型)
  - [1.2. 呼入类型](#12-呼入类型)
- [2. 事件及其数据结构](#2-事件及其数据结构)
  - [2.1. agentLoggedOn：座席登录事件](#21-agentloggedon座席登录事件)
  - [2.2. agentLoggedOff：座席登出事件](#22-agentloggedoff座席登出事件)
  - [2.3. agentReady：座席就绪事件](#23-agentready座席就绪事件)
  - [2.4. agentNotReady：座席离席事件](#24-agentnotready座席离席事件)
  - [2.5. serviceInitiated 服务初始化事件](#25-serviceinitiated-服务初始化事件)
  - [2.6. originated 呼出事件](#26-originated-呼出事件)
  - [2.7. delivered：振铃事件](#27-delivered振铃事件)
  - [2.8. established：接通事件](#28-established接通事件)
  - [2.9. connectionCleared：呼叫挂断事件](#29-connectioncleared呼叫挂断事件)
  - [2.10. transferred：转移事件](#210-transferred转移事件)
  - [2.11. conferenced：会议事件](#211-conferenced会议事件)
  - [2.12. retrieved：取回事件](#212-retrieved取回事件)
  - [2.13. held：保持事件](#213-held保持事件)
  - [2.14. agentWorkingAfterCall：座席话后处理事件](#214-agentworkingaftercall座席话后处理事件)
  - [2.15. agentAllocated：座席预占事件](#215-agentallocated座席预占事件)
  - [2.16. recordStarted: 录音开始事件](#216-recordstarted-录音开始事件)
  - [2.17. recordStopped: 录音停止事件](#217-recordstopped-录音停止事件)
  - [2.18. failed: 外呼失败事件](#218-failed-外呼失败事件)

<!-- /TOC -->

# 1. 关于软电话收到事件的顺序

## 1.1. 手工呼出类型

主叫方是座席, 主叫方收到的事件及其顺序按照下表所示。

顺序 | 事件 | 必然有 | 含义
--- | --- | --- | ---
1 | serviceInitiated | 必然 | 初始化
2 | originated | 必然 | 呼出
3 | delivered | 条件 | 仅当被叫振铃时，座席方才会收到delivered事件
4 | established | 条件 | 仅当呼叫接通后，座席方才收到established事件
5 | connectionCleared | 必然 | 无论呼叫是否接听，最后必然会收到挂断事件

对于客户端来说，服务端推送的事件是严格按照状态转移变化去推送的，并且保证正确的顺序性。当你发起makeCall后，如果收到第一个事件是connectionCleared，然后收到delivered，那么这必然是服务端推送事件的顺序出问题。

![](http://assets.processon.com/chart_image/5c205434e4b00c79bf0a2efb.png)

## 1.2. 呼入类型

呼入类型，座席是被叫方，被叫方收到的事件顺序如下图所示。

顺序 | 事件 | 必然有 | 含义
--- | --- | --- | ---
1 | delivered | 必然 | 座席方才会收到delivered事件
2 | established | 条件 | 仅当座席调用answerCall接通呼叫后，座席方才收到established事件
3 | connectionCleared | 必然 | 无论呼叫是否接听，最后必然会收到挂断事件

# 2. 事件及其数据结构

大多数事件的字段都是相同的，其中有几个比较重要的几个字段。除了下表中列出的稳定的字段外，其他字段都为不稳定的字段，可能会随着版本升级而改变。所以建议您只使用下表中列出的字段。

字段名              | 备注
--------------------|------------------------------------------------
eventName           | 事件的名字
callId              | 呼叫的唯一标识
agentId             | 座席号
callingDevice       | 主叫号
calledDevice        | 被叫号
eventType           | 事件类型： agent(座席相关事件)，csta(呼叫相关事件)
eventTime           | 事件时间戳
agentMode           | 座席状态。Ready、NotReady、WorkNotReady、Logout、Unknown
serial              | 事件序号
userData            | 随路数据
primaryOldCall      | 转移前被保持的呼叫
secondaryOldCall    | 转移前活动的呼叫
transferringDevice  | 发起转移的设备
transferredToDevice | 转移的目标设备
newCall             | 转移后的呼叫ID
conferencingDevice  | 发起会议的设备
addedParty          | 加入会议的设备
retrievingDevice    | 取回设备
holdingDevice       | 保持设备
hangupDevice        | 先挂断的设备
callType            | 呼叫类型

[⬆ 回到顶部](#1-事件及其数据结构)

## 2.1. agentLoggedOn：座席登录事件

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

## 2.2. agentLoggedOff：座席登出事件

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

## 2.3. agentReady：座席就绪事件

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

## 2.4. agentNotReady：座席离席事件

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


## 2.5. serviceInitiated 服务初始化事件

注意：该事件只会在调用手工外呼时触发，并且是开始外呼的第一个呼叫相关的事件。

```
{
  "eventName": "serviceInitiated",
  "eventSrc": "8003@zhen04.cc",
  "eventTime": "2018.12.24 08:59:57",
  "eventType": "csta",
  "serial": 4237833,
  "namespace": "zhen04.cc",
  "srcDeviceId": "8003@zhen04.cc",
  "callId": "0cce963e-2238-4b10-ba06-b3b9ce037c40",
  "deviceId": "8003@zhen04.cc",
  "localState": "Initiate",
  "connectionId": "8003@zhen04.cc|0cce963e-2238-4b10-ba06-b3b9ce037c40",
  "cause": "NORMAL",
  "initiatedDevice": "8003@zhen04.cc"
}
```

## 2.6. originated 呼出事件

注意：该事件只会在调用手工外呼时触发，并且紧随serviceInitiated之后触发。

```
{
  "eventName": "originated",
  "eventSrc": "8003@zhen04.cc",
  "eventTime": "2018.12.24 08:59:57",
  "eventType": "csta",
  "serial": 4237834,
  "namespace": "zhen04.cc",
  "srcDeviceId": "8003@zhen04.cc",
  "callId": "0cce963e-2238-4b10-ba06-b3b9ce037c40",
  "deviceId": "8003@zhen04.cc",
  "localState": "Initiate",
  "connectionId": "8003@zhen04.cc|0cce963e-2238-4b10-ba06-b3b9ce037c40",
  "cause": "NEWCALL",
  "callingDevice": "8003@zhen04.cc",
  "calledDevice": "917602176375@zhen04.cc"
}
```


## 2.7. delivered：振铃事件

注意：
- 在呼出的情况下，必须外线振铃，才会有振铃事件。
- 在呼入的情况下，软电话收到的第一个事件就是振铃事件

振铃事件在呼叫到达设备时产生，在呼叫中的每一个设备都会收到一个振铃事件。

下面是不同场景下设备收到事件的情况：

1. 对于单步会议场景来说，在呼叫中的每一个设备都会收到振铃事件，包括发起会议方，被会议方，以及第三方。

2. 对于单步转移场景来说，转移目的方与被转移方将收到振铃事件，而发起转移方因为呼叫结束将不再收到振铃事件。

3. 对于咨询后会议场景来说，发起会议方与被会议方将收到振铃事件，而被保持方则不会收到振铃事件。

4. 对于咨询后转移场景来说，发起转移方与转移目的方将收到振铃事件，而被保持方则不会收到振铃事件。

判断是否本设备的呼叫只需要关注alertingDevice与srcDeviceId相同，相同则表明当前设备在振铃。

关于振铃事件的callType(呼叫类型)字段的说明

字段          | 含义
--------------|-------
Inbound       | 呼入
Outbound      | 呼出
Internal      | 内线呼叫
PreOccupied   | 预占外呼
PreDictive    | 预测外呼
AgentAutoCall | 座席自动外呼
PreView       | 预览外呼
SMART_IVR     | 智能IVR外呼

`示例1`: 无通话时，座席呼出

```
{
  "eventName": "delivered",
  "eventSrc": "8888@zhen04.cc",
  "eventTime": "2019.02.18 11:05:10",
  "eventType": "csta",
  "serial": 2985999,
  "namespace": "zhen04.cc",
  "srcDeviceId": "8888@zhen04.cc",
  "callId": "4493fb65-36fb-46d6-b537-43eb4f9a31e8",
  "deviceId": "917602176375@zhen04.cc",
  "localState": "Alerting",
  "connectionId": "8888@zhen04.cc|4493fb65-36fb-46d6-b537-43eb4f9a31e8",
  "alertingDevice": "917602176375@zhen04.cc",
  "callingDevice": "8888@zhen04.cc",
  "calledDevice": "917602176375@zhen04.cc",
  "userData": {
    "data": {
      "originalDNIS": "917602176375@zhen04.cc",
      "originalANI": "8888@zhen04.cc",
      "originalCallId": "4493fb65-36fb-46d6-b537-43eb4f9a31e8"
    }
  },
  "callCause": "NEWCALL",
  "callType": "Outbound"
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
  "calledDevice": "8003@test0016.cc",
  "callType": "Inbound"
}
```

[⬆ 回到顶部](#1-事件及其数据结构)

## 2.8. established：接通事件

接通事件在通话建立时产生，在呼叫中的每一个设备都会收到一个接通事件。

下面是不同场景下设备收到事件的情况：

1. 对于单步会议场景来说，在呼叫中的每一个设备都会收到接通事件，包括发起会议方，被会议方，以及第三方。

2. 对于单步转移场景来说，转移目的方与被转移方将收到接通事件，而发起转移方因为呼叫结束将不再收到接通事件。

3. 对于咨询后会议场景来说，发起会议方与被会议方将收到接通事件，而被保持方则不会收到接通事件。

4. 对于咨询后转移场景来说，发起转移方与转移目的方将收到接通事件，而被保持方则不会收到接通事件。

判断是否本设备的应答了呼叫只需要关注answeringDevice与srcDeviceId相同，相同则表明当前设备在应答了呼叫。

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

## 2.9. connectionCleared：呼叫挂断事件

> 标志一方从呼叫中挂断

在呼叫中的所有设备都会收到此事件。

在会议场景中，任意一方从会议中退出，会议中的其它方都会收到挂断事件。

在咨询转移场景中，发起转移方以及转移目的方将收到挂断事件。

> :warning: :warning: 注意： 在外呼的时候，挂断事件会收到两个。请务必在处理挂断时间前，去判断一下。当挂断事件的releasingDevice与srcDeviceId相同时，标识本设备从呼叫中挂断，再去处理。否则就不要处理该挂断事件。

cause字段来自：sip挂断原因码 https://freeswitch.org/confluence/display/FREESWITCH/Hangup+Cause+Code+Table

请注意：**正常的挂断，挂断事件中cause值都是NORMAL_CLEARING**, 如果挂断事件的cause不是NORMAL_CLEARING， 那么总有一个地方出问题了。

`示例`
```
{
  "eventName": "connectionCleared",
  "eventSrc": "8016@360.cc",
  "eventTime": "2018.10.23 09:22:01",
  "eventType": "csta",
  "serial": 317020,
  "namespace": "360.cc",
  "srcDeviceId": "8016@360.cc",
  "callId": "d72ab1af-f216-40e9-aef8-7a01be2b1b1c",
  "deviceId": "8016@360.cc",
  "localState": "Idle",
  "connectionId": "8016@360.cc|d72ab1af-f216-40e9-aef8-7a01be2b1b1c",
  "cause": "NORMAL_CLEARING",
  "releasingDevice": "8016@360.cc",
  "hangupDevice": "915825155548@360.cc"
}
```

下面给出几个常用的挂断原因码

cause| 说明
--- | ---
NORMAL_CLEARING | 正常挂断。默认都是正常挂断
NO_USER_RESPONSE | 无用户响应
NO_ANSWER | 用户已经振铃，但是在规定时间内未接听
RECOVERY_ON_TIMER_EXPIRE |
USER_BUSY | 表示被叫方无法接受另一个呼叫，因为遇到了用户忙碌状况。 该原因值可以由被叫用户或网络生成
NO_ROUTE_DESTINATION| 此原因表示无法到达被叫方，因为通过其路由呼叫的网络不能提供所需的目的地。 此原因在依赖于网络的基础上受支持。
CALL_REJECTED | 呼叫被拒绝。被叫设备和网络都可能产生这个原因码
INVALID_NUMBER_FORMAT | 无效的号码格式
UNALLOCATED_NUMBER | 
INTERWORKING | 
NORMAL_TEMPORARY_FAILURE |
UNKNOWN | 
DESTINATION_OUT_OF_ORDER | 
SUBSCRIBER_ABSENT | 
NETWORK_OUT_OF_ORDER | 
FACILITY_NOT_SUBSCRIBED | 

具体详情，请参考：https://freeswitch.org/confluence/display/FREESWITCH/Hangup+Cause+Code+Table

[⬆ 回到顶部](#1-事件及其数据结构)

## 2.10. transferred：转移事件

标识呼叫已从本设备转移到目的设备，转移发起方将收到此事件。

1. 在单步转移时，A将呼叫转给B, B会先收到 deliverd(callId=c1)事件， 然后立即收到transferred(callId=c2,secondaryOldCall=c1)事件
2. 如果transferredToDevice字段不是你登录的分机号，就不要处理该事件。transferredToDevice表示转接到方的id
3. 如果transferredToDevice字段是你登录的分机号，那么这通呼叫之后的callId就由c1改变成c2了, 后续的所有操作如接通或挂断请求，以及后续的事件，对于B来说，只有c2了。

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

## 2.11. conferenced：会议事件

形成会议时产生此事件，在会议中的所有设备都将收到此事件。如果有新的设备加入到会议中，会议中的所有设备也将收到此事件。

外线A->坐席B->咨询坐席C-> 进入会议中：

如果B先挂断：那么收到一个挂断事件，releasingDevice是坐席自己，其他两方都会挂断;
b一共收到1个挂断事件


如果C先挂断：那么先收到的一个挂断事件,releasingDevice是C;然后B挂断，还会收到一次挂断事件，这时releasingDevice都是坐席自己;
b一共收到2个挂断事件；


如果C先挂断：那么先收到的一个挂断事件,releasingDevice是C;然后A挂断，还会收到一次挂断事件，这时releasingDevice都是A自己；
然后收到一个挂断事件，这是releasingDevice是坐席自己；B一共收到3个挂断事件。

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

## 2.12. retrieved：取回事件

呼叫从保持状态恢复到通话状态时产生的事件，呼叫中的所有设备都将收到此事件。

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

## 2.13. held：保持事件

呼叫一方被保持时收到的事件，呼叫中所有设备都将收到此事件。

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

## 2.14. agentWorkingAfterCall：座席话后处理事件


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

## 2.15. agentAllocated：座席预占事件

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


## 2.16. recordStarted: 录音开始事件

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
}
```
[⬆ 回到顶部](#1-事件及其数据结构)

## 2.17. recordStopped: 录音停止事件

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

## 2.18. failed: 外呼失败事件

`该事件只有在启用了外呼识别后，如果呼叫失败，才会触发。`

一般在振铃事件后，挂断事件前，如果呼叫失败，会收到failed事件。

`示例`

```
{
  "eventName": "failed",
  "eventSrc": "8003@zhen04.cc",
  "eventTime": "2018.11.09 14:20:20",
  "eventType": "csta",
  "serial": 1379070,
  "namespace": "zhen04.cc",
  "srcDeviceId": "8003@zhen04.cc",
  "callId": "eb554a5f-3432-464d-b2f6-d6645f0c8258",
  "deviceId": "917602176375@zhen04.cc",
  "localState": "Fail",
  "connectionId": "8003@zhen04.cc|eb554a5f-3432-464d-b2f6-d6645f0c8258",
  "cause": "Failed",
  "calledDevice": "917602176375@zhen04.cc",
  "failedCode": "1",
  "failedMsg": "busy now"
}
```

失败原因码`failedCode`说明


错误码|错误描述|中文描述
---|---|---
1	| busy now	| 用户正忙
2	| call reminder	| 来电提醒
3	| not reachable	| 无法接通
4	| barring of incomming|	呼入受限
5	| forwarded	|呼叫转移
6	| power off	|关机
7	| out of service|	停机
8	| does not exist	|空号
9	| hold on	|正在通话中
10 | line is busy	|网络忙
11 | not answer|	无人接听
14 | unknown	|其他



[⬆ 回到顶部](#1-事件及其数据结构)