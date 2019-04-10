# 1. 收到事件的顺序



## 1.1. 情景1：座席登陆
1. 收到 `agentLoggedOn`
2. 收到 `agentReady` 或者 `agentNotReady`

## 1.2. 情景2：座席呼出后外线接通然后挂断
1. 收到`serviceInitiated`
2. 收到`originated`
3. 收到`delivered`
4. 收到`established`(如果是通话建立的情况)
5. 收到`connectionCleared`

## 1.3. 情景3：座席呼入后接听然后挂断
1. 收到`delivered`
2. 收到`established`(如果是通话建立的情况)
3. 收到`connectionCleared`
