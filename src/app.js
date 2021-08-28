
const path=require('path')
const express=require('express')
const hbs=require('hbs')

// const geocode = require('../../weather-app/utils/geocode')
const app=express()
const request=require('request')


const geocode=require('./utils/geocode')

const forecast=require('./utils/forecast')

console.log()
//define paths for express config

const publicDirectoryPath= path.join(__dirname, '../public')
const viewPath=path.join(__dirname, '../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')

//setup handlebar for views location
app.set('views', viewPath)
app.set('view engine', 'hbs')
hbs.registerPartials(partialsPath)
//setup static directory to serve
app.use(express.static(publicDirectoryPath))



//app.com
//app.com/help
//app.com/about
app.get('', (req,res)=>{
    res.render('index', {
        title: 'Weather ',
        name: 'Ayiza Asghar'
    })
})
app.get('/about', (req,res)=>{
    res.render('about',{
        title:' About Me',
        name: 'Ayiza Asghar'
    })
})

app.get('/help', (req,res)=>{
    res.render('help',{
        title:' Help',
        message: 'You can find help 24/7',
        name: 'Ayiza Asghar'
    })
})
app.get('/weather', (req,res)=>{

    if(!req.query.address){
        return res.send({
            error:"You must provide an address!"
            })
        
    }

   
       const address= req.query.address
   

geocode(address, (error, {latitude,longitude,location}={} )=>{

    if(error){
       return res.send({
           errormsg:error
       })
      }
    
      
forecast( latitude, longitude,(error, forecastData) => {
    if(error){
       return res.send({
            errormsg:error
        })
    }
    res.send({
        location,
        forecast:forecastData,
        address,
    })
  })


})






 
})

app.get('/products', (req,res)=>{
    if(!req.query.search){
       return res.send({
            error:"You must provide a search term"
        })
    }

    console.log(req.query.search)
    res.send({
        products:[]
    })
})

app.get('/help/*', (req,res)=>{
res.render('404Page',{
    title:'404 page',
    message:'Help Article not found',
    name: 'Ayiza Asghar'
})
})

app.get('*',(req,res)=>{

res.render('404Page', {
    title:'404 page',
    message: 'Page not found',
    name: 'Ayiza Asghar'
})
})

app.listen(3000,()=>{
    console.log('server is up on port 3000')
}

)
console.log(__dirname)
console.log(__filename)