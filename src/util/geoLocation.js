const request=require('request');
const geocode=(input,callback)=>
{
    const geoURL="https://api.mapbox.com/geocoding/v5/mapbox.places/"+encodeURIComponent(input)+".json?limit=1&access_token=pk.eyJ1IjoieHkwNjk5IiwiYSI6ImNramw0cGtzejA1Mjcyemw5Z2J2OXYzM28ifQ._Z5pnKJoxWk0_FKs97DAig"

    request({url:geoURL,json:true},(err,response)=>
    {
        if(err)
        {
            callback("Unable to connect to the server",undefined)
        }
           else  if(response.body.features.length<1)
    {
        callback("Problem with request string",undefined);
    }
    else
    {
    callback(undefined,{
        Lat  : response.body.features[0].center[1],
          Long :response.body.features[0].center[0],
         place_name:response.body.features[0].place_name
    }
        );
    }
    })
}
module.exports=geocode;