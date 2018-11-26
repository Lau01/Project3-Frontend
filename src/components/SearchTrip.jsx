import React, {Component} from 'react';
// import SearchResults from '../components/SearchResults'
// import axios from 'axios';

class SearchTrip extends Component {
  constructor() {
    super();
    this.state = {
      origin: '',
      destination: '',
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

handleChange(event) {
  this.setState({[event.target.name]: event.target.value})
}

handleSubmit(event) {
  this.props.history.push(`/search/${this.state.origin}/${this.state.destination}`)
  event.preventDefault();
}

  render() {
    return(
      <div>
        <h2>Plan your trip</h2>
        <form onSubmit={this.handleSubmit}>
          <label>
            Origin:
            <input
              type="text"
              name="origin"
              value={this.state.origin}
              onChange={this.handleChange}
            >
            </input>
          </label>

          <label>
            Destination:
            <input
              type="text"
              name="destination"
              value={this.state.destination}
              onChange={this.handleChange}
            >
            </input>
          </label>

          <input type="submit" value="Search Trip"/>

        </form>

      </div>
    )
  }
}

export default SearchTrip;
