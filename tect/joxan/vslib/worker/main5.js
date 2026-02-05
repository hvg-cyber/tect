/*

src\vs\platform\webWorker\browser\webWorkerServiceImpl.ts

*/

const worker = new Worker('worker/worker5.js')
worker.onmessage = (e) => {
    console.log(`Worker: ${e.data}`)
}
worker.onerror = (e) => {
    console.log(`Worker error: ${e.message}`)
}
console.log('Worker started!')

const sendBtn = document.createElement('button')
sendBtn.textContent = 'Send'
document.body.append(sendBtn)
sendBtn.addEventListener('click', () => {
    worker.postMessage(new Date())
})
