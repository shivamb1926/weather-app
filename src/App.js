import React, { useState } from 'react';
import './App.css';
import Toggle from './components/Toggle';
import SearchBar from './components/SearchBar';
import MainCard from './components/MainCard';
import Map from './components/Map';

function App() {
    const searchCity = (value) => {
        setCity(value);
    }

    let [city, setCity] = useState('Delhi');

    const [state, setState] = React.useState({
        checkedA: false,
    });



  return (
    <div className="App">
      <div className="toggle-parent">
        <div>
            <h1 className='heading'>WEATHER APP</h1>
        </div>   
        <Toggle state={state} setState={setState}/>
      </div>
      {!state.checkedA &&
        <div>
            <div className="search-parent">
                <SearchBar searchCity={searchCity}/>    
            </div>
            <div className="card-parent">
                 <MainCard city={city}/>
            </div>
        </div>
      }
      <div className="map-parent">
          {state.checkedA && <Map state={state} setState={setState} searchCity={searchCity}/>}
      </div>
    </div>
  );
}

export default App;
