import React, {Component} from 'react';
// import {Link} from 'react-router-dom';
import axios from 'axios';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      email: '',
      password: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value})
  }

  handleSubmit(event) {
    axios.post('http://localhost:3000/user/login', {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
    })
    .then(res => {
      axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;

      if( 'localStorage' in window ){
        localStorage.setItem('token', res.data.token);
      }
      this.props.history.push(`/search`)
    })
    .catch(console.warn)

    event.preventDefault();
  }

  render() {
    return(
      <div>
        <h2>Login Page</h2>
        <form onSubmit={this.handleSubmit}>
          <label>
            Username:
            <input
              type="text"
              name="username"
              value={this.state.username}
              onChange={this.handleChange}
            >
            </input>
          </label>

          <label>
            Email:
            <input
              type="email"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
            >
            </input>
          </label>

          <label>
            Password:
            <input
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
            >

            </input>
          </label>

          <input type="submit" value="Login"/>
        </form>
      </div>
    )
  }
}

export default Login;
