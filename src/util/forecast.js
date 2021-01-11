
const request =require('request');


const forecast=(input,callback)=>
{
const url="http://api.openweathermap.org/data/2.5/weather?lat="+input.Lat+"&lon="+input.Long+"&appid=a182859fac8355d2d2a90c75504e99a3"
request({url:url,json:true},(err,response)=>
{
    if(err)
    {
        callback("Unable to connect to the server",undefined)
    }
else if(JSON.stringify(response).length<5)
{
    callback("Problem with the request lat",undefined)

}
    else
    {
callback(undefined,{
   main: response.body.weather[0].main,
   description:response.body.weather[0].description,
   name:response.body.name,
   place_name:input.place_name

    })
}
})
}
module.exports=forecast
