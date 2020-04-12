import React, { Component, Fragment } from 'react';
import { Container, ListGroup, ListGroupItem } from 'reactstrap';
import { connect } from 'react-redux';
import { getItems, deleteItem, addItem, getItem, updateItem,
        deleteAll } from '../actions/itemActions';
import PropTypes from 'prop-types';
import { isAuth } from "./users/helpers"
import io from 'socket.io-client';
import ConfirmModal from "./ConfirmModal";

import { Button, Form, FormGroup, Input, Alert } from 'reactstrap';


class ShoppingList extends Component {
  constructor(){
    super();
      this.state = {
        name: '',
        quantity: 1,
        userId: isAuth().id,
        user: isAuth().name,
        isInEditMode: false,
        itemStatus: false,
        error: ""
     }
   }

  static propTypes = {
    getItems: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired
  }

  componentDidMount(){
    this.socket = io('http://localhost:5000', {
      transports: ["websocket", "polling" ]
   });

    this.socket.on('new item', newItem => {
      this.props.addItem(newItem);
   })
    
    this.socket.on('updated item', msg => {
      this.props.updateItem(msg, msg._id);
      this.props.getItems(this.state.userId);
   })

    this.socket.on('deleted item', msg => {
      this.props.deleteItem(msg);
      this.props.getItems(this.state.userId);
   })

    this.props.getItems(this.state.userId);
  }

  onDeleteClick = (id) => {
    this.socket.emit('deleted item', id)
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit = (e) => {
    e.preventDefault();

    if(this.state.name === '' && this.state.quantity < 1 ){
      this.setState({
        error: "Please add valid item name and quantity"
      })
    } else if(this.state.quantity < 1 ){
      this.setState({
        error: "Quantity must be more than 0"
      })
    } else if(this.state.name === ''){
      this.setState({
        error: "Please add item name"
      })
    } else {
      this.setState({
        error: ""
      })
    const newItem = {
      name: this.state.name,
      quantity: this.state.quantity,
      userId: this.state.userId
    };

    this.socket.emit('new item', newItem)
    this.setState({ name: "", quantity: 1})
   }
 }

  updateItem = (id, status) => {
    this.setState({
      isInEditMode: false
    })
    
    const updatedItem = {
      _id: id,
      name: this.state.name,
      quantity: this.state.quantity,
      userId: this.state.userId,
      status: status
    };

    this.socket.emit('updated item', updatedItem)
    this.setState({ name: "", quantity: 1})
  }

  onEditClick = (id, name, quantity) => {
  
    this.setState({
      isInEditMode: true,
      name: name,
      quantity: quantity
    })
    this.props.getItem(id)
  }

  changeEditMode = () => {
    this.setState({
      isInEditMode: !this.state.isInEditMode
    });
    this.setState({
      name: ''
    })
    this.props.getItems(this.state.userId)
  }

  toggleStatus = (id, name, quantity, status) => {
    if(status === "Not in cart"){
    const item = {
      _id: id,
      name: name,
      quantity: quantity,
      userId: this.state.userId,
      status: "In cart"
    };
      this.socket.emit('updated item', item)

    } else {
      const item = {
        _id: id,
        name: name,
        quantity: quantity,
        userId: this.state.userId,
        status: "Not in cart"
    };
     this.socket.emit('updated item', item)
   }
     this.setState({ name: "", quantity: 1})
  }

  render () {

   const buttonStyles = {
    color: "#0000CD",
    fontFamily: "Georgia",
    fontSize: '12px',
    backgroundColor: "#B68DC6"
  }
    const {items} = this.props.item;
    
    return(
      <div className="jumbotron">
        <React.Fragment>
          <h1 className="text-center" style={{fontFamily: "Georgia", fontSize: '44px', color:"#37505C"}} >{this.state.user}'s Shopping List</h1>
            <br></br>       
            <Container>

              <div className="row">
                <div className="col-sm-3"></div>
                  <div className="col-sm-6 text-center">
                    <ul class="list-group">
                      {items.map(({ _id, name, quantity, status }) => (
                        <li class="list-group-item list-group-item-secondary">
                          <React.Fragment>
                            <Button 
                              className="status-btn"
                              size="sm"
                              style={{paddingRight: '11px', paddingLeft: '11px',  backgroundColor: "#7F3364", fontFamily: "Georgia", color: "#EFE8E8", marginRight: '4rem'}}
                              onClick={this.toggleStatus.bind(this, _id, name, quantity, status)}
                            > {status} </Button>

                              <span style={{marginRight: '2rem', fontFamily: "Georgia", fontSize: '28px', color:"#7F3364" }}>{name}</span>
                              <span style={{fontFamily: "Georgia", fontSize: '28px', color:"#7F3364", marginRight: '3rem'}}>{quantity}</span> 
                 
                            <Button
                              className="btn btn-info"
                              size="sm"
                              style={{buttonStyles, paddingRight: '22px', paddingLeft: '22px'}}
                              onClick={this.onEditClick.bind(this, _id, name, quantity)}
                            > Edit </Button>

                            <button
                              className="btn btn-light"
                              size="sm"  
                              style={{fontFamily: "Georgia", fontSize: '14px', color:"#190A14", padding: '5px', backgroundColor: "#909580", marginLeft: '2rem' }} 
                              onClick={this.onDeleteClick.bind(this, _id)}
                            > Remove </button>
               
                             {this.state.isInEditMode ?
                               <form>
                                 <input type="text" 
                                   onChange={this.onChange} 
                                   name='name' 
                                   defaultValue={this.state.name} />
                        
                                 <input type="text" 
                                   onChange={this.onChange}  
                                   name='quantity' 
                                   defaultValue={this.state.quantity} />
                        
                                 <button onClick={this.updateItem.bind(this, _id, status)}> OK </button> 
                                 <button onClick={this.changeEditMode}> Cancel </button>                  
                               </form>
                                 : null }

                          </React.Fragment>
                        </li>
                      ))}  
                    </ul>      
                  </div>   
                  <div className="col-sm-3"></div>
                </div>
          
                <div className="row">
                  <div className="col-sm-3"></div>
                    <div className="col-sm-6 text-center">
                      {this.state.error ? <Alert color="danger">{this.state.error}</Alert> : null}
    
                      {!this.state.isInEditMode ?    
                        <div>
                          <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                              <div className="form-row text-left">
                                <div className="col">
                                  <label className="text-muted" style={{color:"#37505C", fontFamily: "Georgia"}}>Item Name</label>
                                  <Input type="text" 
                                    name="name" id="item" 
                                    value={this.state.name}
                                    placeholder="Enter item name"
                                    onChange={this.onChange} />
                                </div>
                                <div className="col">
                                  <label className="text-muted" style={{color:"#37505C", fontFamily: "Georgia"}}>How Many?</label>
                                  <Input type="number" 
                                    name="quantity" 
                                    id="quantity" 
                                    value={this.state.quantity}
                                    onChange={this.onChange} />
                                </div>
                              </div>
                            </FormGroup>
               
                            <FormGroup>
                              <Button
                                style = {{ fontFamily: "Georgia", 
                                fontSize: '16px', 
                                color:"#37505C",
                                marginTop: '2rem',
                                color: 'white'
                              }}
                                block
                              > Add Item </Button>
                            </FormGroup>        
                          </Form> 
                          <Form>
                            <FormGroup>
                              <ConfirmModal />
                            </FormGroup>
                          </Form> 
                        </div>
                          : null }
                      </div>
                    <div className="col-sm-3"></div>
                  </div>
                </Container>
              </React.Fragment>
            </div>
      )
    }
  }

const mapStateToProps = (state) => ({
  item: state.item
});

export default connect(mapStateToProps, {getItems, getItem, deleteItem, addItem, updateItem, deleteAll })(ShoppingList);