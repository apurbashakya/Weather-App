import React, { useState, useEffect } from "react";

import "./App.css";

function App() {
  const [weather, setWeather] = useState({});
  
  const [locations, setLocations] = useState();
  const [photos, setPhotos] = useState([]);
  useEffect(() => {
    ifClicked();
  }, []);

  function ifClicked() {
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${locations}&APPID=9397e31b5fa4c523648f3d3392afc7e3&units=metric`
    )
      .then((res) => {
        if (res.status===200) {
          return res.json();
        } 
        else {
          if (res.status === 404) {
            return alert("Oops, there seems to be an error!(wrong location)");
          }
          alert("Oops, there seems to be an error!");
        }
      })
      .then((object) => {
        console.log(object);
        setWeather(object);
      })
      .catch((error) => console.log(error));
    fetch(
      `https://api.unsplash.com/search/photos?query=${locations}&client_id=IW_-kuhdE8MHfaLyeY-UjJdxnsm6BFd8BhdQnZlKpks`
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("http error");
        }
      })
      .then((data) => {
        console.log(data);
        setPhotos(data?.results[0]?.urls?.regular);
      })
      .catch((error) => console.log(error));
  }
  return (
    <div className="app">
        <div className="search">
          <input
            type="text"
            value={locations}
            onChange={(e) => setLocations(e.target.value)}
            placeholder="Enter location"
            className="location_input"
          />
          <button className="location_searcher" onClick={ifClicked}>
            Search Location
          </button>
        </div>
        <div className="app__data">
          <p className="temp">Current Temparature: {weather?.main?.temp}</p>
        </div>
        <img className="app__image" src={photos} alt="" />
      </div>
  );
}

export default App;