/*
    The code in the following directories requires a server:
    module
    request
    service_worker
*/

const http = require('http')
const fs = require('fs')

let workingFolder, step
function savePath(route) {
    const components = route.split('/').slice(1)
    const fileName = components.pop()
    step = fileName.slice(4, -3)
    workingFolder = components.join('/')
    console.log(`"${workingFolder}"`, `"${step}"`)
}

const server = http.createServer((req, res) => {
    console.log(req.url)
    if (req.url === '/') {
        fs.readFile('index.html', (err, data) => {
            if (err) throw err
            res.writeHead(200, {
                'Content-Type': 'text/html'
            })
            res.end(data)
        })
    } else if (req.url === '/sw.js') {
        const path = `${workingFolder}/sw${step}.js`
        fs.readFile(path, (err, data) => {
            if (err) throw err
            res.writeHead(200, {
                'Content-Type': 'application/javascript',
            })
            res.end(data)
        })
    } else if (req.url.endsWith('.js')) {
        savePath(req.url)
        fs.readFile(req.url.slice(1), (err, data) => {
            if (err) throw err
            res.writeHead(200, {
                'Content-Type': 'application/javascript'
            })
            res.end(data)
        })
    } else if (req.url === '/text_data') {
        const path = `${workingFolder}/data.txt`
        fs.readFile(path, (err, data) => {
            if (err) throw err
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            })
            res.end(data)
        })
    } else if (req.url === '/json_data') {
        const path = `${workingFolder}/data.json`
        fs.readFile(path, (err, data) => {
            if (err) throw err
            res.writeHead(200, {
                'Content-Type': 'application/json'
            })
            res.end(data)
        })
    } else {
        res.end()
    }
})

server.listen(8000)
