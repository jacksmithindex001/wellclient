<!-- TOC -->

- [1. wellClient方法说明](#1-wellclient方法说明)
  - [1.1. :warning::warning: wellClient.useConfig(envName): 使用配置](#11-warningwarning-wellclientuseconfigenvname-使用配置)
  - [1.2. wellClient.setConfig(config)：设置配置信息](#12-wellclientsetconfigconfig设置配置信息)
  - [1.3. :warning::warning: wellClient.agentLogin(agent): 座席登录](#13-warningwarning-wellclientagentloginagent-座席登录)
  - [1.4. wellClient.logout()：座席登出](#14-wellclientlogout座席登出)
  - [1.5. wellClient.setAgentMode(mode)：设置座席状态](#15-wellclientsetagentmodemode设置座席状态)
  - [1.6. wellClient.makeCall(phoneNumber, oprtions)：拨打电话](#16-wellclientmakecallphonenumber-oprtions拨打电话)
  - [1.7. wellClient.answerCall(callId)：接听电话](#17-wellclientanswercallcallid接听电话)
  - [1.8. wellClient.dropConnection(callId)：挂断链接](#18-wellclientdropconnectioncallid挂断链接)
  - [1.9. wellClient.holdCall(callId)：保持电话](#19-wellclientholdcallcallid保持电话)
  - [1.10. wellClient.retrieveCall(callId)：取回电话](#110-wellclientretrievecallcallid取回电话)
  - [1.11. wellClient.singleStepTransfer(callId,phoneNumber)：单步转移](#111-wellclientsinglesteptransfercallidphonenumber单步转移)
  - [1.12. wellClient.singleStepConference(callId,phoneNumber,type)：单步会议](#112-wellclientsinglestepconferencecallidphonenumbertype单步会议)
  - [1.13. wellClient.consult(holdCallId,phoneNumber)：咨询](#113-wellclientconsultholdcallidphonenumber咨询)
  - [1.14. wellClient.conference(holdCallId, consultCallId)：会议](#114-wellclientconferenceholdcallid-consultcallid会议)
  - [1.15. wellClient.cancelConsult(holdCallId, consultCallId)：取消咨询](#115-wellclientcancelconsultholdcallid-consultcallid取消咨询)
  - [1.16. wellClient.transferCall(holdCallId, consultCallId)：咨询后转移](#116-wellclienttransfercallholdcallid-consultcallid咨询后转移)
  - [1.17. wellClient.setCallData(callId, data)：设置随路数据](#117-wellclientsetcalldatacallid-data设置随路数据)
  - [1.18. wellClient.getCallData(callId)：获取随路数据](#118-wellclientgetcalldatacallid获取随路数据)
  - [1.19. wellClient.getMyPrefix()：获取当前座席可用的前缀号码](#119-wellclientgetmyprefix获取当前座席可用的前缀号码)
  - [1.20. wellClient.isLogined()：获取当前座席是否登录](#120-wellclientislogined获取当前座席是否登录)
  - [1.21. wellClient.getConfig()：获取配置信息](#121-wellclientgetconfig获取配置信息)
  - [1.22. wellClient.getWs()：获取WebSocket对象](#122-wellclientgetws获取websocket对象)
  - [1.23. wellClient.checkRecoverStateAbility(option)：检查恢复状态能力](#123-wellclientcheckrecoverstateabilityoption检查恢复状态能力)
  - [1.24. wellClient.stopRecording()：停止录音](#124-wellclientstoprecording停止录音)
  - [1.25. wellClient.startRecording()：开启录音](#125-wellclientstartrecording开启录音)

<!-- /TOC -->


# 1. wellClient方法说明
## 1.1. :warning::warning: wellClient.useConfig(envName): 使用配置

参数 | 类型 | 是否必须 |  默认值 | 描述
---|---|---|---|---
envName | string | 是 | 无 | 使用某个环境的配置。


envName | 使用范围 | 说明
--- | --- | ---
CMB-PRO | cmb生产环境 | 使用生产的配置, 并且默认的域名会被设置成cmb.cc
CMB-DEV | cmb开发环境和测试环境 | 使用测试和生产的环境，并且默认域名会被设置成cmbyc.cc
CMB-INNER | cmb内网 | 内网环境，并且默认域名会被设置成cmb.cc
AWS-PRO | AWS环境 | 使用aws环境的配置。`建议不再使用该配置，而使用AWS-HTTPS的配置。`
AWS-HTTPS | AWS环境 | aws环境，https协议的接口
CMB-PRO2 | CMB环境 | 使用CMB-PRO2环境的配置

[⬆ 回到顶部](#1-wellclient方法说明)

## 1.2. wellClient.setConfig(config)：设置配置信息

config是js对象，具有以下字段

参数 | 类型 | 是否必须 |  默认值 | 描述
---|---|---|---|---
debug | boolean | 否 | false | debug模式会写详细的日志信息，设置成false可以关闭日志
useWsLog | boolean | 否 | false | 是否输出详细的websocket信息
clickCallClass | string | 否 | well-canBeCalled | 设置点击呼叫的类,例如某个span标签包裹一串数字“8001sd12”,当这个类被点击的时候，会对这个其中的字符串进行拨号。`建议不要依赖这个类，应当直接调用makeCall的接口。`
autoAnswer | boolean | 否 |  | 不同环境的默认值不同。设置为true，当有电话呼入时，软电话会自动接听这个电话。设置为false时，需要手动点击接听按钮才能接听。
useErrorAlert | boolean | 否 | true | 是否使用alert弹出错误信息，例如在登录时候，出现错误。默认会使用友好的提示信息告知座席。例如：座席5003已在分机：8004上登录。
如果你想自己处理登录的各种错误，你需要把这一样设置为false.

`Example`

```
wellClient.setConfig({debug:false});
```

[⬆ 回到顶部](#1-wellclient方法说明)

## 1.3. :warning::warning: wellClient.agentLogin(agent): 座席登录
参数 | 类型 | 是否必须 |  默认值 | 描述
---|---|---|---|---
agent.jobNumber | string | 是 |  | 租户控制台工号，以5开头，如5001
agent.password | string | 是 |  | 密码
agent.domain | string | 是 |  | 租户域名
agent.ext | string | 是 |  | 租户控制台分机号，以8开头，如8001
agent.loginMode | string | 否 | 'force' | 登录模式。ask: 询问过后决定是否登录；force: 强制登录，无需询问；stop: 不做处理。以上三种情况必须是座席忘记登出或者异地登录时才会起作用。其他情况的报错将直接报错，不做任何处理。
agent.agentMode | string | 否 | 'NotReady' | 坐席登录后的状态。NotReady为未就绪，Ready为就绪

`Example`

```
wellClient.agentLogin({
  jobNumber: '5001',
  password: '123456',
  domain: 'test.cc',
  ext: '8001',
  loginMode: 'ask',
  agentMode: 'Ready'
})
.done(function(res){
  // 注意： 登录请求成功并不意味登录成功，收到agentLoggedOn事件后才算登录成功
  console.log('登录请求成功');
})
.fail(function(err){
  // 建议不要直接提示登录失败
  // 应当从err.status获取错误的状态码
  // 然后将其翻译成个性化的提示

  console.log('登录请求失败，状态码: ' + err.status);

  var reasons = {
    401: "用户名或者密码错误"
    ...
  }

  var msg = reasons[err.status] || "未知错误"

  alert("登录失败: " + msg)
});
```

`错误处理`
如果发生错误，你可以从`err.status`中获取错误的状态码，不同状态码有不同的含义

:warning: :warning: :warning: 
:construction: 非常建议将各种状态码对应的提示给用户，千万不要直接报一个登录失败，要给出登录失败的原因 :construction:
:warning: :warning: :warning:

状态码 | 出现频率 | 含义 | 备注
--- | --- | --- | ---
401 | :bug: | 密码不匹配 |
423 | :bug: | 座席状态不合法 | 一般是由于座席已经被删除，或者座席被禁用
426 | :bug: | 获取AccessToken失败 |
451 | :bug::bug::bug::bug::bug: | 分机未注册 | 分机并没有在注册到sip服务器，请检查wellphone或者话机是否正常注册
452 | :bug:| 非法坐席工号 |
453 | :bug: | 非法分机号 |
454 | :bug: | 坐席已登录 | 如果登录模式设置为force, 那么454的报错并不影响软电话功能，可以忽略
455 | :bug: | 坐席已登录另外一个分机 | 可以从 err.responseJSON.deviceId（例如：8001@test.cc） 获取这个座席之前登录了哪个分机
456 | :bug: | 分机状态不合法 |
457 | :bug: | 未授权分机 |
458 | :bug: | 坐席已登出 |
459 | :bug::bug::bug::bug::bug: | 分机已经被别的坐席登陆 | 可以从 err.responseJSON.agentId（例如：5001@test.cc） 获取这个分机被哪个座席登录了
460 | :bug: | 分机忙碌 | 登录的分机正在通话中。正常情况下，软电话登录时，所使用的分机必须处于未通话状态
461 | :bug: | 坐席登陆的个数已达最大数 |
462 | :bug: | 预占坐席失败 |
483 | :bug: | 任务未分配 |

[⬆ 回到顶部](#1-wellclient方法说明)

## 1.4. wellClient.logout()：座席登出

`Example`

```
wellClient.logout()
.done(function(res){
	console.log('登出请求成功');
})
.fail(function(res){
	console.log('登出请求失败');
})
```

[⬆ 回到顶部](#1-wellclient方法说明)

## 1.5. wellClient.setAgentMode(mode)：设置座席状态

参数 | 类型 | 是否必须 |  默认值 | 描述
---|---|---|---|---
mode | string | 是 |  | 'Ready'(就绪)，'NotReady'(未就绪)

`Example`

```
wellClient.setAgentMode('Ready')
.done(function(res){
	console.log('就绪请求成功');
})
.fail(function(res){
	console.log('就绪请求失败');
})
```

[⬆ 回到顶部](#1-wellclient方法说明)

## 1.6. wellClient.makeCall(phoneNumber, oprtions)：拨打电话

`makeCall是有呼叫限制的，两秒钟之内只允许一次makeCall，否则会出问题`
`很多时候，外呼是需要有前缀号码的，例如号码前都要加9， 首先你要咨询你的服务提供商，你的外呼前缀是什么。否则在外呼的同时，可能就会收到挂断事件。`

参数 | 类型 | 是否必须 |  默认值 | 描述
---|---|---|---|---
phoneNumber | string | 是 |  | 被叫方号码
options.prefix | string | 否 | | 号码前缀, 例如有的分机拨打外线是加上9
options.originForDisplay | string | 否 | | 外显主叫号, 客户手机上看到的号码，这个最终还是由中继运营商决定, 并不能保证一定是设置的值。如果该值设置错误，将会导致呼出后立马挂断，俗称秒挂。
options.destForDisplay | string | 否 | | 外显被叫号, WellPhone或者实体话机上显示的号码
options.cpa | enumerate string | 否 | 0 | 启用外呼过程识别功能（1：启用，0：不启用），启用呼叫识别可以提高外呼效率。启用外呼识别后，如果外呼失败，会有`failed`事件被触发，可以在呼叫前订阅这个事件。
options.contextId | string | 字符串 | | JSON.stringify()后的字符串。

> `Call Progress Analysis （CPA）`呼叫进度分析，也称为呼叫进程检测（CPD），是在呼叫建立期间对音频进行操作的信号处理算法的通用术语。 CPA的目标是确定被呼叫者的性质或呼叫建立到外部网络（传统或IP）的结果。具体地，当正在建立呼叫或会话时，呼叫者或发起者有兴趣知道是否有人应答，线路是否繁忙等。当呼叫者是自动应用程序时，例如自动拨号器或消息广播系统，CPA算法用于自动执行分类。

> 现代CPA方法与自动出站拨号应用程序相结合，可确保快速准确的自动呼叫分类，从而自动转换代理的更高效率和更高质量的客户交互。--[Call_progress_analysis](https://en.wikipedia.org/wiki/Call_progress_analysis)

`Example`

关于failed事件的详细字段信息，可以查看 [事件及其数据结构](./event-struct.md) 页面的 failed事件章节

```js
wellClient.on('failed', function(e){
  // 输出呼叫失败的code和原因描述
  console.log(e.failedCode, e.failedMsg)
})

wellClient.makeCall('8007',{
  prefix: '9', 
  cpa: '1', 
  contextId: JSON.stringify({
    k1: 'v1'
  })
})
.done(function(res){
  // {"callId":"82778900-33af-488e-bcb2-cb8607c5deb1"}
	console.log('拨号请求成功, callId: ', res.callId);
})
.fail(function(res){
	console.log('拨号请求失败');
})
```

[⬆ 回到顶部](#1-wellclient方法说明)

## 1.7. wellClient.answerCall(callId)：接听电话

参数 | 类型 | 是否必须 |  默认值 | 描述
---|---|---|---|---
callId | string | 是 |  | 接听电话的callId

`Example`

```
wellClient.answerCall('6aee1dda-d4a2-4d3c-8fab-df7782a6c10f')
.done(function(res){
	console.log('接听请求成功');
})
.fail(function(res){
	console.log('接听请求失败');
})
```

[⬆ 回到顶部](#1-wellclient方法说明)

## 1.8. wellClient.dropConnection(callId)：挂断链接

参数 | 类型 | 是否必须 |  默认值 | 描述
---|---|---|---|---
callId | string | 否 |  | 电话的callId；如果不传callId,那么默认挂掉当前的通话（仅当有一通通话时可用）。

`Example`

```
wellClient.dropConnection('6aee1dda-d4a2-4d3c-8fab-df7782a6c10f')
.done(function(res){
	console.log('挂断链接请求成功');
})
.fail(function(res){
	console.log('挂断链接请求失败');
})
```

[⬆ 回到顶部](#1-wellclient方法说明)

## 1.9. wellClient.holdCall(callId)：保持电话

参数 | 类型 | 是否必须 |  默认值 | 描述
---|---|---|---|---
callId | string | 是 |  | 电话的callId

`Example`

```
wellClient.holdCall('6aee1dda-d4a2-4d3c-8fab-df7782a6c10f')
.done(function(res){
	console.log('保持链接请求成功');
})
.fail(function(res){
	console.log('保持链接请求失败');
})
```

[⬆ 回到顶部](#1-wellclient方法说明)

## 1.10. wellClient.retrieveCall(callId)：取回电话

参数 | 类型 | 是否必须 |  默认值 | 描述
---|---|---|---|---
callId | string | 是 |  | 电话的callId

`Example`

```
wellClient.retrieveCall('6aee1dda-d4a2-4d3c-8fab-df7782a6c10f')
.done(function(res){
	console.log('取回链接请求成功');
})
.fail(function(res){
	console.log('取回链接请求失败');
})
```

[⬆ 回到顶部](#1-wellclient方法说明)

## 1.11. wellClient.singleStepTransfer(callId,phoneNumber)：单步转移

参数 | 类型 | 是否必须 |  默认值 | 描述
---|---|---|---|---
callId | string | 是 |  | 电话的callId
phoneNumber | string | 是 |  | 转移给另一方的电话号码

`Example`

```
wellClient.singleStepTransfer('6aee1dda-d4a2-4d3c-8fab-df7782a6c10f','8002')
.done(function(res){
    console.log('单步转移请求成功');
})
.fail(function(res){
    console.log('单步转移请求失败');
})
```

[⬆ 回到顶部](#1-wellclient方法说明)

## 1.12. wellClient.singleStepConference(callId,phoneNumber,type)：单步会议

参数 | 类型 | 是否必须 |  默认值 | 描述
---|---|---|---|---
callId | string | 是 |  | 电话的callId
phoneNumber | string | 是 |  | 邀请参与会议方的电话号码
type | string | 否 | Active | 邀请参与会议方的参与方式，可用Active, 或者Silent两种方式

`Example`

```
wellClient.singleStepConference('6aee1dda-d4a2-4d3c-8fab-df7782a6c10f','8002')
.done(function(res){
    console.log('单步会议请求成功');
})
.fail(function(res){
    console.log('单步会议请求失败');
})
```

[⬆ 回到顶部](#1-wellclient方法说明)

## 1.13. wellClient.consult(holdCallId,phoneNumber)：咨询

咨询场景说明：

咨询提供一种在AB不挂断双方通话的前提下，其中一方可以呼叫第三方的能力。在呼叫第三方结束后，AB有机会再次回到通话中。咨询的前提是已经存在一通呼叫。

举例来说：AB处于通话中，B调用咨询接口，咨询了C。此时A会立即被保持, C会收到振铃事件。

- 如果C挂断电话，那么B就会回到和A通话过程中。
- 如果C接通了电话，那么B和C就会处于通话过程，A还是处于保持状态
  - BC通话后，B可以调用取消咨询方法`wellClient.cancelConsult()`，调用后，如果A还是处于保持状态，就会被取回。那么B和A就会处于通话状态，C会被挂断。
  - BC通话后，C可以调用挂断方法，调用后，如果A还是处于保持状态，就会被取回。那么B和A就会处于通话状态，C会被挂断。
  - 如果BC在通话过程中，A已经挂断，那么在BC通话结束后，AB也无法再回到通话状态。



参数 | 类型 | 是否必须 |  默认值 | 描述
---|---|---|---|---
callId | string | 是 |  | 咨询方电话的callId
phoneNumber | string | 是 |  | 被咨询方的电话号码

`Example`

```
wellClient.consult('6aee1dda-d4a2-4d3c-8fab-df7782a6c10f','8002')
.done(function(res){
    console.log('咨询请求成功');
})
.fail(function(res){
    console.log('咨询请求失败');
})
```

[⬆ 回到顶部](#1-wellclient方法说明)

## 1.14. wellClient.conference(holdCallId, consultCallId)：会议

参数 | 类型 | 是否必须 |  默认值 | 描述
---|---|---|---|---
callId | string | 是 |  | 保持方的callId
consultCallId | string | 是 |  | 被咨询方callId

`Example`

```
wellClient.conference('6aee1dda-d4a2-4d3c-8fab-df7782a6c10f','6aee1dda-d4a2-4d3c-8fab-df7782a6c10c')
.done(function(res){
    console.log('会议请求成功');
})
.fail(function(res){
    console.log('会议请求失败');
})
```

[⬆ 回到顶部](#1-wellclient方法说明)

## 1.15. wellClient.cancelConsult(holdCallId, consultCallId)：取消咨询

参数 | 类型 | 是否必须 |  默认值 | 描述
---|---|---|---|---
holdCallId | string | 是 |  | 保持的callId
consultCallId | string | 是 |  | 咨询的callId

`Example`

```
wellClient.cancelConsult('6aee1dda-d4a2-4d3c-8fab-df7782a6c10f','6aee1dda-d4a2-4d3c-8fab-df7782a6c10c')
.done(function(res){
    console.log('取消咨询请求成功');
})
.fail(function(res){
    console.log('取消咨询请求失败');
})
```

[⬆ 回到顶部](#1-wellclient方法说明)

## 1.16. wellClient.transferCall(holdCallId, consultCallId)：咨询后转移

参数 | 类型 | 是否必须 |  默认值 | 描述
---|---|---|---|---
holdCallId | string | 是 |  | 保持的callId
consultCallId | string | 是 |  | 咨询的callId

`Example`

```
wellClient.transferCall('6aee1dda-d4a2-4d3c-8fab-df7782a6c10f','6aee1dda-d4a2-4d3c-8fab-df7782a6c10c')
.done(function(res){
    console.log('咨询后转移请求成功');
})
.fail(function(res){
    console.log('咨询后转移请求失败');
})
```

[⬆ 回到顶部](#1-wellclient方法说明)

## 1.17. wellClient.setCallData(callId, data)：设置随路数据

参数 | 类型 | 是否必须 |  默认值 | 描述
---|---|---|---|---
callId | string | 是 |  | callId
data | array | 是 |  | 对象数组。形式必须符合：[{key:'agentId', value:'8001'},{key:'customerId', value:'19099092'}]

`Example`

```
var data = [{key:'agentId', value:'8001'},{key:'customerId', value:'19099092'}];

wellClient.setCallData('6aee1dda-d4a2-4d3c-8fab-df7782a6c10f',data)
.done(function(res){
  console.log('设置随路数据成功');
})
.fail(function(res){
  console.log('设置随路数据失败');
})
```

[⬆ 回到顶部](#1-wellclient方法说明)

## 1.18. wellClient.getCallData(callId)：获取随路数据

`注意` 获取随路数据最好的方式是从振铃事件的event.userData.data中同步的获取，可以不在调用getCall

参数 | 类型 | 是否必须 |  默认值 | 描述
---|---|---|---|---
callId | string | 是 |  | callId

`Example`

```

wellClient.getCallData('6aee1dda-d4a2-4d3c-8fab-df7782a6c10f')
.done(function(res){
	console.log('获取数据成功');
})
.fail(function(res){
	console.log('获取路数据失败');
})
```

[⬆ 回到顶部](#1-wellclient方法说明)

## 1.19. wellClient.getMyPrefix()：获取当前座席可用的前缀号码
该方法务必在登录成功之后再使用，未登录成功就使用，则返回空数组。

`Example`
```
wellClient.getMyPrefix()
["9", "6"]
```

[⬆ 回到顶部](#1-wellclient方法说明)


## 1.20. wellClient.isLogined()：获取当前座席是否登录
返回Config对象

`Example`
```
wellClient.isLogined()
true or false
```

[⬆ 回到顶部](#1-wellclient方法说明)

## 1.21. wellClient.getConfig()：获取配置信息
返回ws对象

`Example`
```
wellClient.getConfig()
```

[⬆ 回到顶部](#1-wellclient方法说明)

## 1.22. wellClient.getWs()：获取WebSocket对象
返回true or false

`Example`
```
wellClient.getWs()
```

[⬆ 回到顶部](#1-wellclient方法说明)

## 1.23. wellClient.checkRecoverStateAbility(option)：检查恢复状态能力

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

注意： 检查状态恢复能力成功后，会触发`recoverStateSuccess`事件，而不会触发agentLoggedOn, 所以如果触发了recoverStateSuccess，也是说明成功登录了。关于recoverStateSuccess可以查看这里 [1.5.2.4. 订阅状态恢复成功事件：recoverStateSuccess](#1524-订阅状态恢复成功事件recoverstatesuccess)

[⬆ 回到顶部](#1-wellclient方法说明)

## 1.24. wellClient.stopRecording()：停止录音

注意：`每次开始通话后，录音默认都是开启状态的。停止录音只对单通通话有效，并不会导致下一通通话也会停止录音。`

调用该方法后，当收到recordStopped事件后，才能说明录音已经停止录音。

`Example`

```
wellClient.stopRecording()
.done(function(res){
  console.log('请求成功')
})
.fail(function(err){
  console.log('请求失败')
})
```

## 1.25. wellClient.startRecording()：开启录音

调用该方法后，当收到recordStarted事件后，才能说明录音开始录音。

`Example`

```
wellClient.startRecording()
.done(function(res){
  console.log('请求成功')
})
.fail(function(err){
  console.log('请求失败')
})
```