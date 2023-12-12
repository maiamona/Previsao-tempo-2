//https://api.openweathermap.org/data/2.5/onecall?lat=-8.8368200&lon=13.2343200&units=metric&exclude=minutely,alerts&appid=6c55e8395c583956a1084ea91d2a0d3b
// let queryUrl = "https://api.openweathermap.org/data/2.5/onecall?";
//   let lat = "lat=-8.8368200&";
//   let lon = "lon=13.2343200&";
//   let apiOptions = "units=metric&exclude=minutely,alerts&";
//   let apiKey = "appid=6c55e8395c583956a1084ea91d2a0d3b";
//   let file = queryUrl + lat + lon + apiOptions + apiKey;

const timeEl = document.getElementById('time');
const dateEl = document.getElementById('date');
const currentWeatherItemEl = document.getElementById('current-weather-items');
const timeZone = document.getElementById('time-zone');
const countryEl = document.getElementById('country');
const weatherForecastEl = document.getElementById('weather-forecast');
const currentTempEl = document.getElementById('current-temp');

const days = ['Domingo', 'Segunda-Feira', 'Terça-Feira', 'Quarta-Feira', 'Quinta-Feira', 'Sexta-Feira', 'Sabado'];
const months = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro']

setInterval(()=>{
const time = new Date();
const month = time.getMonth();
const date = time.getDate();
const day = time.getDay();
const hour = time.getHours();
const hoursin12HrFormat = hour >= 13 ? hour %12: hour;
const minutes = time.getMinutes();
const ampm = hour >=12 ? 'PM' : 'AM'

timeEl.innerHTML = (hoursin12HrFormat < 10? '0' + hoursin12HrFormat : hoursin12HrFormat) + ':' + (minutes < 10? '0' + minutes: minutes) + ' ' + `<spam id="am-pm">${ampm}</spam>`

dateEl.innerHTML = days[day] + ', ' + date + ' ' + months[month]
}, 1000);

// function getWeatherData() {
//     navigator.geolocation.getCurrentPosition((success)=>{
//        let {latitude, longetude} = success.coords;
       
    //    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longetude}&units=metric&exclude=minutely,alerts&appid=${API_KEY}`)
//        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=-8.8368200&lon=13.2343200&units=metric&exclude=minutely,alerts&appid=6c55e8395c583956a1084ea91d2a0d3b`)
//        .then(res => res.json()).then(data =>{
//            console.log(data)
//            showWeatherData(data);
//        })
//     })
// }

// function showWeatherData(data){
//    let {humidity, pressure, sunrise, sunset, wind_spped} = data.current; 
// }

let queryUrl = "https://api.openweathermap.org/data/2.5/onecall?";
let lat = "lat=-8.8368200&";
let lon = "lon=13.2343200&";
let apiOptions = "units=metric&exclude=minutely,alerts&";
let apiKey = "appid=6c55e8395c583956a1084ea91d2a0d3b";
let file = queryUrl + lat + lon + apiOptions + apiKey;

fetch(file)
.then((response)=>response.json())
.then((data)=>{

    timeZone.innerHTML = data.timezone;
    countryEl.innerHTML = data.lat + ' N ' + data.lon + ' E';

    currentWeatherItemEl.innerHTML = `<div class="weather-item">
    <div>Humidity</div>
    <div>${data.current.humidity} %</div>
</div>
<div class="weather-item">
    <div>Pressure</div>
    <div>${data.current.pressure}</div>
</div>
<div class="weather-item">
    <div>Wind Speed</div>
    <div>${data.current.wind_speed}</div>
</div>
<div class="weather-item">
    <div>Madrugada</div>
    <div>${window.moment(data.current.sunrise * 1000).format('HH:mm a')}</div>
</div>
<div class="weather-item">
    <div>Tarde</div>
    <div>${window.moment(data.current.dt * 1000).format('HH:mm a')}</div>
</div>
<div class="weather-item">
    <div>Noite</div>
    <div>${window.moment(data.current.sunset * 1000).format('HH:mm a')}</div>
</div>`;

let otherDayForecast = ``
data.daily.forEach((day, idx)=>{
    if (idx == 0) {
        currentTempEl.innerHTML = `  <img src="https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="weather icon" class="w-icon">
        <div class="other">
            <div class="day">${window.moment(day.dt * 1000).format('dddd')}</div>
            <div class="temp">Night-${parseFloat(day.temp.night.toFixed())}&#176;C</div>
            <div class="temp">Day-${parseFloat(day.temp.day.toFixed())}&#176;C</div>
        </div>`
    } else{
        otherDayForecast += `<div class="weather-forecast-item">
        <div class="day">${window.moment(day.dt * 1000).format('dddd')}</div>
        <img src="https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="weather icon" class="w-icon">
        <div class="temp">Night-${parseFloat(day.temp.night.toFixed())}&#176;C</div>
        <div class="temp">Day-${parseFloat(day.temp.day.toFixed())}&#176;C</div>
       </div>`   
    }
})

weatherForecastEl.innerHTML = otherDayForecast;
});


// texte

function MyMin(myarr){
    var al = myarr.length;
    minimum = myarr[al-1];
    while (al--){
        if(myarr[al] < minimum){
            minimum = myarr[al]
        }
    }
    return minimum;
};

function MyMax(myarr){
    var al = myarr.length;
    maximum = myarr[al-1];
    while (al--){
        if(myarr[al] > maximum){
            maximum = myarr[al]
        }
    }
            return maximum;
};





var myArray = [1, 5, 6, 2, 3];
var min = MyMin(myArray);
var max = MyMax(myArray);
console.log('o menor valor e ' + min)
console.log('o maior valor e ' + max)


