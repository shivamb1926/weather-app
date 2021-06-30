import React, { useState, useEffect } from 'react';
import { StylesProvider, ThemeProvider } from '@material-ui/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import Alert from '@material-ui/lab/Alert';
import axios from 'axios';

import './css/MainCard.css';

export default function MainCard(props) {
	let [weatherData, setWeatherData] = useState();
    let [status, setStatus] = useState(false);

	useEffect(() => {

        async function getData(){
            await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${props.city}&appid=${process.env.REACT_APP_OPENWEATHER_API}&units=metric`)
            .then(res => {
                setStatus(false);
                setWeatherData(res.data);
            })
            .catch(err => {
                setStatus(true);
            })
        }
        getData();

	}, [props.city])

	const getDate = (time) => {
        let currDate = new Date().getTimezoneOffset();
		return new Date((time + (currDate*60)) * 1000).toLocaleString('en-IN', {hour12: false})
	}
    

	function WeatherInfo(){

        if(weatherData.cod === 200){
            return (
                <CardContent>
                    <Typography variant="h2">
                        {weatherData.name}
                    </Typography>
                    <div className="weather-desc">
                        <div>
                            <img src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`} alt="weather-icon"/> 
                        </div>
                        <div >
                            <Typography variant="h4">
                                {weatherData.weather[0].main}
                            </Typography>
                        </div>
                    </div>
                    <Typography variant="h6" gutterBottom>
                        {weatherData.main.temp}°C
                    </Typography>
                    <Typography gutterBottom>
                        Feels like {weatherData.main.feels_like}°C
                    </Typography>
                    <Typography gutterBottom>
                        Sunrise: {getDate(weatherData.sys.sunrise + weatherData.timezone)} Local Time
                    </Typography>
                    <Typography>
                        Sunset: {getDate(weatherData.sys.sunset + weatherData.timezone)} Local Time
                    </Typography>
                </CardContent>
            )
        }
        
        
        else{
            return(
                <div>Wrong data entered</div>
            )
        }
		
	}
	

	return (
        <StylesProvider injectFirst>
            <Card>
                {status === true && <Alert severity="error">No such city exists</Alert>}
                {weatherData === undefined ? <div className="loading"><CircularProgress /></div> : <WeatherInfo />}
    	    </Card>
        </StylesProvider>
    	
  	);
}
