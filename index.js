// 3ad7d482f183527797da4dacdf465798
// https://api.openweathermap.org/data/2.5/weather?q=dhanbad&appid=3ad7d482f183527797da4dacdf465798

const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const https = require('https');
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res)=>{

    // res.sendFile(__dirname + '/index.html');
    res.sendFile(path.join(__dirname, 'index.html'));

    // res.send("Server is Up and Running");
});

app.post('/', (req, res)=>{
    
    const city = req.body.cityName;
    const apikey = "3ad7d482f183527797da4dacdf465798";


    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`;
    https.get(url, (response)=>{
        // console.log(response.statusCode);

        response.on('data', (data)=>{
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png" ;
            
            res.write(`<p> <img src = ${imageURL} > </p>`);
            res.write("<p>The weather is currently " + "<strong>" + weatherDescription + "</strong>" + "</p>");
            res.write("<h1>The temperature in " + city +  " is " + temp + " degrees celcius. </h1>");
            res.send();

        })
    })

    
})


app.listen(port, ()=>{
    console.log(`The server is listening on port ${port}`);
})





