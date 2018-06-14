import React, { Component } from 'react';
import Map from './components/Map';
import ListView from './components/ListView';
import LocationFilter from './components/LocationFilter';
import Hamburger from './components/Hamburger';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      menuOpen: false,
      searchResult: []
    }
  }

  openMenu = () => {
    this.setState({
      menuOpen: !this.state.menuOpen
    })
  }

  search = () => {

  }

  render() {

    const { searchResult } = this.state;

    return (
      <div className="app">
        <aside className="app__sidebar">
          <h1>Bart Locations</h1>
          <LocationFilter search={this.search} />
          <ListView result={searchResult} />
        </aside>
        <section className="app__section">
          <div className="app__header">
            <Hamburger openMenu={this.openMenu} />
          </div>
          <Map locations={searchResult} />
        </section>
      </div>
    );
  }
}

export default App;
