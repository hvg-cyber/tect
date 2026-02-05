/*
    Starting point
*/

let currentLevel = 0

const container = document.createElement('div')
container.classList.add('container')
document.body.append(container)

const zoomInButton = document.createElement('div')
zoomInButton.textContent = '\ueb3b'
zoomInButton.classList.add('button', 'codicon')
container.append(zoomInButton)
zoomInButton.onclick = () => {
    currentLevel--
    levelElem.textContent = currentLevel
}

const levelElem = document.createElement('div')
levelElem.textContent = currentLevel
container.append(levelElem)

const zoomOutButton = document.createElement('div')
zoomOutButton.textContent = '\uea60'
zoomOutButton.classList.add('button', 'codicon')
container.append(zoomOutButton)
zoomOutButton.onclick = () => {
    currentLevel++
    levelElem.textContent = currentLevel
}

const resetButton = document.createElement('div')
resetButton.textContent = 'Reset'
resetButton.classList.add('button')
container.append(resetButton)
resetButton.onclick = () => {
    currentLevel = 0
    levelElem.textContent = currentLevel
}

const settingsButton = document.createElement('div')
settingsButton.textContent = '\ueb51'
settingsButton.classList.add('button', 'codicon')
container.append(settingsButton)
settingsButton.onclick = () => {
    console.log('Not implemented')
}

