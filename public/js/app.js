
const formObj = document.querySelector('form')
const input = document.querySelector('input')
const m1 = document.querySelector('#message-1')
const m2 = document.querySelector('#message-2')

formObj.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = input.value
    m1.textContent = m2.textContent = '';

    m1.textContent = "Loading....."

    fetch('http://localhost:3000/weather?address='+location).then((res) => {
        res.json().then((data) => {
            if (data.error) {
                m1.textContent = data.error
            }
            else {
                m1.textContent = data.address 
                m2.textContent = data.forecast 
            }
        })
    })
})