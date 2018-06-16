import React, {Component} from 'react';
import AsyncLoader from '../services/asyncLoader';
import {googleMapsApi} from '../config';

class Map extends Component {

  constructor() {
    super();
    this.state = {
      loading: true
    }
    this.maps = window.google;
  }

  componentDidMount = () => {

    window.initMap = this.initMap;

    AsyncLoader(`https://maps.googleapis.com/maps/api/js?key=${googleMapsApi}&callback=initMap`);

  }

  initMap = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        new window.google.maps.Map(this.map, {
          center: {lat: position.coords.latitude, lng: position.coords.longitude},
          zoom: 8
        });

        this.setState({
          loading: false
        });
      })
    } else {
      new window.google.maps.Map(this.map, {
        center: {lat: -34.397, lng: 150.644},
        zoom: 8
      });
    }
  }

  render() {
    return (
      <React.Fragment>
        <div className="map__wrapper">
          {this.state.loading ?
            <div className="loader">Map is loading...</div>
          : null }
          <div ref={map => this.map = map} className="map" />
        </div>
      </React.Fragment>
    )
  }
}

export default Map;
