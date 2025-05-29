let input = document.querySelector("input");
let main = document.querySelector("main");
let bodyEl = document.querySelector("body");
bodyEl.classList.add("clear");

document.addEventListener("keydown", getWeather);
const now = new Date();
const options = {
    weekday: "long",
    year: "numeric",
    month: "numeric",
    day: "numeric",
};
let timeNow = now.toLocaleDateString("fa-ir", options);
console.log();

async function getWeather(e) {
    if (e.key == "Enter" && input.value != "") {
        bodyEl.classList = "";
        try {
            await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=96d5ec619c64e7e8835cf98c4dd569d9`
            )
                .then((res) => {
                    return res.json();
                })
                .then((res) => {
                    console.log(res);

                    showWeather(res);
                    const weatherCondition = res.weather[0].main.toLowerCase();
                    const validConditions = [
                        "sunny",
                        "clear",
                        "rain",
                        "snow",
                        "clouds",
                    ];

                    if (validConditions.includes(weatherCondition)) {
                        bodyEl.classList.add(weatherCondition);
                    }
                });
            input.value = "";
        } catch {
            bodyEl.classList.add("clear");
            alert("شهر یا کشور وارد شده شما اشتباه میباشد !");
            input.value = "";
        }
    }
}
function showWeather(res) {
    main.innerHTML = `
  <section class="location-info bg-black/20 p-2 rounded-lg">
<div class="location-name text-6xl font-DanaDemiBold">
${res.name}, ${res.sys.country}
</div>
<div class="location-date">${timeNow}</div>
</section>
<section class="location-weather bg-black/20 p-2 rounded-lg">
<div class="temp">${Math.floor(res.main.temp - 273.15)}<span>°c</span></div>
<div class="weather">${res.weather[0].main.toLowerCase()}</div>
<div class="hi-low">${Math.floor(res.main.temp_max - 273.15)}°c / ${Math.floor(
        res.main.temp_min - 273.15
    )}°c</div>
</section>
`;
}
