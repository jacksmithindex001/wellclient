/* global localStorage, alert, $, wellClient */
(function () {
  $('#well-code').val(localStorage.getItem('code'))
  $('#well-password').val(localStorage.getItem('password'))
  $('#well-namespace').val(localStorage.getItem('namespace'))
  $('#well-deviceId').val(localStorage.getItem('deviceId'))

  $('#cr-jobNumber').val(localStorage.getItem('code'))
  $('#cr-ext').val(localStorage.getItem('deviceId'))
  $('#cr-domain').val(localStorage.getItem('namespace'))

  // var env = localStorage.getItem('env')

  // if (env) {
  //   wellClient.useConfig(env)
  //   $('#config-env').val(env)
  //   $('#tip').text('自动使用上次的配置: ' + env + ' 成功')
  // }
})()

$('#test-makeCall').click(function () {
  var phone = $('#test-deviceId').val()
  var option = {
    originForDisplay: $('#test-originForDisplay').val(),
    destForDisplay: $('#test-destForDisplay').val()
  }

  if ($('#test-opa')[0].checked) {
    option.cpa = '1'
  }

  if (/^[0-9-wW]{3,20}$/.test(phone)) {
    wellClient.makeCall(phone, option)
  } else {
    alert('手机号格式不对')
  }
})

$('#config').click(function () {
  var env = $('#config-env').val()
  localStorage.setItem('env', env)
  wellClient.useConfig(env)
  $('#tip').text('配置成功')

  setTimeout(function () {
    $('#tip').text('')
  }, 2000)
})

$('#checkRecoverStateAbility').click(function () {
  wellClient.checkRecoverStateAbility({
    jobNumber: $('#cr-jobNumber').val(),
    domain: $('#cr-domain').val(),
    ext: $('#cr-ext').val()
  })
})

$('#btn-test-single-step-conference').click(function () {
  var callList = wellClient.ui.getCallModel()
  var phoneNumber = $('#test-single-step-conference').val()
  var type = $('#test-single-step-conference-type').val()

  if (callList.length !== 1) {
    alert('没在通话中，无法进行单步会议')
    return ''
  }

  if (!phoneNumber) {
    alert('请先输入会议号码')
    return ''
  }

  wellClient.singleStepConference(callList[0].callId, phoneNumber, type)
})

wellClient.innerOn('connectionCleared', function (res) {
  console.log(res)
})

wellClient.innerOn('loginFailed', function (res) {
  console.log(res)
})

wellClient.innerOn('wsDisconnected', function (res) {
  console.log(res)
})

wellClient.exports = function (event) {
  $('#current-event').val(JSON.stringify(event))
  writeLogToHtml(event)
}

function writeLogToHtml (msg) {
  msg = JSON.stringify(msg).replace(/\\/g, '')
  msg = new Date().toLocaleString() + '   ' + msg
  msg = '<p>' + msg + '</p>'
  $('#log').prepend(msg)
}

function GetCallData () {
  var callId = $('#user-data').val()
  if (!callId) {
    return
  }

  wellClient.getCallData(callId)
    .done(function (res) {
      if (typeof res === 'object') {
        alert(JSON.stringify(res))
      }
      if (typeof res === 'string') {
        alert(res)
      }
    })
    .fail(function (res) {
      console.log('获取路数据失败')
    })
}

function clearPageLog () {
  $('#log').empty()
}

wellClient.setConfig({useWsLog: true, debug: true})
wellClient.useConfig('AWS-HTTPS')

wellClient.innerOn('wsReconnectSucceed', function (event) {
  console.log('wsReconnectSucceed')
  console.log(wellClient.getCallMemory())
  console.log(event)
  writeLogToHtml(event)
})

// wellClient.onLog = function (msg) {
//   writeLogToHtml(msg)
// }

// wellClient.useConfig('POC')

$('#well-client-version').text(wellClient.getVersion())

new Vue({
  el: '#vue',
  data: {
    userData: ''
  },
  methods: {
    showData: function (data) {
      this.userData = JSON.stringify(data, null, '\t')
    },
    cleanData: function () {
      this.userData = ''
    }
  },
  created: function () {
    var that = this

    wellClient.on('delivered', function (event) {
      that.showData(event.userData.data)
    })
  }
})
