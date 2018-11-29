import React, {Component} from 'react';

class AddTrip extends Component {
  constructor() {
    super();

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(props) {
    this.props.onClick()
  }

  render() {
    if(window.localStorage.getItem('token')){

    } else {
      this.props.history.push(`/login`);
    }
    return(
      <div>
        <button onClick={this.handleClick}>Add +</button>
      </div>
    )
  }
}

export default AddTrip;
