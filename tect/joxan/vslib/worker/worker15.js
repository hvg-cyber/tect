
self.onmessage = function (e) {
    this.setTimeout(() => {
        self.postMessage(Number(e.data) + 1)
    }, 1000)
}
