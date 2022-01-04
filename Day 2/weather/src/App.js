// npm install react-bootstrap bootstrap@5.1.3
// npm install axios@0.24.0
import React, { Component } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import './App.css';

export default class App extends Component {

  state = {
    weatherData: [],
  };

  componentDidMount() {
    axios.get(`https://jsonplaceholder.typicode.com/users`)
    .then(res => {
      const weatherData = res.data;
      this.setState({weatherData});
      console.log(this.state.weatherData);
    })
  }

  render() {
    return (
      <div className='container-fluid mt-2 mb-5'>
        <div className='d-flex flex-column justify-content-center'>
          <div className='row align-items-center' id='heading'>
            <h1 id='heading-text'>5 Day Forecast</h1>
          </div>
          <Button className='mt-5' variant='outline-success'>Pick city</Button>
        </div>
      </div>
    );
  }
}
