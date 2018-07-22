import React, {Component} from 'react';

class LocationFilter extends Component {

  constructor(props) {
    super(props);
    this.sendForm = this.sendForm.bind(this);
  }

  sendForm = (e) => {
    e.preventDefault();
    this.props.filterHandler(this.place.value);
  }

  render() {
    return (
      <div className="location-filter">
        <form onSubmit={this.sendForm}>
          <input type="text" name="search" aria-label="Search" className="location-filter__input" ref={place => this.place = place} />
          <button type="submit" className="location-filter__button">Filter</button>
        </form>
      </div>
    );
  }
}

export default LocationFilter;
