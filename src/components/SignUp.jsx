import React, {Component} from 'react';
import axios from 'axios';

class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      email: '',
      password: '',
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value})
  }

  handleSubmit(event) {
    console.log('submit...')

    // if (this.state.username && this.state.email && this.state.password) {
    // axios.post('http://localhost:3000/user/signup', {
      axios.post('https://plan-trip.herokuapp.com/user/signup', {
        username: this.state.username,
        email: this.state.email,
        password: this.state.password,
      })
      .then(res => {
        console.log('signup', res.data);
        // set axios header
        axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
        // store local storage
        if( 'localStorage' in window ){
          localStorage.setItem('token', res.data.token);
          this.props.history.push(`/search`);
        } else {
          this.props.history.push(`/signup`);
        }

      })
      .catch(err => {
        console.warn(err);
      })
    // }

    event.preventDefault();
  }

  render() {
    return(
      <div className="signupContainer">
        <h2>Sign Up</h2>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label className="labelLogin">Username:</label>
            <input
              type="text"
              name="username"
              value={this.state.username}
              onChange={this.handleChange}
            >
            </input>
          </div>

          <div>
            <label className="labelLogin">Email:</label>
            <input
              type="email"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
            >
            </input>
          </div>

          <div>
            <label className="labelLogin">Password:</label>
            <input
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
            >

            </input>
          </div>

          <input type="submit" value="Sign up"/>
        </form>
      </div>
    )
  }
}

export default SignUp;
