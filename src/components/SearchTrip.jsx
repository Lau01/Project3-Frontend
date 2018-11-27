import React, {Component} from 'react';
// import Dropdown from 'react-dropdown'
// import 'react-dropdown/style.css'


// import SearchResults from '../components/SearchResults'
// import axios from 'axios';

class SearchTrip extends Component {
  constructor() {
    super();
    this.state = {
      origin: '',
      destination: '',
      // timeType: '',
      // timeValue: '',
      // timeNum: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    // this._onSelect = this._onSelect.bind(this);
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value})
  }

  handleSubmit(event) {
    const {
      origin,
      destination,
      // timeValue,
      // timeNum
    } = this.state
    
    this.props.history.push(`/search/${origin}/${destination}`)
    event.preventDefault();
  }

  // _onSelect(event) {
  //   this.setState({
  //     timeType: event.label,
  //     timeValue: event.value
  //   })
  //   console.log(this.state.timeType)
  // }



  render() {
    // const timeOptions = [
    //   {value: '', label: 'Leave now'},
    //   {value: 'arrival_time', label: 'Arrive at'},
    //   {value: 'departure_time', label: 'Depart at'},
    // ]
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
{/*
          <Dropdown options={timeOptions} onChange={this._onSelect} value={this.state.timeType} placeholder="Select an option" />       */}

        </form>

      </div>
    )
  }
}

export default SearchTrip;
