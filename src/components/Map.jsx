import { useState, useEffect, useRef } from 'react';
import React from 'react';
// eslint-disable-next-line import/no-webpack-loader-syntax
import mapboxgl from "!mapbox-gl";
import './Map.css';
import axios from 'axios';

// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX;


export default function Map(props) {

    const [currentCoords, setCurrentCoords] = useState("");

    const mapContainer = useRef(null);
    const map = useRef(null);
    const lng = 0;
    const lat = 0;
    const zoom = 1.5;

    const handleChange = () => {
        let newState;
        if(props.state.checkedA === true)
            newState = false;
        else
            newState = true;
        props.setState({ ...props.state, checkedA: newState });
    }

    const getCity = async(coords) => {
        await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lng}&appid=${process.env.REACT_APP_OPENWEATHER_API}&units=metric`)
        .then(res => {
            props.searchCity(res.data.name);
        })
    }

    useEffect(() => {
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
          container: mapContainer.current,
          style: 'mapbox://styles/mapbox/streets-v11',
          center: [lng, lat],
          zoom: zoom
        });

        map.current.on('click', function (e) {
            setCurrentCoords(e.lngLat.wrap());
            getCity(e.lngLat.wrap());
            handleChange();
        });
    });

    

    return (
        <div>
            <div ref={mapContainer} className="map-container" />
            <div id='info'>{currentCoords.lat}  {currentCoords.lng}</div>
        </div>
    )
}
