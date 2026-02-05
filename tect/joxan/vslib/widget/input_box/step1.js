/*
    Starting point
*/
console.log('Step 1')

const nameInput = document.createElement('input')
nameInput.placeholder = 'Profile Name'
document.body.append(nameInput)
nameInput.addEventListener('input', () => {
    console.log(nameInput.value)
})
