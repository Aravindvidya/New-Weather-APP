const APIkey= "e2fc77dfd7ebcd66a108902b23583ffd";
const weatherDataEl= document.querySelector(".image-temp");
const cityInputEl= document.querySelector("#city-input");
const formEl= document.querySelector('form');

formEl.addEventListener("submit",(event)=>{
    event.preventDefault();
    const cityValue = cityInputEl.value;
    getWeatherData(cityValue);
});
async function getWeatherData(cityValue){
    try {
        const response= await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${APIkey}&units=metric`);

        if(!response.ok){
            throw new Error("Network response was not ok");
        }
        const data= await response.json();
         console.log(data);
        const temperature = Math.round(data.main.temp);
        const description = data.weather[0].description;
        const icon = data.weather[0].icon;
        const details = [ 
        `Feels like: ${Math.round(data.main.feels_like)}`,
        `Humidity: ${data.main.humidity}%`,
        `Wind speed: ${data.wind.speed} m/s`,
        ];

       weatherDataEl.querySelector('.icon').innerHTML = `<img src="https://openweathermap.org/img/wn/${icon}.png" alt="weather-icon">`;

       weatherDataEl.querySelector('.temp').textContent= `${temperature} °C`;
       weatherDataEl.querySelector('.weather-overcast').textContent= description;

      document.querySelector('.weather-character').innerHTML = details.map((detail)=>`<div class='last-character'>${detail}</div>`).join('');
    
    } catch (error) { 
    
      const iconEl = weatherDataEl.querySelector('.icon');
        const tempEl = weatherDataEl.querySelector('.temp');
        const descriptionEl = weatherDataEl.querySelector('.weather-overcast');
        const detailsEl = document.querySelector('.weather-character');  // Changed to weather-character

        if (iconEl && tempEl && descriptionEl && detailsEl) {
            iconEl.innerHTML = '';
            tempEl.textContent = '';
            descriptionEl.textContent = 'An Error Happened';
            detailsEl.innerHTML = '';
    }
  }
}

  // weatherDataEl.querySelector('.icon').innerHTML = '';
      // weatherDataEl.querySelector('.temp').textContent= '';
      // weatherDataEl.querySelector('.weather-overcast').textContent= 'An Error Happenend';
      // weatherDataEl.querySelector('.weather-character').innerHTML ="";
