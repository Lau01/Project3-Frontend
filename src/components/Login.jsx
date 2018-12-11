import React, {Component} from 'react';
import { Button as GrommetButton } from 'grommet';
import axios from 'axios';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // On change event for storing state of email / password fields
  handleChange(event) {
    this.setState({[event.target.name]: event.target.value})
  }

  handleSubmit(event) {
    // axios.post('http://localhost:3000/user/login', {
    axios.post('https://plan-trip.herokuapp.com/user/login', {
      email: this.state.email,
      password: this.state.password,
    })
    .then(res => {
      // set axios headers from now on to have the Bearer <token> field
      axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;

      // store and set the JWT token in local storage
      if( 'localStorage' in window ){
        localStorage.setItem('token', res.data.token);
        this.props.history.push(`/search`);
      } else {
        this.props.history.push(`/login`);
      }
    })
    .catch(console.warn)

    event.preventDefault();
  }

  render() {
    return(
      <div className="loginContainer">
        <h2>Login Page</h2>
        <form onSubmit={this.handleSubmit}>
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
          <GrommetButton
            label="Login"
            type="submit"
            margin={{"left":"150px"}}
          />
        </form>
      </div>
    )
  }
}

export default Login;
