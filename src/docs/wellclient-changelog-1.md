<!-- TOC -->

- [1. 建议从振铃事件中获取随路数据](#1-建议从振铃事件中获取随路数据)
  - [1.1. 以前的方式](#11-以前的方式)
  - [1.2. 新的方式](#12-新的方式)
- [2. 隐藏在分机上显示的客户号码](#2-隐藏在分机上显示的客户号码)
- [3. 软电话状态恢复功能](#3-软电话状态恢复功能)
  - [3.1. checkRecoverStateAbility接口说明](#31-checkrecoverstateability接口说明)
  - [3.2. 订阅状态恢复成功事件：recoverStateSuccess](#32-订阅状态恢复成功事件recoverstatesuccess)
  - [3.3. 状态恢复具体实现思路](#33-状态恢复具体实现思路)

<!-- /TOC -->

# 1. 建议从振铃事件中获取随路数据

PS: 非常建议您使用振铃事件中的随路数据，这个改动相对于原来的逻辑更加简单，改动也比较小。

## 1.1. 以前的方式

```
// 订阅振铃事件
wellClient.on('delivered',function(data){

    // 根据事件中的callId, 调用ajax接口获取随路数据
    wellClient.getCallData(data.callId)
    .done(function(res){
	      console.log('获取数据成功');
        console.log(res)
    })
    .fail(function(err){
	      console.log('获取路数据失败');
        console.log(err)
    })
});
```


## 1.2. 新的方式

实际上，随路数据已经本身就存在于振铃事件中了。就是`userData`字段, 每个振铃事件都有userData字段，无论是手动外呼还是自动外呼。

其中userData.data会带有一些系统自带的字段，这些字段你可以不用管，你只需要关心你需要的字段就可以。


```
// 订阅振铃事件
wellClient.on('delivered',function(data){
    console.log(data.userData) // userData字段就是随路数据
});
```

关于userData字段，下面给出两个完整的delivered事件示例。

**振铃事件模型**

```
// 手动外呼振铃事件
{
  "eventName": "delivered",
  "eventSrc": "8888@tt.cc",
  "eventTime": "2018.05.18 09:20:09",
  "eventType": "csta",
  "serial": 10200898,
  "namespace": "tt.cc",
  "srcDeviceId": "8888@tt.cc",
  "callId": "7411b793-b70f-4531-90d4-5ec0e6e3fa1c",
  "deviceId": "1760217****@tt.cc",
  "localState": "Alerting",
  "connectionId": "8888@tt.cc|7411b793-b70f-4531-90d4-5ec0e6e3fa1c",
  "cause": "newCall",
  "alertingDevice": "1760217****@tt.cc",
  "callingDevice": "8888@cmb.cc",
  "calledDevice": "1760217****@tt.cc",
  "userData": {
    "data": {
      "originalANI": "8888@tt.cc",
      "originalDNIS": "1760217****@tt.cc",
      "originalCallId": "7411b793-b70f-4531-90d4-5ec0e6e3fa1c"
    }
  }
}

// 自动外呼振铃事件模型
{
  "eventName": "delivered",
  "eventSrc": "8888@tt.cc",
  "eventTime": "2018.05.18 09:41:01",
  "eventType": "csta",
  "serial": 10307101,
  "namespace": "cmb.cc",
  "srcDeviceId": "8888@tt.cc",
  "callId": "faeaf066-dc91-4d9c-af77-7bf20a88f953",
  "deviceId": "8888@tt.cc",
  "localState": "Alerting",
  "connectionId": "8888@tt.cc|faeaf066-dc91-4d9c-af77-7bf20a88f953",
  "cause": "PREOCCUPIED",
  "alertingDevice": "8888@tt.cc",
  "callingDevice": "1760217****@tt.cc",
  "calledDevice": "8888@tt.cc",
  "userData": {
    "data": {
      "origin_dnis": "7022",
      "id": "57336840",
      "selectAgent": "50483@tt.cc",
      "originalANI": "1760217****@tt.cc",
      "originalDNIS": "8888@tt.cc",
      "originalCallId": "faeaf066-dc91-4d9c-af77-7bf20a88f953",
      "prdType": "E",
      "callType": "PREOCCUPIED"
    }
  },
  "split": "7022@tt.cc"
}"
```

# 2. 隐藏在分机上显示的客户号码

PS: 如果您对客户号码比较的安全性要求比较高，请务必设置destForDisplay字段。

有时候外呼一个手机号例如17677778888，但是需要在真实的分机上不显示这个手机号，即隐藏真实的手机号，可以通过设置`destForDisplay`, 去自定义分机上显示的内容。例如：

这就可以让分机上看到的号码是1767777****，而不是原始号码17677778888。

```
wellClient.makeCall('17677778888',{destForDisplay: '1767777****'})
.done(function(res){
	console.log('拨号请求成功');
})
.fail(function(res){
	console.log('拨号请求失败');
})
```


参数 | 类型 | 是否必须 |  默认值 | 描述
---|---|---|---|---
phoneNumber | string | 是 |  | 被叫方号码
options.prefix | string | 否 | | 号码前缀, 例如有的分机拨打外线是加上9
options.originForDisplay | string | 否 | | 外显主叫号, 客户手机上看到的号码，这个最终还是由中继运营商决定, 并不能保证一定是设置的值
options.destForDisplay | string | 否 | | 外显被叫号, WellPhone或者实体话机上显示的号码
options.cpa | enumerate string | 否 | 0 | 启用外呼过程识别功能（1：启用，0：不启用），启用呼叫识别可以提高外呼效率


# 3. 软电话状态恢复功能

PS: 该功能的适用场景是，在软电话处于通话过程中时，如果用户不小心刷新了页面，状态恢复功能可以让用户不用再次登录，可以直接恢复之前的状态。该功能属于可选功能，第三方可以根据自己的实际情况，决定是否集成该功能。


## 3.1. checkRecoverStateAbility接口说明
状态恢复功能需要配合`wellClient.checkRecoverStateAbility(option)`去实现：

参数 | 类型 | 是否必须 |  默认值 | 描述
---|---|---|---|---
jobNumber | string | 是 | '' | 工号
ext | string | 是 | ''  | 分机号
domain | string | 是 | '' | 域名

checkRecoverStateAbility返回Deffered对象

`Example`
```
wellClient.checkRecoverStateAbility({
  jobNumber: '5001',
  ext: '8001',
  domain: 'test.cc'
})
.done(function(res){
  // 检查状态能力成功，
  // wellClient会自动恢复内部呼叫模型，
  // 如果你使用wellClient自带的UI, 假如你在通话过程中刷新页面，那么检查状态成功后，会恢复相关按钮的高亮状态
})
.fail(function(res){
  // 检查状态能力失败，
  // 这表示wellClient无法恢复状态，需要去调用agentLogin方法去重新登录
  wellClient.agentLogin({...})
})
```

注意： 检查状态恢复能力成功后，会触发`recoverStateSuccess`事件，而不会触发agentLoggedOn, 所以如果触发了recoverStateSuccess，也是说明成功登录了。

## 3.2. 订阅状态恢复成功事件：recoverStateSuccess

```
wellClient.innerOn('recoverStateSuccess', function(e){
	console.log(e)
})

// 事件结构如下
// call对象是可选的，如果状态恢复时座席不是处于通话状态，则没有call对象
// call.state 可能有两个值。established代表通话中，delivered代表振铃中
// 如果呼叫处于established状态中，那么客户端也不会收到established事件
// 如果呼叫处于delivered状态，那么客户端也不会收到delivered，wellClient会根据配置的autoAnswer字段判断是否需要自动应答，如果应答成功，会触发establisheds事件
// 综上：已经发生的事件是不会再次触发的，未来的事件还是会触发

{
  "eventName": "recoverStateSuccess",
  "agentId": "5001@bzkun.cc",
  "extensionId": "8004@bzkun.cc",
  "agentMode": "NotReady",
  "agentName": "sdf",
  "call": {
    "callId": "f268cf58-c0eb-4098-a2a4-1c807ca9d556",
    "callingDevice": "8004@bzkun.cc",
    "calledDevice": "8005@bzkun.cc",
    "state": "established"
  }
}
```

## 3.3. 状态恢复具体实现思路

在之前的的思路是，当用户点击了登录按钮，则直接调用wellClient.agentLogin()方法去登录，如果要实现状态恢复功能，则需要按照如下的伪代码来处理。

```
// 订阅登录成功事件
wellClient.on('agentLoggedOn',function(event){
  console.log('此时真正登录成功');
})

// 订阅恢复状态成功事件
// 此时也算是登录成功
wellClient.innerOn('recoverStateSuccess', function(e){
  console.log('此时真正登录成功');
})


$('#login-btn').on('click', function () {
  var jobNumber = ... // 工号
  var ext =  ... // 分机号
  var domain = ... // 域名

  wellClient.checkRecoverStateAbility({
    jobNumber: jobNumber,
    ext: ext,
    domain: domain
  })
  .done(function(res){
    // 检查状态能力成功，稍后马上回触发recoverStateSuccess的事件订阅函数
    // wellClient会自动恢复内部呼叫模型，
    // 如果你使用wellClient自带的UI, 假如你在通话过程中刷新页面，那么检查状态成功后，会恢复相关按钮的高亮状态
  })
  .fail(function(res){
    console.log('无法恢复状态，需要调用agentLogin去登录')
    wellClient.agentLogin({
      ... // 一些登录信息
      ...
    })
    .done(function (res) {
      console.log(res)
    })
    .fail(function(error) {
      console.log(error)
    })
  })
})

```