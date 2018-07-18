import React, { Component } from 'react';
import Map from './components/Map';
import ListView from './components/ListView';
import LocationFilter from './components/LocationFilter';
import Hamburger from './components/Hamburger';
import './App.css';
import AsyncLoader from './services/asyncLoader';
import { googleMapsApi } from './config';
import mapService from './services/mapService';

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      menuOpen: false,
      filterText: "",
      mapIsLoading: true,
      places: ""
    }

    this.filterHandler = this.filterHandler.bind(this);
    this.initMap = this.initMap.bind(this);
    this.setPlaces = this.setPlaces.bind(this);
    this.places;
    this.mapServiceInstance;
  }

  componentDidMount = () => {
    window.initMap = this.initMap;
    AsyncLoader(`https://maps.googleapis.com/maps/api/js?key=${googleMapsApi}&libraries=places&callback=initMap`);
  }

  initMap = () => {
    this.mapServiceInstance = new mapService(this.mapElement, this.setPlaces, "restaurant", "1500");
    this.mapServiceInstance.createMap();
    this.setState({
      mapIsLoading: false
    });
  }

  filterHandler = (filterText) => {
    console.log(filterText);
    this.setState({
      filterText: filterText
    });

    this.mapServiceInstance.displayMarkers(this.state.places.filter(place => place.name.indexOf(filterText) !== -1));
  }

  openMenu = () => {
    this.setState({
      menuOpen: !this.state.menuOpen
    });
  }

  setPlaces = (placeList) => {
    this.setState({
      places: placeList
    })
  }

  render() {

    const { menuOpen, mapIsLoading, places } = this.state;

    return (
      <div className="app">
        <aside className={menuOpen ? "app__sidebar app__sidebar--isOpen" : "app__sidebar"}>
          <div className="app__sidebar-wrapper">
            <h1 className="app__sidebar-title">Bart Locations</h1>
            <LocationFilter filterText={this.state.filterText} filterHandler={this.filterHandler} />
            <ListView filterText={this.state.filterText} places={places} />
          </div>
        </aside>
        <section className="app__section">
          <div className="app__header">
            <Hamburger openMenu={this.openMenu} />
          </div>
          <Map mapElement={mapElement => this.mapElement = mapElement} filterText={this.state.filterText} places={places} loading={mapIsLoading}/>
         </section>
      </div>
    );
  }
}

export default App;
