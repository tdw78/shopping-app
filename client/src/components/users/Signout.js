import React, { Component, Fragment } from 'react';
import { NavLink } from 'reactstrap';
import { signOut } from '../../actions/authActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'


export class Signout extends Component {

  static propTypes = {
    signOut: PropTypes.func.isRequired 
  }

  render() {
    return (
      <Fragment>
        <NavLink onClick={this.props.signOut} href="/">
          Sign Out
        </NavLink>
      </Fragment>
    )
  }
}

export default connect(null, {signOut})(Signout);