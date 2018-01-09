# 注意事项

## 浏览器支持
wellClient使用了浏览器原生的WebSocket, 所以wellClient要求浏览器必须支持WebSocket。兼容性如下所示。

IE | Edge | Firefox | Chrome | Safari 
--- | --- | --- | --- | ----
>= 11 | >= 15 | >= 57 | >=49 | >= 10.1

## 软件依赖
wellClient并不依赖任何第三方插件

## 资源引入
wellClient包含两个js文件。
- `必须`: well-client.js必须先引入
- `可选`: well-client-ui.js，如果你只用接口，不用wellClient自带的界面，那么可以不引入此文件