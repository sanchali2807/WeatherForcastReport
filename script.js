

const weatherForm = document.querySelector(".weatherForm");
// querySelector return thr first element in the class
const cityInput =document.querySelector(".cityInput");

const card = document.querySelector(".card");
const apiKey = "845e1d242307ee3a85a8339ffc074a78";

weatherForm.addEventListener("submit",async event=>{

    // forms have a default behaviur where they refresh the page we need to prevent that
    event.preventDefault();
    const city = cityInput.value;

    if(city){
        try{
            const weatherData = await getweatherData(city);
            // wait for the fucntion to return the weather data
            displayWeatherInfo(weatherData);

        }catch(error){
            console.error(error);
            displayError(error);
        }
    }else{
        displayError("Please enter a city");
    }
});

async function getweatherData(city){
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

const response = await fetch(apiUrl);

if(!response.ok){
    throw new Error("Could not fetch the data");
}
return await response.json();

}

function displayWeatherInfo(data){
    // console.log(data);
    // get all the info on the city we type will use the descriptionand id to return emojis

    const {name: city ,
         main: {temp,humidity} ,
        weather :[{description ,id}]} = data;
       card.textContent = "";
       card.style.display = "flex"; 

       const cityDisplay = document.createElement("h1");
       const tempDisplay = document.createElement("p");
       const humidityDisplay = document.createElement("p");
       const descDisplay = document.createElement("p");
       const weatherEmojis = document.createElement("p");



       cityDisplay.textContent = city;
       tempDisplay.textContent = `${(temp -273.15).toFixed(1)}°C`;
       humidityDisplay.textContent = `Humidity: ${humidity} %`;
        descDisplay.textContent = description;
        weatherEmojis.textContent = getWeatherEmojis(id);


       cityDisplay.classList.add("cityDisplay");
        tempDisplay.classList.add("tempDisplay");
        humidityDisplay.classList.add("humidityDisplay");
        descDisplay.classList.add("descDisplay");
        weatherEmojis.classList.add("weatherEmojis");



       card.appendChild(cityDisplay);
       card.appendChild(tempDisplay);
       card.appendChild(humidityDisplay);
       card.appendChild(descDisplay);
       card.appendChild(weatherEmojis);

}

function getWeatherEmojis(weatherId){
 switch(true){
    case (weatherId >=200 && weatherId < 300):
        return "⛈";
        case (weatherId >=300 && weatherId < 400):
        return "🌧️";
        case (weatherId >=500 && weatherId < 600):
        return "🌧️";
        case (weatherId >=600 && weatherId < 700):
        return "❄️";
        case (weatherId >=700 && weatherId < 800):
        return "💨";
        case (weatherId ===800):
        return "☀️";
        case (weatherId >=801 && weatherId <810 ):
        return "☁️";
        default:
            return "❓";
        
 }
}

function displayError(message){
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
     errorDisplay.classList.add("errorDisplay");
     card.textContent = "";
     card.style.display = "flex";
     card.appendChild(errorDisplay);
}  ``