import React, { Component, Fragment } from 'react';
import { isAuth } from "./users/helpers"
import {
  Collapse,
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  Container,
  NavLink
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Signout from './users/Signout';


class NavBar extends Component {

  static propTypes = {
    auth: PropTypes.object.isRequired
  }

  render(){
    return (
      <div>
        <Navbar color="primary" dark expand="sm" className="mb-12">
          <Container>
            <NavbarBrand href="/">Home</NavbarBrand>
         
            <Collapse navbar style={{ fontSize: '19px'}}>
              <Nav className="ml-auto" navbar>
                
                { !isAuth() ? 
                  <Fragment>
                    <NavItem>
                      <NavLink href="/signup">Sign Up</NavLink>
                    </NavItem>
           
                    <NavItem>
                      <NavLink href="/signin">Sign In</NavLink>
                    </NavItem>
                  </Fragment>
                 : 
                  <Fragment>
                    <NavItem>
                      <NavLink href="/list">Your Shopping List</NavLink>
                    </NavItem>
             
                    <NavItem>
                      <Signout />
                    </NavItem>
                  </Fragment>
                  }
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
      </div>
    ) 
  }
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, null)(NavBar);

