import CONF from '@/const/base'

export default [
  {
    name: 'setAgentState',
    desc: 'setAgentState login and logout',
    path: '/api/csta/agent/state',
    method: 'post',
    serverAddressess: CONF.host.sdk,
    status: {
      204: 'login success',
      401: 'username or password error',
      426: 'get AccessToken failed',
      451: 'device unregistered',
      453: 'illegal deviceId',
      454: 'agent already logined other place',
      455: 'agent already logined others device',
      456: 'illegal device state',
      457: 'unauthorized device',
      459: 'the device you want to use is useing by other agent',
      460: 'can not set agent state when you are calling',
      461: 'online agent amount over max limit'
    }
  },
  {
    name: 'heartbeat',
    desc: 'agnent heart beat',
    path: '/api/csta/agent/heartbeat/{{agentId}}',
    method: 'post',
    serverAddress: CONF.host.sdk
  },
  {
    name: 'makeCall',
    desc: 'call out',
    path: '/api/csta/callControl/calls',
    method: 'post',
    serverAddress: CONF.host.sdk
  },
  {
    name: 'answerCall',
    desp: 'answer call',
    path: '/api/csta/callControl/calls/{{callId}}/connections/{{connectionId}}/answer',
    method: 'post',
    serverAddress: CONF.host.sdk
  },
  {
    name: 'dropConnection',
    desp: 'hang up the call',
    path: '/api/csta/callControl/calls/{{callId}}/connections/{{connectionId}}',
    method: 'delete',
    serverAddress: CONF.host.sdk
  },
  {
    name: 'holdCall',
    desp: 'hold call',
    path: '/api/csta/callControl/calls/{{callId}}/connections/{{connectionId}}/hold',
    method: 'post',
    serverAddress: CONF.host.sdk
  },
  {
    name: 'retrieveCall',
    desp: 'retrieve a call',
    path: '/api/csta/callControl/calls/{{callId}}/connections/{{connectionId}}/retrieve',
    method: 'post',
    serverAddress: CONF.host.sdk
  },
  {
    name: 'singleStepTransfer',
    desp: 'single step transfer',
    path: '/api/csta/callControl/calls/{{callId}}/connections/{{connectionId}}/singleStepTransfer',
    method: 'post',
    serverAddress: CONF.host.sdk
  },
  {
    name: 'singleStepConference',
    desp: 'single step conference',
    path: '/api/csta/callControl/calls/{{callId}}/connections/{{connectionId}}/singleStepConference',
    method: 'post',
    serverAddress: CONF.host.sdk
  },
  {
    name: 'consult',
    desp: 'ask someome, hold current line',
    path: '/api/csta/callControl/calls/{{callId}}/connections/{{connectionId}}/consult',
    method: 'post',
    serverAddress: CONF.host.sdk
  },
  {
    name: 'conference',
    desp: 'talk to everybody',
    path: '/api/csta/callControl/calls/{{callId}}/connections/{{connectionId}}/conference',
    method: 'post',
    serverAddress: CONF.host.sdk
  },
  {
    name: 'cancelConsult',
    desp: 'cancel ask some',
    path: '/api/csta/callControl/calls/{{callId}}/connections/{{connectionId}}/cancelConsult',
    method: 'post',
    serverAddress: CONF.host.sdk
  },
  {
    name: 'transferCall',
    desp: 'ask someone, then transfer',
    path: '/api/csta/callControl/calls/{{callId}}/connections/{{connectionId}}/transfer',
    method: 'post',
    serverAddress: CONF.host.sdk
  },
  {
    name: 'setCallData',
    desp: 'set some data with callId',
    path: '/api/csta/callControl/calls/{{callId}}/user-data',
    method: 'post',
    serverAddress: CONF.host.sdk
  },
  {
    name: 'getCallData',
    desp: 'get all data of callId',
    path: '/api/csta/callControl/calls/{{callId}}/user-data/{{key}}',
    method: 'get',
    serverAddress: CONF.host.sdk
  },
  {
    name: 'spy',
    desp: 'listen the agent talk',
    path: '/api/csta/callControl/calls/{{callId}}/spy?deviceId={{deviceId}}',
    method: 'post',
    serverAddress: CONF.host.sdk
  },
  {
    name: 'releaseAllocatedAgent',
    desp: 'release allocated agent',
    path: '/api/csta/outbound/release/{{agentId}}',
    method: 'post',
    serverAddress: CONF.host.sdk
  },
  {
    name: 'getMyPrefix',
    desp: 'release allocated agent',
    path: '/api/operation/operation/tenants/{{domain}}/agents/{{agentId}}',
    method: 'get',
    serverAddress: CONF.host.sdk
  },
  {
    name: 'login',
    desp: 'sercurity login',
    path: '',
    method: 'post',
    serverAddress: CONF.host.login,
    contentType: CONF.formData
  }
]
