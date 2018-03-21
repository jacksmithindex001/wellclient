# 1. wellclient IE8, IE9解决方案

本方案是使用了[web-socket-js](https://github.com/gimite/web-socket-js), web-socket-js是基于flash技术，要求IE8, IE9必须是Flash Player 10 或者更新的版本

# 2. 引入资源

概览：

```
<head>
	<meta charset="utf-8">
	<title>wellClient 软电话</title>
	<link rel="stylesheet" href="public/css/well-client.css">
	<script>
		WEB_SOCKET_SWF_LOCATION = 'public/js/WebSocketMain.swf'
	</script>
	
	<script charset="UTF-8" src="public/js/swfobject.js"></script>
	<script charset="UTF-8" src="public/js/web_socket.js"></script>
	<script charset="UTF-8" src="public/js/stomp.js"></script>

	<script charset="UTF-8" src="public/js/jquery-1.11.3.min.js"></script>
	<script charset="UTF-8" src="public/js/well-client.js"></script>
	<script charset="UTF-8" src="public/js/well-client-ui.js"></script>
</head>
```

**重点说明**

1. 定义一个全局变量WEB_SOCKET_SWF_LOCATION，这个变量名不能改动，它的值指向swf文件的位置，你需要将swf文件放在静态文件服务上，web_socket.js在实例化时，会向这个地址去请求下载swf文件

```
<script>
	WEB_SOCKET_SWF_LOCATION = 'public/js/WebSocketMain.swf'
</script>
```

2. 引入swfobject.js 和 web_socket.js, stomp.js

注意是ie89分支下的**stomp.js**，而不是stomp.min.js。因为原始的stomp.min.js在IE8,IE9上有不规范的行为，我基于stompjs源码修改后，让stompjs可以在ie89上正常运行。注意：必须是引入ie89分支下的stomp.js文件。建议你可以将`swfobject.js， web_socket.js，WebSocketMain.swf`都下载下来，放在本地的服务器上。

```
<script charset="UTF-8" src="public/js/swfobject.js"></script>
<script charset="UTF-8" src="public/js/web_socket.js"></script>
<script charset="UTF-8" src="public/js/stomp.js"></script>
```