<!-- TOC -->

- [1. 快速开始](#1-快速开始)
  - [1.1. 运行项目和在线demo](#11-运行项目和在线demo)
  - [1.2. 硬件要求](#12-硬件要求)
  - [1.3. 软件要求](#13-软件要求)
  - [1.4. 引入JS文件](#14-引入js文件)
  - [1.5. :warning::warning:配置](#15-warningwarning配置)
  - [1.6. 登录](#16-登录)
  - [1.7. 调试](#17-调试)
  - [1.8. wellPhone相关](#18-wellphone相关)
  - [1.9. 注意事项](#19-注意事项)

<!-- /TOC -->

# 1. 快速开始
1. 不经本人同意，请不要修改well-client.js, well-client-ui.js的任何代码。擅自修改源代码，很可能导致意外的问题。
2. 请使用在`wellClient`方法说明中含有的方法，使用没有说明文档的方法，并不能保证这些方法的功能稳定性。
3. :warning: 表示这个地方需要特别注意的

[⬆ 回到顶部](#1-快速开始)

## 1.1. 运行项目和在线demo

- [查看 在线的github pages demo](https://wangduanduan.github.io/wellclient/)
- [查看 aws环境 https demo](https://api.wellcloud.cc/phone/)

直接用浏览器打开根目录下的index.html。或者你也可以访问


然后在浏览器里打开： 可以看到如下basic分支的界面。
![image](./public/img/demo2.jpg)

[⬆ 回到顶部](#1-快速开始)


## 1.2. 硬件要求

软电话使用浏览器原生的WebSocket来接收事件，因此浏览器必须支持原生的WebSocket。所以对浏览器版本要求如下。

 - :warning::warning::warning::warning: **IE >= 11**
 - 谷歌浏览器 >= 49
 - FireFox >= 54
 - Edge >= 14

 [⬆ 回到顶部](#1-快速开始)

## 1.3. 软件要求
- jQuery >= 1.11.3

[⬆ 回到顶部](#1-快速开始)

## 1.4. 引入JS文件
`请不要在以下的js里修改任何代码，或者将自己的业务逻辑添加在里面`

> :warning: 注意：我们提供的js的编码都是utf-8的，如果你的代码编码是其他格式，可能会产生问题，最好先软电话js的编码转成你的编码格式。

- 【必须】`stomp.min.js`: 解析stomp协议
- 【必须】`well-client.js`： 软电话核心文件
- 【可选】`well-client-ui.js`： 软电话UI层逻辑处理，如果你只需要调用软电话的接口，不需要软电话自带的UI的话，这个JS文件是不需要引入的
- 【废弃】`websocket-support.min.js`: 最早的集成中引入了这个文件，但是由于其中存在一些无法修复的问题，所以废弃

综上，在你HTML的头部可能是这个样子。
```
<head>
  <meta charset="utf-8">
  <title>wellClient 软电话</title>
  <link rel="stylesheet" href="public/css/well-client.css">
  <script charset="UTF-8" src="public/js/jquery-1.11.3.min.js"></script>
  <script charset="UTF-8" src="public/js/stomp.min.js"></script>
  <script charset="UTF-8" src="public/js/well-client.js"></script>
  <script charset="UTF-8" src="public/js/well-client-ui.js"></script>
</head>
```

:warning::warning:当然，`我强烈建议您使用我们提供的云端的js文件`, 只需要修改头部信息如下。
```
// 针对aws环境
// jquery建议使用本地的，最好不要低于1.11.3
// stomp.min.js你也可以引用本地的
// well-client.js 务必引用我们云端的
// well-client-ui.js 如果你用自己的UI, 你可以不用引入well-client.js; 否则，务必引入我们云端的js
<head>
  <meta charset="utf-8">
  <title>wellClient 软电话</title>
  <link rel="stylesheet" href="https://api.wellcloud.cc/phone/public/css/well-client.css">
  <script charset="UTF-8" src="https://api.wellcloud.cc/phone/public/js/jquery-1.11.3.min.js"></script>
  <script charset="UTF-8" src="https://api.wellcloud.cc/phone/public/js/stomp.min.js"></script>
  <script charset="UTF-8" src="https://api.wellcloud.cc/phone/public/js/well-client.js"></script>
  <script charset="UTF-8" src="https://api.wellcloud.cc/phone/public/js/well-client-ui.js"></script>
</head>
```

[⬆ 回到顶部](#1-快速开始)

## 1.5. :warning::warning:配置
由于软电话可以连接不同的服务端，所以在调用任何接口之前，必须先要配置一次。当然了，每次刷新页面后，都是需要再次配置一次的。配置的方法很简单。示例如下：

```
// 可以在页面的js文件加载完成后，执行下面的函数，不同环境需要不同的配置名
wellClient.useConfig('CMB-PRD2');
```
wellClient.useConfig(envName): 使用配置

envName | 使用范围
--- | ---
CMB-PRO | cmb pro env
CMB-DEV | cmb dev env
CMB-PRO2 | prd2 env 
AWS-HTTPS | aws https env

[⬆ 回到顶部](#1-快速开始)

## 1.6. 登录
```
// 订阅单个事件
wellClient.on('agentLoggedOn',function(event){
    console.log('此时真正登录成功');
});

// 订阅所有事件
wellClient.exports = function(event){
    console.log('receive event: >>>');
    console.log(event.eventName);
};


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
.fail(function(res){
  console.log('登录请求失败');
});
```
[⬆ 回到顶部](#1-快速开始)

## 1.7. 调试
默认情况下，软电话收到的事件是不会打印到控制台的，如果你想把所有的事件在收到时都可以在控制台打印，可以使用一下方式。
```
wellClient.setConfig({
    useWsLog: true
})
```

[⬆ 回到顶部](#1-快速开始)

## 1.8. wellPhone相关
- wellPhone下载，[点击此处下载](http://www.welljoint.com/wellPhone.zip)

[⬆ 回到顶部](#1-快速开始)

## 1.9. 注意事项

- **软电话是有状态的，页面刷新会导致状态丢失，也有可能导致事件丢失。**，所以，在软电话处于通话或者振铃等有呼叫的状态时，尽量不要刷新页面。





