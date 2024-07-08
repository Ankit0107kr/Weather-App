const cityName = document.getElementById("cityName");
const city_name = document.getElementById("city_name");
const temp = document.getElementById("temp");
const temp_status = document.getElementById("temp_status");
const day = document.getElementById("day");
const today_data = document.getElementById("today_data");
const submitBtn = document.getElementById("submitBtn");

const getDay = () => {
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let currentDay = new Date().getDay();
  return days[currentDay];
};
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("day").innerText = getDay();
  document.getElementById("today_data").innerText = getDate();
});

const getDate = () => {
  let today = new Date();
  let date = today.getDate();
  let month = today.toLocaleString('default', { month: 'short' });
  return `${date} ${month}`;
};

const getInfo = async (event) => {
  event.preventDefault();
  let cityVal = cityName.value;
  if (cityVal === "") {
    city_name.innerText = `Please write the City-name before search`;
    alert('Please write the City-name before search');
  } else {
    const OPENWEATHERMAP_API_KEY = 'c66920056f982f096fe77eba1012eb46';
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityVal}&appid=${OPENWEATHERMAP_API_KEY}`;
      const response = await fetch(url);
      const data = await response.json();
      if (data.cod === "404") {
        city_name.innerText = `City not found`;
        alert('City not found');
      } else {
        city_name.innerText = `${data.name}, ${data.sys.country}`;
        temp.innerHTML = `${Math.round(data.main.temp - 273.15)} <sup>o</sup>C`; // Converting Kelvin to Celsius
        temp_status.innerText = data.weather[0].main;

        // Optionally, update the icon based on weather status
        const weatherCondition = data.weather[0].main.toLowerCase();
        if (weatherCondition === "clear") {
          temp_status.innerHTML = `<i class="fa-solid fa-sun"></i>`;
        } else if (weatherCondition === "clouds") {
          temp_status.innerHTML = `<i class="fa-solid fa-cloud"></i>`;
        } else if (weatherCondition === "rain") {
          temp_status.innerHTML = `<i class="fa-solid fa-cloud-rain"></i>`;
        } else if (weatherCondition === "snow") {
          temp_status.innerHTML = `<i class="fa-solid fa-snowflake"></i>`;
        } else {
          temp_status.innerHTML = `<i class="fa-solid fa-cloud"></i>`;
        }

        // Show the date and day
        // day.innerText = getDay();
        // today_data.innerText = getDate();

        // Show the weather information block
        document.querySelector(".middle_layer").classList.remove("data_hide");
      }
    } catch (error) {
      city_name.innerText = `Error fetching weather data`;
      console.error("Error fetching weather data: ", error);
    }
  }
};

submitBtn.addEventListener("click", getInfo);
