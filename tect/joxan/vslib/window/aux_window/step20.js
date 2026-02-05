/*
    Starting point
*/
console.log('Step 20')

const features = [
    'popup=yes',
    `left=100`,
    `top=300`,
    `width=300`,
    `height=100`,
]
const auxiliaryWindow = window.open(
    'about:blank',
    undefined, 
    features.join(',')
)

document.body.textContent = 'Main window'
auxiliaryWindow.document.body.textContent = 'Aux window'
