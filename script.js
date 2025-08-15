document.addEventListener('DOMContentLoaded', () => {
    const cityInput = document.getElementById("city-input")
    const getWeatherBtn = document.getElementById("get-weather-btn")
    const weatherInfo = document.getElementById("weather-info")
    const cityNameDisplay = document.getElementById("city-name")
    const temperatureDisplay = document.getElementById("temperature")
    const errorMessage = document.getElementById("error-message")

    const API_KEY = "043c71424d5e4c79b35191630251508"

    getWeatherBtn.addEventListener('click', async () => {
        const city = cityInput.value.trim();
        if(!city) return;

        try {
            const weatherData = await fetchWeatherData(city)
            displayWeatherData(weatherData)
        } catch (error) {
            showError()
        }

    })


    async function fetchWeatherData(city){

        const url = `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=no`

        const response = await fetch(url);

        const data = await response.json()


        if(data.error){
            throw new Error("City Not Found")
        }

        return data

    }


    function displayWeatherData(data){

        const {name} = data.location
        const {temp_c} = data.current

        cityNameDisplay.textContent = name

        temperatureDisplay.textContent = `Temperature: ${temp_c}ºC`

        weatherInfo.classList.remove('hidden')
        errorMessage.classList.add("hidden")

    }

    function showError(){
        weatherInfo.classList.add('hidden')
        errorMessage.classList.remove('hidden')
    }

})