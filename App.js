import React from 'react';
import logo from './logo.svg';
import style from './App.module.css';
import Tab from './tab.js'
import { Header } from './header.js'
import WeatherCardDaily from './weatherCard.js'


function getLocation() {
  return new Promise(function (resolve, reject) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        resolve(position)
      });
    } else {
      reject(new Error("failed to retrieve coordinates"))
    }
  })
}

function showPosition(position) {
  /*   x.innerHTML = "Latitude: " + position.coords.latitude + 
    "<br>Longitude: " + position.coords.longitude; */
  console.log("latitude", position.coords.latitude, "longitude", position.coords.longitude)
  window.position = position
}


var componentArray = []
/* for(var i = 0; i < 10; i++){
  componentArray.push(<WeatherCardDaily/>)
} */
console.log(componentArray)

console.log(style.App)
class App extends React.Component {
  state = {
    loading: true, // waiting for the api request to resolve
    weatherCards: []
  }
  storeWeatherCardRef(ref){
    console.log(ref, "ref")
    if(this.state.dailyForecast){
      this.state.weatherCards.push(ref)
    }
  }

  render() {
  
    return (
      <div className={style.App}>
        <Header appState={this.state}>

        </Header>
        <div className="weather-card-container">

          {(function () {
            console.log(this)
            if (this.state.dailyForecast) {
              return this.state.dailyForecast.map(function(forecast, i){
                return (<WeatherCardDaily index={i} ref={this.storeWeatherCardRef.bind(this)} key={Math.floor(Math.random() * 10000000000)} forecast={forecast}/>)
              }.bind(this))
            }
          }).bind(this)()}

          {/*           {(function () {
            var hourlyForecastCards = []
            if (this.state.hourlyForecast) {
              for (var i = 0; i < this.state.hourlyForecast.length; i++) {
                hourlyForecastCards.push(<WeatherCardDaily key={"weather-card-hourly" + i} forecast={this.state.dailyForecast[i]} />)
              }
            }
            return hourlyForecastCards
          
          }).bind(this)()} */}

        </div>
      </div>
    );

  }

  componentDidUpdate(){
    this.state.weatherCards.forEach((weatherCardRef) => {
      console.log(weatherCardRef.current)
    })
  }

  async componentDidMount() {
    var context = this
    var position = await getLocation()
    try {
      var parsedApiMetadata = await fetch(`https://api.weather.gov/points/${position.coords.latitude},${position.coords.longitude}`).then((apiMetaData) => { // contains api routes
        return apiMetaData.json()
      })
    }
    catch (error) {
      alert("Error while retreiving metadata")
      console.error("Error while retreiving metadata", error)
    }
    console.log(parsedApiMetadata)
    try {
      var parsedForecastStation = await fetch(parsedApiMetadata.properties.forecastOffice).then((forecastStation) => {
        return forecastStation.json()
      })
    }
    catch (error) {
      console.error("Error while retreiving forecast office", error)
    }
    try {
      var parsedHourlyForecast = await fetch(parsedApiMetadata.properties.forecastHourly).then((forecastHourly) => {
        return forecastHourly.json().then((parsedForecastHourly) => {
          return parsedForecastHourly.properties.periods
        })
      })
    }
    catch (error) {
      console.error("Error while getting hourly forecast", error)
    }
    try {
      var parsedForecast = await fetch(parsedApiMetadata.properties.forecast).then((forecast) => {
        return forecast.json().then((parsedForecast) => {
          return parsedForecast.properties.periods
        })
      })
    }
    catch (error) {
      console.error("Error while getting daily forecast", error)
    }
    this.setState({
      hourlyForecast: parsedHourlyForecast,
      dailyForecast: parsedForecast,
      latitude: position.coords.latitude.toFixed(4),
      longitude: position.coords.longitude.toFixed(4),
      city: parsedApiMetadata.properties.relativeLocation.properties.city,
      state: parsedApiMetadata.properties.relativeLocation.properties.state,
      stationCallSign: parsedApiMetadata.properties.cwa,
      stationLocation: parsedForecastStation.name,
      loading: false
    })
  }
}


export default App;
