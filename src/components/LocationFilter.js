import React, {Component} from 'react';

class LocationFilter extends Component {

  constructor(props) {
    super(props);
    this.state = {
      input: null
    }
  }

  handleInput = (input) => {
    this.setState({
      input: input.target.value
    });
  }

  sendBack = () => {
    this.props.search(this.state.input);
  }

  render() {
    return (
      <div className="location-filter">
        <input type="text" className="location-filter__input" onChange={this.handleInput} />
        <button type="button" className="location-filter__button" onClick={this.sendBack}>Filter</button>
      </div>
    );
  }
}

export default LocationFilter;
