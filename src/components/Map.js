import React, {Component} from 'react';

class Map extends Component {

  constructor() {
    super();
    this.state = {
      loading: true
    }
  }

  componentDidMount = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {

        let userLocation = new window.google.maps.LatLng(position.coords.latitude, position.coords.longitude);

        let map = new window.google.maps.Map(this.map, {
          center: {lat: position.coords.latitude, lng: position.coords.longitude},
          zoom: 8
        });

        let request = {
          location: userLocation,
          radius: '1500',
          type: ['restaurant']
        };

        let service = new window.google.maps.places.PlacesService(map);
        service.nearbySearch(request, this.callback);

        this.setState({
          loading: false
        });
      });
    } else {
      new window.google.maps.Map(this.map, {
        center: {lat: -34.397, lng: 150.644},
        zoom: 8
      });
    }
  }

  initMap = () => {

  }

  callback = (results, status) => {
    if (status == window.google.maps.places.PlacesServiceStatus.OK) {
      this.props.initSearch(results);
    }
  }

  render() {

    console.log(this.props.locations)
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
