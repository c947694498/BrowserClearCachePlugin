chrome.browserAction.onClicked.addListener(function () {
  chrome.tabs.create({
    url: 'chrome://net-internals/#dns', active: false
  })
})
