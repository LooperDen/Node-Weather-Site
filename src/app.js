const port=process.env.PORT || 3000
const express=require('express')
const hbs=require('hbs')
const path=require('path')
const geocode=require('./util/geoLocation')
const forecast=require('./util/forecast')
const { response } = require('express')
const app=express()
const publicFolderPath=path.join(__dirname,"../public");
app.set('view engine','hbs')
app.set('views',path.join(__dirname,"../Templates/views"));
hbs.registerPartials(path.join(__dirname,"../Templates/partials"))
app.use(express.static(publicFolderPath));
app.get('',(req,res)=>
{

res.render('index',{
    title:"Weather app"
});
})
app.get('/about',(req,res)=>{
res.render('about',{
    title:"About"
});
})
app.get('/weather',(req,res)=>
{
    // if(!req.query)
    // {
    //     return res.send({
    //         error:"Please provide an address"
    //     })
    // }
    if(!req.query.search)
    {
    return res.send({
        error:"Please provide a address"
    });

}
   console.log(req.query)
   geocode(req.query.search,(err,response)=>
   {
       if(!err)
       {
           forecast(response,(err,response)=>{
               if(!err)
               {
                res.send(response);
               }
               else
               {
                res.send({
                    error:err
                }); 

               }
           })
       }
       else
       {
        res.send({
            error:err
        }); 
       }

   })
    
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title:"Help"
    });
    })
app.get('/help/*',(req,res)=>{
    res.render('error',{
        title:"Help Article"
    });
})
app.get('*',(req,res)=>{
    res.render('error',{
        title:"Page"
    });})
app.listen(port,()=>
{
    console.log("Listening in "+port)
})