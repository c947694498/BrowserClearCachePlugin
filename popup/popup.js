(function() {
  window.addEventListener('load', function() {
    document.querySelector('#one_key_clear').addEventListener('click', function() {

      window.open('chrome://net-internals/#dns')
      // // re-apply settings
      // chrome.send('reloadProxySettings')
      // // clear bad proxies
      // chrome.send('clearBadProxies')
      // // clear host cache
      // chrome.send('clearHostResolverCache')
      // // Close idle sockets
      // chrome.send('closeIdleSockets')
      // // Flush socket pools
      // chrome.send('flushSocketPools')
    })
  })
})()
