/**
 * 打开chrome://url 实验性功能
 */
function openChromeUrlFlags() {
  chrome.tabs.create({url: 'chrome://flags/#extensions-on-chrome-urls'}, function () {
    alert('请先开启实验室功能 \n\n 1. 请将 Extensions on chrome:// URLs的下拉列表选项设置为"Enabled" \n 2.在页面下方点击"Relaunch"重启浏览器 \n 3.重启浏览器后关闭此页面')
  })
}

/**
 * 延迟(promise)
 * @param ms 毫秒
 */
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

chrome.browserAction.onClicked.addListener(function (ctab) {
  var cid = ctab.id
  var tid = null
  var code = `
    var script = document.createElement('script')
    script.textContent = \`
      chrome.send('clearHostResolverCache')
      chrome.send('flushSocketPools')
    \`
    document.body.appendChild(script)
  `
  var callback = async function() {
    var lastError = chrome.runtime.lastError
    // 如果未开启chrome://url实验性功能，自动跳去开启页面，并关闭当前chrome://net-internals#dns页面
    if(lastError && lastError.message === 'Cannot access a chrome:// URL') {
      chrome.tabs.remove(tid)
      openChromeUrlFlags()
    }else {
      chrome.tabs.remove(tid)
      delay(100)
      chrome.tabs.executeScript(cid, { code: 'location.reload()' }, function () {
        alert('清除成功')
      })
    }
  }

  chrome.tabs.create(
    { url: 'chrome://net-internals/#dns', active: false },
    async (tab) => {
      await delay(100)
      tid = tab.id
      chrome.tabs.executeScript(tab.id, { code }, callback)
    }
  )
})
