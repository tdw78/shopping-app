import React, { Component } from 'react';
import { isAuth } from "./users/helpers"


class HomePage extends Component {
  render() {
    return (

      <div className="jumbotron">
        <h1 className="display-4">Ethan's Shopping App</h1>
        <h3>Share the list and save time shopping.</h3>
        {isAuth() ? <h4>Hello, {isAuth().name}. Welcome back!</h4> : null}
        <hr className="my-4" />
        <p>We want to help you spend less time in the grocery store.</p>
        <a className="btn btn-primary btn-lg" href="/signup" role="button">Start Now</a>
      </div>

    );
  }
}

export default HomePage;