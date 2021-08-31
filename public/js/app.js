



// fetch('http://localhost:3000/weather?address=!').then((response) => {
//     response.json().then((data)=>{
// if (data.errormsg){
//  console.log(data.errormsg)
// }
// else{
// console.log('Location',data.location)
// console.log('Forecast',data.forecast)

// }
//     })

// })

const  weatherform= document.querySelector('form')
const  search=document.querySelector('input')
const  messageOne=document.querySelector('#message-1')
const  messageTwo=document.querySelector('#message-2')


weatherform.addEventListener('submit', (e)=>{
    e.preventDefault()

    const location=search.value
    
    if(!location){
        messageTwo.textContent=''
      return    messageOne.textContent='You must enter some value!'

    }
    messageOne.textContent='Loading...'
    messageTwo.textContent=''
    fetch('/weather?address='+location).then((response) => {
        response.json().then((data)=>{
    if (data.errormsg){
        messageOne.textContent=data.errormsg
    
    }
    else{
        messageOne.textContent=data.location
        messageTwo.textContent=data.forecast
    
    }
        })
    
    })
})
