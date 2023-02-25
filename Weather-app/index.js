const http = require ('http')
const fs  = require('fs')

const data = fs.readFileSync('home.html','utf-8')
var requests = require('requests')

const replace = (tem,ori)=>{
    let temperature = tem.replace('{%Temp%}',ori.main.temp)
    temperature =temperature.replace('{%Tempmin%}',ori.main.temp_min)
    temperature = temperature.replace('{%Tempmax%}',ori.main.temp_max)
    temperature = temperature.replace('{%location%}',ori.name)
    temperature = temperature.replace('{%country%}',ori.sys.country)
    return temperature
}

const server =http.createServer((req,res)=>{
    if(req.url === '/'){
        requests('https://api.openweathermap.org/data/2.5/weather?q=anand&appid=f0a457bc56a16ee00c539f87851fd925&units=metric')
        .on('data',(chunk)=>{
            const obj = JSON.parse(chunk)
            const arrData = [obj]
            const output = arrData.map((val)=> replace(data,val)).join('')
            res.write(output)
               
        })
            
        .on('end',function(err){
            if(err){
                console.log('ther is some errors',err)
                res.end()
            }
        })
    }
})

server.listen(3003,"127.0.0.1")