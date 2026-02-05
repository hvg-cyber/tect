/*
    Turn a new window into a popup window
*/
console.log('Step 2')

const auxiliaryWindow = window.open(
    undefined,
    undefined, 
    'popup=yes'
)
document.body.textContent = 'Main window'
auxiliaryWindow.document.body.textContent = 'Aux window'
