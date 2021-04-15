const form = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('.time');
const icon = document.querySelector('.icon img');

const updateData = async (city) => {
    const cityData = await getCity(city);
    const weatherData = await getWeather(cityData.Key);

    return {
        cityData,
        weatherData
    };
}

const updateUi = data => {

    // const city = data.cityData;
    // const weather = data.weatherData;

    //destructure properties
    const { cityData, weatherData } = data;

    //update details
    details.innerHTML = `
        <h5 class="my-3">${cityData.EnglishName}</h5>
        <div class="my-3">${weatherData.WeatherText}</div>
        <div class="display-4 my-4">
            <span>${weatherData.Temperature.Metric.Value}</span>
            <span>&deg;C</span>
        </div>
    `;


    //update the day/night image
    let timeSrc = weatherData.IsDayTime ? 'img/day.svg' : 'img/night.svg'
    time.setAttribute('src', timeSrc);

    //update weather icon
    let iconSrc = `img/icons/${weatherData.WeatherIcon}.svg`;
    icon.setAttribute('src', iconSrc);


    if (card.classList.contains('d-none'))
        card.classList.remove('d-none');

};


form.addEventListener('submit', (e) => {
    e.preventDefault();
    const city = form.city.value.trim();
    form.reset();

    updateData(city)
        .then(data => updateUi(data))
        .catch(err => console.log(err));
});