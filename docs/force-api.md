<!-- TOC -->

- [1. 强制操作接口](#1-强制操作接口)
  - [1.1. wellClient.forceDrop(deviceId, callId): 强拆](#11-wellclientforcedropdeviceid-callid-强拆)
  - [1.2. wellClient.forceJoin(deviceId, callId, phoneNumber): 强插](#12-wellclientforcejoindeviceid-callid-phonenumber-强插)
  - [1.3. wellClient.forceTake(deviceId, callId, phoneNumber): 接管](#13-wellclientforcetakedeviceid-callid-phonenumber-接管)
  - [1.4. wellClient.forceListen(callId, deviceId): 监听](#14-wellclientforcelistencallid-deviceid-监听)
  - [1.5. wellClient.forceReady(agentId, deviceId): 强制就绪](#15-wellclientforcereadyagentid-deviceid-强制就绪)
  - [1.6. wellClient.forceNotReady(agentId, deviceId):强制离席](#16-wellclientforcenotreadyagentid-deviceid强制离席)
  - [1.7. wellClient.forceLogout(agentId, deviceId): 强制签出](#17-wellclientforcelogoutagentid-deviceid-强制签出)

<!-- /TOC -->

# 1. 强制操作接口
## 1.1. wellClient.forceDrop(deviceId, callId): 强拆
> 强制通话中的设备挂断电话。必须保证被插入的设备在通话中才可以进行强拆。

参数 | 类型 | 是否必须 |  默认值 | 描述
---|---|---|---|---
deviceId | string | 是 |  | 设备id
callId | string | 是 |  | 呼叫id

`Example`

```
wellClient.forceDrop('8001@test.cc', '6aee1dda-d4a2-4d3c-8fab-df7782a6c10f')
.done(function(res){
    console.log('强拆请求成功');
})
.fail(function(res){
    console.log('强拆请求失败');
});
```

[⬆ 回到顶部](#1-强制操作接口)

## 1.2. wellClient.forceJoin(deviceId, callId, phoneNumber): 强插
> 强制进入一个通话中，类似于进入会议。必须保证被插入的设备在通话中才可以进行强插。


参数 | 类型 | 是否必须 |  默认值 | 描述
---|---|---|---|---
deviceId | string | 是 |  | 被插入设备的id
callId | string | 是 |  | 被插入设备的callId
phoneNumber | string | 是 |  | 插入方设备号码

`Example`

```
wellClient.forceJoin('8001@test.cc', '6aee1dda-d4a2-4d3c-8fab-df7782a6c10f', '8002')
.done(function(res){
    console.log('强插请求成功');
})
.fail(function(res){
    console.log('强插请求失败');
});
```

[⬆ 回到顶部](#1-强制操作接口)

## 1.3. wellClient.forceTake(deviceId, callId, phoneNumber): 接管
> 接管通过的座席，让通话转接到指定的设备上。必须保证被接管的设备在通话中才可以进行接管。

参数 | 类型 | 是否必须 |  默认值 | 描述
---|---|---|---|---
deviceId | string | 是 |  | 被接管设备的id
callId | string | 是 |  | 被接管设备的callId
phoneNumber | string | 是 |  | 接管方设备号码

`Example`

```
wellClient.forceTake('8001@test.cc', '6aee1dda-d4a2-4d3c-8fab-df7782a6c10f', '8002')
.done(function(res){
    console.log('强插请求成功');
})
.fail(function(res){
    console.log('强插请求失败');
});
```

[⬆ 回到顶部](#1-强制操作接口)

## 1.4. wellClient.forceListen(callId, deviceId): 监听
> 监听通话。

参数 | 类型 | 是否必须 |  默认值 | 描述
---|---|---|---|---
callId | string | 是 |  | 被监听通话的callId
deviceId | string | 是 |  | 使用设备（deviceId）去监听

`Example`

```
wellClient.forceListen('6aee1dda-d4a2-4d3c-8fab-df7782a6c10f', '8002@test.cc')
.done(function(res){
    console.log('监听请求成功');
})
.fail(function(res){
    console.log('监听请求失败');
});
```

[⬆ 回到顶部](#1-强制操作接口)

## 1.5. wellClient.forceReady(agentId, deviceId): 强制就绪

参数 | 类型 | 是否必须 |  默认值 | 描述
---|---|---|---|---
agentId | string | 是 |  | 座席Id
deviceId | string | 是 |  | 座席使用的设备Id

`Example`

```
wellClient.forceReady('5001@test.cc', '8002@test.cc')
.done(function(res){
    console.log('强制就绪请求成功');
})
.fail(function(res){
    console.log('强制就绪请求失败');
});
```

[⬆ 回到顶部](#1-强制操作接口)

## 1.6. wellClient.forceNotReady(agentId, deviceId):强制离席

参数 | 类型 | 是否必须 |  默认值 | 描述
---|---|---|---|---
agentId | string | 是 |  | 座席Id
deviceId | string | 是 |  | 座席使用的设备Id

`Example`

```
wellClient.forceNotReady('5001@test.cc', '8002@test.cc')
.done(function(res){
    console.log('强制离席请求成功');
})
.fail(function(res){
    console.log('强制离席请求失败');
});
```

[⬆ 回到顶部](#1-强制操作接口)

## 1.7. wellClient.forceLogout(agentId, deviceId): 强制签出
> 强制座席签出

参数 | 类型 | 是否必须 |  默认值 | 描述
---|---|---|---|---
agentId | string | 是 |  | 座席Id
deviceId | string | 是 |  | 座席使用的设备Id

`Example`

```
wellClient.forceLogout('5001@test.cc', '8002@test.cc')
.done(function(res){
    console.log('强制签出请求成功');
})
.fail(function(res){
    console.log('强制签出请求失败');
});
```

[⬆ 回到顶部](#1-强制操作接口)