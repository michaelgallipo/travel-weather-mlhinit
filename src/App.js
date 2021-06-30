import React, { Component} from "react";
import './App.css';

// function App() {
class App extends Component {
  constructor(props) {
    super(props);
    this.state = { weatherData: {}};
  }

  zipcodeSubmit = e => {
    e.preventDefault();
    const zipcode = e.target.elements.zipcode.value;
    this.getWeatherData(zipcode);
  };

  getWeatherData = (zipcode) => {
    console.log(zipcode);
    fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=5ffe4f98ec1e4027870201729212906&q=${zipcode}&days=7&aqi=no&alerts=no`
    ).then(response => {
      if (response.status !== 200) {
        console.log(
          "Looks like there was a problem. Status code: " + response.status
        );
        return;
      }
      response
      .json()
      .then(data => {
        console.log(data);
        this.setState({
          ...this.state,
          weatherData: {
            city: data.location.name,
            state: data.location.region,
            forecast: [
              {
              highTemp: data.forecast.forecastday[0].day.maxtemp_f,
              lowTemp: data.forecast.forecastday[0].day.mintemp_f,
              rainChance: data.forecast.forecastday[0].day.daily_chance_of_rain,
              humidity: data.forecast.forecastday[0].day.avghumidity,
              icon: data.forecast.forecastday[0].day.condition.icon
              },
              {
                highTemp: data.forecast.forecastday[1].day.maxtemp_f,
                lowTemp: data.forecast.forecastday[1].day.mintemp_f,
                rainChance: data.forecast.forecastday[1].day.daily_chance_of_rain,
                humidity: data.forecast.forecastday[1].day.avghumidity,
                icon: data.forecast.forecastday[1].day.condition.icon
                },
                {
                  highTemp: data.forecast.forecastday[2].day.maxtemp_f,
                  lowTemp: data.forecast.forecastday[2].day.mintemp_f,
                  rainChance: data.forecast.forecastday[2].day.daily_chance_of_rain,
                  humidity: data.forecast.forecastday[2].day.avghumidity,
                  icon: data.forecast.forecastday[2].day.condition.icon
                  }  
            ]
          }
        })
        console.log(this.state.weatherData);
      })
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Internet Hippo's Travel Weather App</h1>
          <h4>Enter a valid US Zip Code here:</h4>
        </header>

        <form onSubmit={this.zipcodeSubmit}>
          <div className="row justify-content-lg-center" id="data-entry">
            <input
              id="zip"
              className="form-control form-control-lg col-lg-3"
              type="text"
              name="zipcode"
              placeholder="Enter Zipcode"
              // value="35.6895"
            />
          </div>
          <button className="btn btn-lg btn-primary">Submit</button>
        </form>
      </div>
    );
  }
}

export default App;
