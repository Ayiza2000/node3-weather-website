const request = require("request");

const forecast= (latitude, longitude ,callback) =>{
    const url='http://api.weatherstack.com/current?access_key=a43cd37de58780edecebf25319d8fbe2&query='+ latitude +','+ longitude + '&units=f'
    request({url:url, json:true}, (error,{body}) =>{
     if(error){
         callback('Unable to connect to the internet!!!',undefined)
     }
     else if(body.error){
       callback('Invalid location entered!!',undefined)
     }
     else{
       callback(undefined ,body.current.weather_descriptions[0] +".It is currently " + body.current.temperature + " degrees out. Weather code is " + body.current.weather_code +". It feels like " + body.current.feelslike )
     }


    }
  )

}


module.exports= forecast;