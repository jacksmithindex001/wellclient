//-----------------------------------------------------------------------------+
//+                                                                            +
//+                               core                                         +
//+                                                                            +
//-----------------------------------------------------------------------------+
var wellClient = (function($) {
    var app = function() {};
    app.pt = app.prototype;

    // 配置信息
    var Config = {
        debug: true,
        useWsLog: true,
        SDK: '10.100.32.215',
        cstaPort: '58080',
        eventPort: '58080',
        eventBasePath: '/mvc/stomp',
        cstaBasePath: '/api/csta',
        clickCallClass:'well-canBeCalled',
        timeout: 5, // 断线5秒后重连
        maxReconnectTimes: 5, // 最多重连次数
        currentReconnectTimes: 0, // 当前重连次数
        TPI:'10.100.32.215:8090/login',
        isLogined: false,
        heartbeatLength: 2*60*1000, // 心跳频率
        heartbeatId: '',    // 心跳Id
        enableAlert: false // 是否启用alert弹出错误信息
    };

    // 呼叫对象
    var callMemory = {
        length: 0 // callId的个数
    };

    function fire(pathParm, payload){
        var path = util.render(this.path, pathParm);
        return util.sendRequest(path, this.method, payload);
    }

    // 接口地址及状态码 wdd
    var apis = {
        setAgentState: {
            desc: '设置坐席状态，登录与登出',
            path: '/agent/state',
            method: 'post',
            status: {
                204: '成功',
                401: '密码不匹配',
                451: '分机未注册',
                453: '非法分机号',
                454: '分机已被登录',
                455: '坐席已经登录',
                456: '分机状态',
                457: '未授权分机',
                461: '在线坐席超过最大限制'
            },
            fire: fire
        },
        heartbeat:{
            desc:'坐席心跳',
            path:'/agent/heartbeat/{{agentId}}',
            method:'post',
            fire: fire
        },
        makeCall: {
            desc: '呼出电话',
            path: '/callControl/calls',
            method: 'post',
            fire: fire
        },
        answerCall:{
            desp:'接电话',
            path:'/callControl/calls/{{callId}}/connections/{{connectionId}}/answer',
            method:'post',
            fire: fire
        },
        dropConnection:{
            desp:'挂断链接',
            path:'/callControl/calls/{{callId}}/connections/{{connectionId}}',
            method:'delete',
            fire: fire
        },
        holdCall:{
            desp:'保持电话',
            path:'/callControl/calls/{{callId}}/connections/{{connectionId}}/hold',
            method:'post',
            fire: fire
        },
        retrieveCall:{
            desp:'取回电话',
            path:'/callControl/calls/{{callId}}/connections/{{connectionId}}/retrieve',
            method:'post',
            fire: fire
        },
        singleStepTransfer:{
            desp:'单步转移',
            path:'/callControl/calls/{{callId}}/connections/{{connectionId}}/singleStepTransfer',
            method:'post',
            fire: fire
        },
        singleStepConference:{
            desp:'单步会议',
            path:'/callControl/calls/{{callId}}/connections/{{connectionId}}/singleStepConference',
            method:'post',
            fire: fire
        },
        consult:{
            desp:'咨询',
            path:'/callControl/calls/{{callId}}/connections/{{connectionId}}/consult',
            method:'post',
            fire: fire
        },
        conference:{
            desp:'咨询',
            path:'/callControl/calls/{{callId}}/connections/{{connectionId}}/conference',
            method:'post',
            fire: fire
        },
        cancelConsult:{
            desp:'取消咨询',
            path:'/callControl/calls/{{callId}}/connections/{{connectionId}}/cancelConsult',
            method:'post',
            fire: fire
        },
        transferCall:{
            desp:'咨询后转移',
            path:'/callControl/calls/{{callId}}/connections/{{connectionId}}/transfer',
            method:'post',
            fire: fire
        },
        setCallData:{
            desp:'设置随路数据',
            path:'/callControl/calls/{{callId}}/user-data',
            method:'post',
            fire: fire
        },
        spy: {
            desp: '监听设备',
            path: '/callControl/calls/{{callId}}/spy?deviceId={{deviceId}}',
            method: 'post',
            fire: fire
        }
    };

    // 用户信息
    var user = {
        number: '5001',
        password: 'Tpi123456',
        domain: 'tianan.cc',
        ext: '8001'
    }; 

    // 环境变量
    var env = {
        user: {},
        sessionId: ''
    };

    // 缓存
    var cache = {};

    // websocket
    var ws = {}; 

    // 内部工具函数
    var util = {
        render: function(tpl, data){
            var re = /{{([^}]+)?}}/g;
            var match = '';

            while(match = re.exec(tpl)){
                tpl = tpl.replace(match[0],data[match[1]]);
            }

            return tpl;
        },
        // 清空缓存
        clearCache:function(){
            if(cache.logined){
                return;
            }

            env = {
                user: {},
                sessionId: ''
            };
            callMemory = {};
        },

        //日志输出
        log: function(msg) {
            if (Config.debug) {
                // console.info('>>>'+new Date());
                console.info(msg);
            }

            app.pt.outputLog({
                type: 'log',
                content: typeof msg === 'object' ? JSON.stringify(msg):msg
            });

            // try{
            //     if(!!jscallbackobj) { 
            //         msg = typeof msg === 'object'? JSON.stringify(msg) : msg;
            //         jscallbackobj.onjsinfo(msg);
            //     }
            // }
            // catch(err){
            //     alert('log,msg type:'+typeof(msg)+err.message);
            // }
        },
        error: function(msg) {
            if (Config.debug) {
                try{
                    throw new Error(msg);
                }catch(e){
                    console.error(e);
                }
            }

            app.pt.outputLog({
                type: 'error',
                content: typeof msg === 'object' ? JSON.stringify(msg):msg
            });

            // try{
            //     if(!!jscallbackobj) { 
            //         msg = typeof msg === 'object'? JSON.stringify(msg) : msg;
            //         jscallbackobj.onjsinfo(msg);
            //     }
            // }
            // catch(err){
            //     alert('log,msg type:'+typeof(msg)+err.message);
            // }
        },
        alert: function(msg) {
            if (Config.debug) {
                // console.info('>>>'+new Date());
                console.error(msg);
            }

            app.pt.outputLog({
                type: 'alert',
                content: typeof msg === 'object' ? JSON.stringify(msg):msg
            });

            // try{
            //     if(!!jscallbackobj) { 
            //         msg = typeof msg === 'object'? JSON.stringify(msg) : msg;
            //         jscallbackobj.onjsinfo(msg);
            //     }
            // }
            // catch(err){
            //     alert('log,msg type:'+typeof(msg)+err.message);
            // }
        },

        typeof: function(opt) {
            return typeof opt;
        },

        getErrorMsg: function(name, statusCode) {
            return apis[name].status[statusCode] || '';
        },

        // 判断是否是电话号码
        isPhoneNumber: function(number) {
            //return util.typeof(number) === 'string' && /^\d+$/.test(number);
			return typeof number === 'string' && number !== '';
        }, 

        // 发送ajax请求
        sendRequest: function(path, method, payload) {
            return $.ajax({
                url: 'http://' + Config.SDK + ':' + Config.cstaPort + Config.cstaBasePath + path,
                type: method || "get",
                headers: {
                    sessionId: env.sessionId || ''
                },
                data: JSON.stringify(payload),
                dataType: "json",
                contentType: 'application/json; charset=UTF-8'
            });
        },        

        // 发送同步ajax请求
        sendRequestSync: function(path, method, payload) {
            var dfd = $.Deferred();
            $.ajax({
                url: 'http://' + Config.SDK + ':' + Config.cstaPort + Config.cstaBasePath + path,
                type: method || "get",
                headers: {
                    sessionId: env.sessionId || ''
                },
                async: false,
                data: JSON.stringify(payload),
                dataType: "json",
                contentType: 'application/json; charset=UTF-8',
                success: function(data) {
                    dfd.resolve(data);
                },
                error: function(data) {
                    dfd.reject(data);
                }
            });

            return dfd.promise();
        }, 



        // TPI login
        TPILogin:function(username, password, namespace){
            var dfd = $.Deferred();
            var url = 'http://' + Config.TPI;
            var data = 'username='+username+'&password='+password+'&namespace='+namespace;

            $.ajax({
                url: url,
                type: 'post',
                data: data,
                dataType: "json",
                contentType: 'application/x-www-form-urlencoded',
                success: function(data) {
                    dfd.resolve(data);
                },
                error: function(data) {
                    dfd.reject(data);
                }
            });

            return dfd.promise();
        },

        // 设置坐席状态 
        setAgentState: function(payload) {
            var dfd = $.Deferred();

            var method = apis.setAgentState.method,
                path = apis.setAgentState.path;

            util.sendRequest(path, method, payload)
                .done(function(res) {
                    dfd.resolve(res);
                })
                .fail(function(res) {
                    dfd.reject(res);
                });

            return dfd.promise();
        }, 

        // 设置坐席状态 
        setAgentStateSync: function(payload) {
            var dfd = $.Deferred();

            var method = apis.setAgentState.method,
                path = apis.setAgentState.path;

            util.sendRequestSync(path, method, payload)
                .done(function(res) {
                    dfd.resolve(res);
                })
                .fail(function(res) {
                    dfd.reject(res);
                });

            return dfd.promise();
        }, 

        // 登录软电话
        login: function(mode) {
            var $dfd = $.Deferred();

            var req = {
                loginId: env.loginId,
                device: env.deviceId,
                password: env.user.password,
                agentMode: 'Ready',
                func: 'Login'
            };

            util.setAgentState(req)
            .done(function(res) {
                util.log('登录成功');
                // Config.isLogined = true;
                // util.initWebSocket();
                util.initSoftPhone();

                $dfd.resolve(res);
            })
            .fail(function(res) {
                mode = mode || 'ask';

                if (res.status == '454') {

                    // 不会继续执行
                    if(mode === 'stop'){
                        util.closeWebSocket();
                        $dfd.reject(res);
                    }

                    // 询问
                    else if(mode === 'ask'){
                        var ask = confirm('分机已经在别的地方登录，或者上次分机忘记登出，是否强制登录');
                        if(ask){
                            cache.logined = true; 

                            app.pt.logout(false)
                            .done(function(res) {
                                util.login()
                                .done(function(res){
                                    $dfd.resolve();
                                });
                            });
                        }
                        else{
                            util.closeWebSocket();
                            $dfd.reject(res);
                        }

                    }

                    // 强制登录
                    else if(mode === 'force') {
                        cache.logined = true; 

                        app.pt.logout(false)
                        .done(function(res) {
                            util.login()
                            .done(function(res){
                                $dfd.resolve();
                            });
                        });
                    }
                }
                else {
                    var errorMsg = util.getErrorMsg('setAgentState', res.status);
                    util.log(errorMsg);
                    util.closeWebSocket();

                    // try{                       
                    //     if(!!jscallbackobj){
                    //           jscallbackobj.onjserrorcode(res.status, errorMsg);
                    //     }
                    // }
                    // catch(e){
                    //     util.error(e);
                    // }

                    $dfd.reject(res);
                }
            });

            return $dfd.promise();
        }, 

        // 初始化websocket
        initWebSocket: function() {
            var url = 'http://' + Config.SDK + ':' + Config.eventPort + Config.eventBasePath;
            var socket = new SockJS(url);
            ws = Stomp.over(socket);
 
            if(!Config.useWsLog){
                ws.debug = null;
            }

            ws.connect({}, function(frame) {

                // Config.connectionException = false;
                Config.currentReconnectTimes = 0;

                // var dest = '/topic/csta/' + env.deviceId;
                // var dest = '/topic/csta/device/' + env.deviceId;
                var dest = '/topic/csta/agent/' + env.loginId;
                ws.subscribe(dest, function(event) {
                    var eventInfo = JSON.parse(event.body);
                    // util.log('>>>'+eventInfo.eventName);
                    // console.info(eventInfo);
                    eventHandler.deliverEvent(eventInfo);
                });
            }, function(frame) {

                console.log(frame);
                console.error(new Date() + 'websocket失去连接');

                if(Config.currentReconnectTimes < Config.maxReconnectTimes){
                    Config.currentReconnectTimes++;
                    util.reconnectWs();
                }
            });
        }, 

        reconnectWs: function(){
            setTimeout(function(){
                console.log('>>> 尝试重连websocket');
                util.initWebSocket();

            }, Config.timeout * 1000);
        },

        // 正常断开websocket
        closeWebSocket: function(){
            if(!$.isFunction(ws.disconnect)){
                return;
            }

            // Config.connectionException = false;

            ws.disconnect(function(res){
                util.log(res);
            });
        },

        /**
         * [clickCallListening 点击拨号]
         * @Author   Wdd
         * @DateTime 2016-12-13T09:41:37+0800
         * @param    {[string]} className [点击拨号的类名]
         */
        clickCallListening: function(className){
            $(document).on('click', '.'+className, function(e){
                e.stopPropagation();

                var phoneNumber = $(e.currentTarget).text().replace(/\D/g, '');
                $('#well-number').val(phoneNumber);
                $('#well-make').trigger('click');
            });
        },

        // 初始化页面
        initSoftPhone: function(){
            // 点击拨号功能
            util.clickCallListening(Config.clickCallClass);

            // 异常刷新强制退出
            window.onunload = function(){
                util.closeWebSocket();

                var req = {
                    func: 'Logout',
                    device: env.deviceId,
                    namespace: env.user.domain
                };

                util.setAgentStateSync(req);
            };
        }
    };


// ll

    // 事件处理
    var eventHandler = {
        deliverEvent: function(eventInfo) {
            if(eventInfo.eventName !== 'ChannelStateChangedEvent'){
                util.log(eventInfo);
            }

            var tempHandler = innerEventLogic[eventInfo.eventName];

            if($.isFunction(tempHandler)){
                tempHandler(eventInfo);
            }
            // eventHandler[eventInfo.eventName](eventInfo);

            //{将事件信息暴露给第三方，第三方可以自定义一些事件处理方法
            if($.isFunction(wellClient.exports)){
                wellClient.exports(eventInfo);
            }
            //将事件信息暴露给第三方，第三方可以自定义一些事件处理方法}
        }
    }; 
//******************************************************************************
//
//                                   wdd-event
//
//******************************************************************************
    // 内部逻辑
    var innerEventLogic = {
        // 登录
        // 
        /**
         * [agentLoggedOn description]
         * @Author   Wdd
         * @DateTime 2016-12-13T11:25:40+0800
         * @param    {[type]} data [description]
         * @return   {[type]} [description]
         */
        agentLoggedOn:function(data){
            Config.isLogined = true;

            var uiInfo = {
                eventName:'agentLoggedOn',
                body:{
                    jobNumber:env.loginId,
                    device:env.deviceId
                }
            };
            wellClient.ui.main(uiInfo);

            // 第一次心跳
            app.pt.heartbeat();

            // 两分钟心跳一次
            Config.heartbeatId = setInterval(function(){
                app.pt.heartbeat();
            }, Config.heartbeatLength);
        },

        // 登出
        agentLoggedOff:function(data){
            if(!Config.isLogined){
                return;
            }

            var uiInfo = {
                eventName:'agentLoggedOff'
            };

            window.onunload = null;

            util.closeWebSocket();
            // 清除心跳
            clearInterval(Config.heartbeatId);

            util.clearCache();

            wellClient.ui.main(uiInfo);
        },

        // 就绪
        agentReady:function(data){

        },

        // 初始化
        serviceInitiated:function(data){
            if(callMemory[data.callId]){
                return;
            }

            callMemory[data.callId] = {
                deviceCount: 0
            };
            callMemory.length++;
            callMemory[data.callId][env.deviceId] = {
                device : env.deviceId,
                connectionState : 'initiated',
                callId : data.callId,
                isCalling : true,
                callingDevice : data.callingDevice,
                calledDevice : data.calledDevice
            };
            callMemory[data.callId].deviceCount++;
        },

        // 呼出
        originated:function(data){
            if(callMemory[data.callId][data.calledDevice]){
                return;
            }

            var call = callMemory[data.callId][data.callingDevice];
            call.connectionState = 'originated';
            call.callingDevice = data.callingDevice;
            call.calledDevice = data.calledDevice;

            callMemory[data.callId][data.calledDevice] = {
                device : data.calledDevice,
                connectionState : 'unknown',
                callId : data.callId,
                isCalling : false,
                callingDevice : data.callingDevice,
                calledDevice : data.calledDevice
            };
            callMemory[data.callId].deviceCount++;

            var uiInfo = {
                eventName:'originated',
                deviceId:data.calledDevice,
                device:data.calledDevice.split('@')[0],
                callId:data.callId
            };

            // 呼出ui
            wellClient.ui.main(uiInfo);
        },

        // 振铃
        delivered:function(data){
            //condition1:主叫
            if(callMemory[data.callId]){

                if(callMemory[data.callId][data.calledDevice]){
                    callMemory[data.callId][data.calledDevice]
                    .connectionState = 'alerting';

                    var uiInfo = {
                        eventName:'delivered',
                        deviceId:data.calledDevice,
                        device:data.calledDevice.split('@')[0],
                        callId:data.callId
                    };
                    wellClient.ui.main(uiInfo);
                }
                else{
                    // 可能是单步会议的发起方
                    callMemory[data.callId][data.calledDevice] = {
                        device : data.calledDevice,
                        connectionState : 'delivered',
                        callId : data.callId,
                        isCalling : true,
                        callingDevice : data.callingDevice,
                        calledDevice : data.calledDevice
                    };
                    callMemory[data.callId].deviceCount++;
                }

            }
            //condition2:被叫
            else{
                //
                callMemory[data.callId] = {
                    deviceCount: 0
                };
                callMemory.length++;
                // 自己是被叫
                callMemory[data.callId][env.deviceId] = {
                    device : env.deviceId,
                    connectionState : 'alerting',
                    callId : data.callId,
                    isCalling : false,
                    callingDevice : data.callingDevice,
                    calledDevice : data.calledDevice
                };
                callMemory[data.callId].deviceCount++;

                // 主叫方 别人
                callMemory[data.callId][data.callingDevice] = {
                    device : data.callingDevice,
                    connectionState : 'originated',
                    callId : data.callId,
                    isCalling : true,
                    callingDevice : data.callingDevice,
                    calledDevice : data.calledDevice
                };
                callMemory[data.callId].deviceCount++;

                var uiInfo = {
                    eventName:'delivered',
                    deviceId:data.callingDevice,
                    device:data.callingDevice.split('@')[0],
                    callId:data.callId
                };

                wellClient.ui.main(uiInfo);
            }
        },

        // 
        ChannelStateChangedEvent:function(data){},

        // 通话建立
        established:function(data){
            if(!callMemory[data.callId]){
                return;
            }

            // 改变主叫和被叫的状态
            callMemory[data.callId][data.callingDevice]
            .connectionState = 
            callMemory[data.callId][data.calledDevice]
            .connectionState = 'connected';

            var deviceId = data.agentStatus === 'OnCallOut'?
            data.calledDevice:data.callingDevice;

            var uiInfo = {
                eventName:'established',
                deviceId:deviceId,
                device:deviceId.split('@')[0],
                callId:data.callId
            };

            // 呼出ui
            wellClient.ui.main(uiInfo);
        },

        // 挂断
        connectionCleared:function(data){
            if(!callMemory[data.callId]){
                return;
            }


            if(data.releasingDevice === env.deviceId){

                var call = callMemory[data.callId][env.deviceId];
                var deviceId = call.isCalling?call.calledDevice:call.callingDevice;
                var uiInfo = {
                    eventName:'connectionCleared',
                    device:deviceId.split('@')[0],
                    needClearAll: callMemory[data.callId].isConferenced
                };

                // if(call.isConferenced){
                //     uiInfo.needClearAll = true;
                // }

                // 清空一个callId
                delete callMemory[data.callId];
                callMemory.length--;


                wellClient.ui.main(uiInfo);
            }
            else{
                // 清空一个callId下面的deviceId
                if(callMemory[data.callId][data.releasingDevice]){
                    delete callMemory[data.callId][data.releasingDevice];
                    callMemory[data.callId].deviceCount--;

                    var uiInfo = {
                        eventName: 'connectionCleared',
                        device: data.releasingDevice.split('@')[0]
                    };

                    wellClient.ui.main(uiInfo);
                }

            }
        },

        // 保持
        held:function(data){
            if(!callMemory[data.callId]){
                return;
            }

            var call = callMemory[data.callId][env.deviceId];
            var deviceId = call.isCalling?call.calledDevice:call.callingDevice;

            call.connectionState = 'held';

            var uiInfo = {
                eventName:'held',
                device:deviceId.split('@')[0]
            };

            wellClient.ui.main(uiInfo);
        },//

        // 取回
        retrieved:function(data){
            if(!callMemory[data.callId]){
                return;
            }

            var call = callMemory[data.callId][env.deviceId];
            var deviceId = call.isCalling?call.calledDevice:call.callingDevice;

            call.connectionState = 'connected';

            var uiInfo = {
                eventName:'retrieved',
                device:deviceId.split('@')[0]
            };

            wellClient.ui.main(uiInfo);
        },

        // 会议
        conferenced:function(data){
            // 被保持方
            if(!callMemory[data.callId] && callMemory[data.primaryOldCall]){
                var call = callMemory[data.primaryOldCall];
                var callingDevice = call[env.deviceId].callingDevice;
                var calledDevice = call[env.deviceId].calledDevice;

                callMemory[data.callId] = {
                    deviceCount: 2
                };
                
                var newCall = callMemory[data.callId];
                newCall.isConferenced = true;
                newCall[callingDevice] = {
                    callId: data.callId,
                    calledDevice: calledDevice,
                    callingDevice: callingDevice,
                    connectionState: 'connected',
                    device: callingDevice,
                    isCalling: true
                };
                newCall[calledDevice] = {
                    callId: data.callId,
                    calledDevice: calledDevice,
                    callingDevice: callingDevice,
                    connectionState: 'connected',
                    device: calledDevice,
                    isCalling: false
                };

                delete callMemory[data.primaryOldCall];
            }

            // 发起咨询方
            if(callMemory[data.callId] && callMemory[data.primaryOldCall]){
                var oldCall = callMemory[data.primaryOldCall];
                var newCall = callMemory[data.callId];

                var addCall = oldCall[env.deviceId].isCalling ? oldCall[env.deviceId].calledDevice:
                              oldCall[env.deviceId].callingDevice;

                newCall[addCall] = {
                    callId: data.callId,
                    calledDevice: oldCall.calledDevice,
                    callingDevice: oldCall.callingDevice,
                    connectionState: 'connected',
                    device: addCall,
                    isCalling: oldCall.isCalling
                };

                delete callMemory[data.primaryOldCall];
                callMemory.length--;
                newCall.deviceCount++;
            }


            // 该callId已经进入会议之中
            callMemory[data.callId].isConferenced = true;

            // 单步会议
            if(callMemory.length === 1){

            }

            var uiInfo = {
                eventName: 'conferenced',
                callId: data.callId
            };

            wellClient.ui.main(uiInfo);
        }
    }; 
//******************************************************************************
//
//                                   外部公开接口
//
//******************************************************************************
    // 外部事件处理
    app.pt.on = function(name, fn) {
        eventHandler[name] = fn;
    }; 

    // 获取呼叫内存
    app.pt.getCallMemory = function(){
        return callMemory;
    }; 

    // 触发事件
    app.pt.trigger = function(fn, data) {
        //只有在debug模式下才开启
        util[fn](data);
    }; 

    // 日志
    app.pt.log = function(msg) {
        util.log(msg);
    }; 

    // 报错
    app.pt.error = function(msg) {
        util.error(msg);
    }; 

    // 设置softphone的debug
    app.pt.setDebug = function(switcher) {
        Config.debug = switcher || true;
    }; 

    // 配置
    app.pt.setConfig = function(conf){

        Config.debug = conf.debug === false? false : Config.debug;
        // Config.SDK = conf.SDK || Config.SDK;
        // Config.cstaPort = conf.cstaPort || Config.cstaPort;
        // Config.eventPort = conf.eventPort || Config.eventPort;
        // Config.eventBasePath = conf.eventBasePath || Config.eventBasePath;
        // Config.cstaBasePath = conf.cstaBasePath || Config.cstaBasePath;
        Config.useWsLog = conf.useWsLog === false? false: Config.useWsLog;
        Config.clickCallClass = conf.clickCallClass || Config.clickCallClass;

        Config.hideButton = conf.hideButton || [];
        
        if(Config.hideButton.length > 0){
            var btns = Config.hideButton.map(function(btn){
                return '#well-'+btn;
            });

            btns = btns.join();
            $(btns).addClass('well-dn');
        }
    };

    // login
    app.pt.login = function(number, password, domain, ext, loginMode) {
        var $dfd = $.Deferred();

        env.user.number = number || user.number;
        env.user.password = password || user.password;
        env.user.domain = domain || user.domain;
        env.user.ext = ext || user.ext;

        env.loginId = env.user.number + '@' + env.user.domain;
        env.deviceId = env.user.ext + '@' + env.user.domain;

        util.TPILogin(env.user.number, env.user.password, env.user.domain)
        .done(function(res){
            env.sessionId = res.sessionId;
            util.initWebSocket();
            util.login(loginMode)
            .done(function(res){
                $dfd.resolve(res);
            })
            .fail(function(res){
                $dfd.reject(res);
            });
        })
        .fail(function(err){
            util.error('登录失败，请检查用户名、密码、域名是否正确');
            $dfd.reject(err);
        });

        return $dfd.promise();
    };

    // logout
    app.pt.logout = function(isCloseWebSocket) {

        window.onunload = null;

        clearInterval(Config.heartbeatId);

        isCloseWebSocket = isCloseWebSocket === false? false : true;

        var dfd = $.Deferred();

        var req = {
            func: 'Logout',
            device: env.deviceId,
            namespace: env.user.domain
        };

        util.setAgentState(req)
            .done(function(res) {
                dfd.resolve(res);

                if(isCloseWebSocket){
                    util.closeWebSocket();
                }

            })
            .fail(function(res) {
                dfd.reject(res);
            });

        return dfd.promise();
    }; 

    // 设置坐席状态，就绪，未就绪
    app.pt.setAgentMode = function(mode) {
        var dfd = $.Deferred();

        if (mode === 'Ready' || mode === 'NotReady') {
            var req = {
                func: 'SetState',
                device: env.deviceId,
                agentMode: mode,
                namespace: env.user.domain
            };

            util.setAgentState(req)
                .done(function(res) {
                    dfd.resolve(res);
                })
                .fail(function(res) {
                    dfd.reject(res);
                });
        } else {
            util.error('参数必须是Ready或者NotReady');
        }

        return dfd.promise();
    }; 

    // 给第三方输入日志
    app.pt.outputLog = function(msg){
        if($.isFunction(wellClient.onLog)){
            wellClient.onLog(msg);
        }
    };
//******************************************************************************
//
//                                   wdd-csta
//
//******************************************************************************
    /**
     * [forceDrop 强拆: 强制通话中的设备挂断电话]
     * @Author   Wdd
     * @DateTime 2017-03-02T12:00:02+0800
     * @param    {[string]} deviceId [设备id，例如8001@test.com]
     * @param    {[stting]} callId [呼叫id]
     * @return   {[promise]} [description]
     */
    app.pt.forceDrop = function(deviceId, callId){
        if(typeof deviceId !== 'string'){return;}
        if(typeof callId !== 'string'){return;}

        var pathParm = {
            callId: callId,
            connectionId: deviceId+'|'+callId
        };

        return apis.dropConnection.fire(pathParm);
    };

    /**
     * [forceJoin 强插]
     * @Author   Wdd
     * @DateTime 2017-03-01T15:14:53+0800
     * @return   {[type]} [description]
     */
    app.pt.forceJoin = function(deviceId, callId, phoneNumber){
        if(typeof deviceId !== 'string'){return;}
        if(typeof callId !== 'string'){return;}
        if(typeof phoneNumber !== 'string'){return;}

        var pathParm = {
            callId: callId,
            connectionId: deviceId+'|'+callId
        };

        var payload = {
            conferenceParticipant: phoneNumber,
            participationType: "Active"
        };

        return apis.singleStepConference.fire(pathParm, payload);
    };

    /**
     * [forceTake 接管]
     * @Author   Wdd
     * @DateTime 2017-03-01T15:15:36+0800
     * @return   {[type]} [description]
     */
    app.pt.forceTake = function(deviceId, callId, phoneNumber){
        if(typeof deviceId !== 'string'){return;}
        if(typeof callId !== 'string'){return;}
        if(typeof phoneNumber !== 'string'){return;}

        var pathParm = {
            callId: callId,
            connectionId: deviceId+'|'+callId
        };

        var payload = {
            transferTo: phoneNumber
        };

        return apis.singleStepTransfer.fire(pathParm, payload);
    };

    /**
     * [forceListen 监听设备]
     * @Author   Wdd
     * @DateTime 2017-03-01T15:15:57+0800
     * @return   {[type]} [description]
     */
    app.pt.forceListen = function(callId, deviceId){
        if(typeof deviceId !== 'string'){return;}
        if(typeof callId !== 'string'){return;}

        var pathParm = {
            callId: callId,
            deviceId: deviceId
        };

        return apis.spy.fire(pathParm);
    };


    app.pt.forceReady = function(agentId, deviceId){
        if(typeof deviceId !== 'string'){return;}
        if(typeof agentId !== 'string'){return;}

        var pathParm = {};
        var payload = {
            func: 'SetState',
            agentMode: 'Ready',
            loginId: agentId,
            agentId: agentId,
            device: deviceId
        };

        return apis.setAgentState.fire(pathParm, payload);
    };

    app.pt.forceNotReady = function(agentId, deviceId){
        if(typeof deviceId !== 'string'){return;}
        if(typeof agentId !== 'string'){return;}

        var pathParm = {};
        var payload = {
        func: 'SetState',
           agentMode: 'NotReady',
           loginId: agentId,
           agentId: agentId,
           device: deviceId
        };

        return apis.setAgentState.fire(pathParm, payload);
    };

    app.pt.forceLogout = function(agentId, deviceId){
        if(typeof deviceId !== 'string'){return;}
        if(typeof agentId !== 'string'){return;}

        var pathParm = {};
        var payload = {
            namespace: agentId.split('@')[1],
            func: 'Logout',
            device: deviceId,
            agentId: agentId,
            loginId: agentId
        };

        return apis.setAgentState.fire(pathParm, payload);
    };
    

    /**
     * [setCallData 设置随路数据]
     * @Author   Wdd
     * @DateTime 2017-01-16T13:25:34+0800
     * @param    {[string]} callId [callId]
     * @param    {[array]} data [对象数组 [{key:'name', value:'wdd'},{key:'', value:''}]]
     */
    app.pt.setCallData = function(callId, data){
        var dfd = $.Deferred();

        if(!callId || !data){
            util.error('参数不合法');
            dfd.reject('参数不合法');
        }

        var req = {
            callId:callId
        },
        path = app.pt.render(apis.setCallData.path, req),
        method = apis.setCallData.method,
        payload = {
            entries:data
        };

        util.sendRequest(path,method,payload)
        .done(function(res){
            dfd.resolve(res);
        })
        .fail(function(res){
            dfd.reject(res);
        });

        return dfd.promise();
    };

    /**
     * [heartbeat 坐席心跳]
     * @Author   Wdd
     * @DateTime 2017-03-10T19:19:21+0800
     * @return   {[type]} [description]
     */
    app.pt.heartbeat = function(){
        var dfd = $.Deferred();

        var req = {
            agentId:env.loginId
        };

        var path = app.pt.render(apis.heartbeat.path, req);
        var method = apis.heartbeat.method;

        util.sendRequest(path, method)
        .done(function(res){
            dfd.resolve(res);
        })
        .fail(function(res){
            dfd.reject(res);
        });

        return dfd.promise();
    };
    /**
     * [transferCall 咨询后转移]
     * @Author   Wdd
     * @DateTime 2017-01-12T09:30:51+0800
     * @param    {[type]} holdCallId [保持的callId]
     * @param    {[type]} consultCallId [咨询的callId]
     * @return   {[type]} [description]
     */
    app.pt.transferCall = function(holdCallId, consultCallId){
        var dfd = $.Deferred();

        if(!holdCallId || !consultCallId){
            util.error('参数不合法');
            dfd.reject('参数不合法');
        }

        var req = {
            callId:holdCallId,
            connectionId:env.deviceId+'|'+holdCallId
        },
        path = app.pt.render(apis.transferCall.path, req),
        method = apis.transferCall.method,
        payload = {
            consultCallId:consultCallId
        };

        util.sendRequest(path,method,payload)
        .done(function(res){
            dfd.resolve(res);
        })
        .fail(function(res){
            dfd.reject(res);
        });

        return dfd.promise();
    };
    /**
     * [cancelConsult 取消咨询]
     * @Author   Wdd
     * @DateTime 2017-01-12T09:19:07+0800
     * @param    {[type]} holdCallId [保持电话的callId]
     * @param    {[type]} consultCallId [咨询电话的callId]
     */
    app.pt.cancelConsult = function(holdCallId, consultCallId){
        var dfd = $.Deferred();

        if(!holdCallId || !consultCallId){
            util.error('参数不合法');
            dfd.reject('参数不合法');
        }

        var req = {
            callId:holdCallId,
            connectionId:env.deviceId+'|'+holdCallId
        },
        path = app.pt.render(apis.cancelConsult.path,req),
        method = apis.cancelConsult.method,
        payload = {
            consultCallId:consultCallId
        };

        util.sendRequest(path,method,payload)
        .done(function(res){
            dfd.resolve(res);
        })
        .fail(function(res){
            dfd.reject(res);
        });

        return dfd.promise();
    };
    /**
     * [conference 会议]
     * @Author   Wdd
     * @DateTime 2017-01-12T09:21:19+0800
     * @param    {[type]} callId [description]
     * @param    {[type]} consultCallId [description]
     * @return   {[type]} [description]
     */
    app.pt.conference = function(holdCallId, consultCallId){
        var dfd = $.Deferred();

        if(!holdCallId || !consultCallId){
            util.error('参数不合法');
            dfd.reject('参数不合法');
        }

        var req = {
            callId:holdCallId,
            connectionId:env.deviceId+'|'+holdCallId
        },
        path = app.pt.render(apis.conference.path,req),
        method = apis.conference.method,
        payload = {
            consultCallId:consultCallId
        };

        util.sendRequest(path, method, payload)
        .done(function(res){
            dfd.resolve(res);
        })
        .fail(function(res){
            dfd.reject(res);
        });

        return dfd.promise();
    };


    /**
     * [consult 咨询]
     * @Author   Wdd
     * @DateTime 2017-01-03T17:51:25+0800
     * @param    {[string]} callId [callId]
     * @param    {[string]} phoneNumber [被咨询方的电话号码]
     */
    app.pt.consult = function(callId, phoneNumber){
        var dfd = $.Deferred();

        if(!callId || !phoneNumber){
            util.error('参数不合法');
            dfd.reject('参数不合法');
        }

        var req = {
            callId:callId,
            connectionId:env.deviceId+'|'+callId
        },
        path = app.pt.render(apis.consult.path,req),
        method = apis.consult.method,
        payload = {
            consultationParticipant:phoneNumber
        };

        util.sendRequest(path,method,payload)
        .done(function(res){
            dfd.resolve(res);
        })
        .fail(function(res){
            dfd.reject(res);
        });

        return dfd.promise();
    };


    /**
     * [singleStepConference 单步会议]
     * @Author   Wdd
     * @DateTime 2017-01-03T14:04:08+0800
     * @param    {[string]} callId [callId]
     * @param    {[string]} phoneNumber [参与会议方的号码]
     * @param    {[string]} type [参与方式 Active 或者 Silent]
     * @return   {[type]} [description]
     */
    app.pt.singleStepConference = function(callId, phoneNumber, type){
        var dfd = $.Deferred();

        if(!callId || !phoneNumber){
            util.error('参数不合法');
            dfd.reject('参数不合法');
        }

        var req = {
            callId:callId,
            connectionId:env.deviceId+'|'+callId
        },
        path = app.pt.render(apis.singleStepConference.path,req),
        method = apis.singleStepConference.method,
        payload = {
            conferenceParticipant:phoneNumber,
            participationType: type || 'Active'
        };

        util.sendRequest(path,method,payload)
        .done(function(res){
            dfd.resolve(res);
        })
        .fail(function(res){
            dfd.reject(res);
        });

        return dfd.promise();
    };

    // 单步转移
    app.pt.singleStepTransfer = function(callId,phoneNumber){
        var dfd = $.Deferred();

        if(!callId || !phoneNumber){
            util.error('参数不合法');
            dfd.reject('参数不合法');
        }

        var req = {
            callId:callId,
            connectionId:env.deviceId+'|'+callId
        },
        path = app.pt.render(apis.singleStepTransfer.path,req),
        method = apis.singleStepTransfer.method,
        payload = {
            transferTo:phoneNumber
        };

        util.sendRequest(path,method,payload)
        .done(function(res){
            dfd.resolve(res);
        })
        .fail(function(res){
            dfd.reject(res);
        });

        return dfd.promise();
    };

    // 取回电话
    app.pt.retrieveCall = function(callId){
        var dfd = $.Deferred();

        if(!callId){
            util.error('参数不合法');
            dfd.reject('参数不合法');
        }

        var req = {
            callId:callId,
            connectionId:env.deviceId+'|'+callId
        },
        path = app.pt.render(apis.retrieveCall.path,req),
        method = apis.retrieveCall.method;

        util.sendRequest(path,method)
        .done(function(res){
            dfd.resolve(res);
        })
        .fail(function(res){
            dfd.reject(res);
        });

        return dfd.promise();
    };

    // 保持电话
    app.pt.holdCall = function(callId){
        var dfd = $.Deferred();

        if(!callId){
            util.error('参数不合法');
            dfd.reject('参数不合法');
        }

        var req = {
            callId:callId,
            connectionId:env.deviceId+'|'+callId
        },
        path = app.pt.render(apis.holdCall.path,req),
        method = apis.holdCall.method;

        util.sendRequest(path,method)
        .done(function(res){
            dfd.resolve(res);
        })
        .fail(function(res){
            dfd.reject(res);
        });

        return dfd.promise();
    };

    // 挂断电话
    app.pt.dropConnection = function(callId){
        var dfd = $.Deferred();

        if(!callId){
            util.error('参数不合法');
            dfd.reject('参数不合法');
        }

        var req = {
            callId:callId,
            connectionId:env.deviceId+'|'+callId
        },
        path = app.pt.render(apis.dropConnection.path,req),
        method = apis.dropConnection.method;

        util.sendRequest(path,method)
        .done(function(res){
            dfd.resolve(res);
        })
        .fail(function(res){
            dfd.reject(res);
        });

        return dfd.promise();
    };

    // 接通电话
    app.pt.answerCall = function(callId){
        var dfd = $.Deferred();

        if(!callId){
            util.error('参数不合法');
            dfd.reject('参数不合法');
        }

        var req = {
            callId:callId,
            connectionId:env.deviceId+'|'+callId
        };

        var path = app.pt.render(apis.answerCall.path,req),
            method = apis.answerCall.method;

        util.sendRequest(path,method)
        .done(function(res){
            dfd.resolve(res);
        })
        .fail(function(res){
            dfd.reject(res);
        });

        return dfd.promise();
    };

    // 拨打电话，无论外部有没有验证，接口自己都必须做验证
    app.pt.makeCall = function(phoneNumber, options) {
        var dfd = $.Deferred();
        var options = options || {};

        if (!util.isPhoneNumber(phoneNumber)) {
            util.error('输入号码不合法');
            dfd.reject('输入号码不合法');
        } else if (phoneNumber === env.user.ext) {
            util.error('请勿输入自己的号码');
            dfd.reject('请勿输入自己的号码');
        } else {

            // << 异步请求开始
            var payload = {
                    from: env.deviceId,
                    to: options.prefix || '' + phoneNumber
                },
                method = apis.makeCall.method,
                path = apis.makeCall.path;

            util.sendRequest(path, method, payload)
                .done(function(res) {
                    dfd.resolve(res);
                })
                .fail(function(res) {
                    res.errorMsg = util.getErrorMsg('makeCall', res.status);
                    dfd.reject(res);
                });
            // << 异步请求结束
        }

        return dfd.promise();
    }; 

    // 获取组件并加以缓存
    app.pt.get = function(tag){
        return $(tag);
    };

    // 获取缓存
    app.pt.getCache = function(){
        return cache;
    };

    // 渲染模板
    app.pt.render = function(tpl,data){
        var re = /{{([^}]+)?}}/g;
        var match = '';

        while(match = re.exec(tpl)){
            tpl = tpl.replace(match[0],data[match[1]]);
        }

        return tpl;
    };

    app.pt.isPhoneNumber = function(phoneNumber){
        return util.isPhoneNumber(phoneNumber);
    };

    return new app();
})(jQuery);