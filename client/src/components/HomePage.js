import React, { Component } from 'react';
import { isAuth } from "./users/helpers"


class HomePage extends Component {
  render() {
    return (

      <div className="jumbotron">
        <h1 className="display-4" style={{fontFamily: "Georgia", color:"#37505C"}} >The Shopping App</h1>
        <h3 style={{fontFamily: "Georgia", color:"#37505C"}}>Share the list and save time shopping.</h3>
        {isAuth() ? <h4 style={{fontFamily: "Georgia", color:"#37505C"}}>Hello, {isAuth().name}.</h4> : null}
        <hr className="my-4" />
        <p style={{fontFamily: "Georgia", color:"#37505C"}}>We want to help you spend less time in the grocery store.</p>
        <a className="btn btn-primary btn-lg" href="/signup" role="button">Start Now</a>
      </div>

    );
  }
}

export default HomePage;