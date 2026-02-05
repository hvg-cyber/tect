
self.onmessage = function (e) {
    console.log('Main  :', e.data)
    this.setTimeout(() => {
        self.postMessage(new Date())
    }, 1000)
}
