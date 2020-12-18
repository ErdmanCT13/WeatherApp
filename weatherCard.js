import React from 'react'
import './weatherCard.css'


/* class WeatherCardDaily extends React.Component {

    state = {

    }

    render() {
        return (
            <div className={"weather-card"}>
                <div className={"weather-card__gif"}>Hello</div>
                <div className={"weather-card__temperature"}>Hello</div>
            </div>


        )
    }
} */


class WeatherCardDaily extends React.Component {
    state = {
        element: null
    }

    render() {
        console.log(this.props.forecast)
        return (
            <div className={`weather-card-daily ${this.props.forecast.isDaytime ? "weather-card-daily--daytime" : "weather-card-daily--evening"}`} ref={((ref) => {this.element = ref}).bind(this)} style={{transitionDelay: `${this.props.index * .05}s`}}>
                <div className="weather-card-daily__name">{this.props.forecast.name}</div>
                <div className="weather-card-daily__temp">{this.props.forecast.temperature}&deg;F</div>
                <div className="weather-card-daily__description">{this.props.forecast.detailedForecast}</div>
            </div>
        )
    }
    componentDidMount(){
        console.log(this.element)
        setTimeout(function(){
            console.log("opacity changging")
            this.element.style.opacity = "1"
            this.element.style.transform = "translateY(0px)"
        }.bind(this), this.props.index * 200)
   
    }
    componentDidUpdate(){
        setTimeout(function(){
            console.log("opacity changging")
            this.element.style.opacity = "1"
            this.element.style.transform = "translateY(0px)"
        }.bind(this), this.props.index * 200)
    }
}



export default WeatherCardDaily