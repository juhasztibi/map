import React, { Component } from 'react';
import Map from './components/Map';
import ListView from './components/ListView';
import LocationFilter from './components/LocationFilter';
import Hamburger from './components/Hamburger';
import './App.css';
import AsyncLoader from './services/asyncLoader';
import {googleMapsApi} from './config';

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      menuOpen: false,
      searchResult: null,
      searchResult2: null
    }

    this.map;
  }

  componentDidMount = () => {
    window.initMap = this.initMap;

    AsyncLoader(`https://maps.googleapis.com/maps/api/js?key=${googleMapsApi}&libraries=places`);
  }

  openMenu = () => {
    this.setState({
      menuOpen: !this.state.menuOpen
    });
  }

  initSearch = (result) => {
    this.setState({
      searchResult: result
    });
  }

  search = (input) => {
    this.setState({
      searchResult2: this.state.searchResult.filter(resultItem => resultItem.includes(input))
    });
  }

  render() {

    console.log(this.state)

    const { searchResult, menuOpen } = this.state;

    return (
      <div className="app">
        <aside className={menuOpen ? "app__sidebar app__sidebar--isOpen" : "app__sidebar"}>
          <div className="app__sidebar-wrapper">
            <h1 className="app__sidebar-title">Bart Locations</h1>
            <LocationFilter search={this.search} />
            {searchResult ? <ListView result={searchResult} /> : null}
          </div>
        </aside>
        <section className="app__section">
          <div className="app__header">
            <Hamburger openMenu={this.openMenu} />
          </div>
          <Map locations={searchResult} initSearch={this.initSearch}/>
        </section>
      </div>
    );
  }
}

export default App;
