import "./App.css";
import React, { useEffect, useState } from "react";
import { Button, Card, Form } from "react-bootstrap"; //Component from react-bootstrap we installed
import "bootstrap/dist/css/bootstrap.min.css"; //import bootstrap for enhanced UI

function SearchForm({ onSubmit }) {
  const [value, setValue] = React.useState(""); //useState for state managment ReactHooks

  //it handles the submit in the form on submit press it sends data to the parent Component using callback
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value) return;
    onSubmit(value);
    setValue("");
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>
          <b> Search Weather</b>
        </Form.Label>
        <Form.Control
          type="text"
          className="input"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Search by city"
        />
      </Form.Group>

      <Button variant="primary mt-3 mb-3" type="submit">
        Search
      </Button>
    </Form>
  );
}

function App() {
  const [cityName, setcityName] = useState("");  //useState for state managment for the cityName from Form
  const [weatherDeatils, setWeatherDetails] = useState(null);  //useState for state managment for weatherData 
  //useEffect ReactHooks : it is used to run a set of codes on component load
  useEffect(() => {
    if (cityName) {
      //fetch function is used to call API or get data from URL
      //appid is the api key you need to generate from the openweathermap.org current weather data API
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=df7edfb9dd04675cc1c7d9a38830b9a4`
      )
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setWeatherDetails(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [cityName]);

  const onSubmit =(city)=>{

    if(city){
      setcityName(city)
    }
  }

  return (
    <div className="App">
      <div className="container">
        <h1 className="text-center mb-5">Weather App</h1>
        <SearchForm onSubmit={onSubmit}/>
        <div>
          <Card>
            {//if wetherDeatils is present show the card}
            {weatherDeatils && (
              <Card.Body>
                <div className="weather">
                  <b>{weatherDeatils.name}</b>
                  <div>
                    <p>{'Temp: '+weatherDeatils.main.temp+ ' F'}</p>
                    <p>{'Weather: '+weatherDeatils.weather[0].main}</p>

                  </div>
                </div>
              </Card.Body>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}

export default App;
