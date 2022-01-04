// npm install react-bootstrap bootstrap@5.1.3
// npm install axios@0.24.0
// npm install --save react-toastify
import React, { Component } from 'react';
import axios from 'axios';
import { Button, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import './App.css';

export default class App extends Component {

  state = {
    regionData: [],
    weatherData: [],
    dummy: ['a', 'b', 'c', 'd']
  };

  componentDidMount() {
    console.log(process.env.REACT_APP_WEATHER_API_KEY_ACCUWEATHER);
  }

  getRegionData = (query, offset=3) => {
    const apiKey = process.env.REACT_APP_WEATHER_API_KEY_ACCUWEATHER
    const buildURL = `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${apiKey}&q=${query}&offset=${offset}`
    axios.get(buildURL)
    .then(res => {
      const regionData = res.data;
      console.log('--- regionData ---');
      console.log(regionData)
      console.log('--- state ---');
      if (regionData.length > 0) {
        this.setState({regionData});
        console.log(this.state);
      } else {
        toast.error('No results found!', {
          position: "bottom-right",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    })
  }

  onTextChange = (e) => {
    const input = e.target.value
    if (input.length >= 2) {
      this.getRegionData(input);
    }
  }

  render() {
    const {regionData, dummy} = this.state;
    return (
      <div className='container-fluid mt-2 mb-5'>
        <div className='d-flex flex-column justify-content-center'>
          <div className='row align-items-center' id='heading'>
            <h1 id='heading-text'>5 Day Forecast</h1>
          </div>
          <div className='row mt-5'>
            <div className='col-md-10'>
              <Form.Control type="text" placeholder="Search City.." onChange={e => this.onTextChange(e)} />
            </div>
            <div className='col-md-2'>
              <Button variant='outline-success'>Pick city</Button>
            </div>
            <div className='col-md-12 mb-2 mt-2'>
              {
                (regionData?.length === 0)
                ? (<small>Search Results will be shown here</small>)
                : (<small>Showing Results for: {regionData[0]["EnglishName"]} - Key: {regionData[0]["Key"]}</small>)
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}
