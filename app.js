

function onTheFly(){
	var i = document.getElementById("in1");
	
	var x = document.getElementById("op1");
	
	
	x.innerHTML = i.value;
	
}

const api = {
    key: "",  //you apikey here
    base : "https://api.openweathermap.org/data/2.5/"
}

const searchBox = document.getElementById("in1");

searchBox.addEventListener('keypress', setQuery);

function setQuery(e){
    if(e.keyCode == 13){
        getResults(searchBox.value);
        console.log(searchBox.value);
        searchBox.value = " ";
    }
}

function getResults(query){
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`).then(weather=>{
        return weather.json();

    }).then(displayResults);

}

function displayResults(weather){
    console.log(weather);
    let city = document.querySelector(".location .city");
    city.innerText = `${weather.name}, ${weather.sys.country}`;
    
    
    let now = new Date();
    let date = document.querySelector('.location .date');
    date.innerText = datebuilder(now);

    let temp = document.querySelector('.current .temp');
    temp.innerHTML = `${Math.round(weather.main.temp)}<span> °C</span>`;

    let weatherElement = document.querySelector(".current .weather");
    weatherElement.innerText = weather.weather[0].main;

    let sunsetTime = document.querySelector(".current .time");
    sunsetTime.innerText = `${new Date(weather.sys['sunset']*1000)}`


    let hi_low = document.querySelector(".current .hi-low");
    hi_low.innerText = `${weather.main.temp_min} °C / ${weather.main.temp_max} °C`;
}


function datebuilder(d){
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
  
    return `${day} ${date} ${month} ${year}`;
    }
