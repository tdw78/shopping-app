import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { isAuth } from "./helpers";
import { signUp } from '../../actions/authActions';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {Alert} from 'reactstrap';

class Signup extends Component {
  constructor(props){
    super(props);
      this.state = {
        name: '',
        email: '',
        password: '',
        passwordConfirmation: '',
        msg: null
      }
    }

  static propTypes = {
    signUp: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    error: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool
  }

  componentDidUpdate(prevProps){
    const {error} = this.props;
    if(error !== prevProps.error) {
      if(error.id === 'SIGNUP_FAIL'){
        this.setState({msg: error.msg.msg})
      }else{
        this.setState({msg: null})
      }
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }
  
  clickSubmit = (e) => {
    e.preventDefault();
    const user = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      passwordConfirmation: this.state.passwordConfirmation
    }
    this.props.signUp(user);
    this.setState({
      name: "",
      email: "",
      password: "",
      passwordConfirmation: ""
    })
  }
  
  render() {
    const labelStyles = {
      color:"#37505C",
      fontFamily: "Georgia"
    }
    
    return (
      <div className="jumbotron">
      <div className="col-md-6 offset-md-3">
       
        { isAuth() ? <Redirect to='/' /> : null}
        <h1 className="p-5 text-center" style={{fontFamily: "Georgia", fontSize: '44px', color:"#37505C"}}> Create an Account </h1>
        {this.state.msg ? <Alert color="danger">{this.state.msg}</Alert> : null}
        <form>
          <div className="form-group">
            <label className="text-muted" style={{labelStyles}}>Name</label>
            <input type="text"
              onChange={this.onChange} 
              name="name" 
              className="form-control" />
          </div>

          <div className="form-group">
            <label className="text-muted" style={{labelStyles}}>Email</label>
            <input type="email" 
              onChange={this.onChange} 
              name="email"
              className="form-control" />
          </div>

          <div className="form-group">
            <label className="text-muted" style={{labelStyles}}>Password</label>
            <input type="password"
              onChange={this.onChange} 
              name="password"
              className="form-control" />
          </div>

          <div className="form-group">
            <label className="text-muted" style={{labelStyles}}>Confirm Password</label>
            <input type="password" 
              onChange={this.onChange} 
              name="passwordConfirmation"
              className="form-control" />
          </div>

          <div>
            <button className="btn btn-primary" onClick={this.clickSubmit}>Submit</button>
          </div>
        </form>      
      </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  error: state.error
});

export default connect(mapStateToProps, {signUp})(Signup);