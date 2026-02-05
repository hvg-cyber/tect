/*
    Starting point - create a new window
*/
console.log('Step 1')

const auxiliaryWindow = window.open()
document.body.textContent = 'Main window'
auxiliaryWindow.document.body.textContent = 'Aux window'
