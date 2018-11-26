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
      axios.post('http://localhost:3000/users', {
        username: this.state.username,
        email: this.state.email,
        password: this.state.password,
      })
      .then(res => {
        console.log('signup')
      })
      .catch(console.warn)
    // }

    event.preventDefault();
  }

  render() {
    return(
      <div>
        <h2>Sign Up</h2>
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

          <input type="submit" value="Sign up"/>
        </form>
      </div>
    )
  }
}

export default SignUp;
