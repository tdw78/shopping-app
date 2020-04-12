import React, {Component} from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody
} from 'reactstrap';
import { connect } from 'react-redux';
import { deleteAll } from '../actions/itemActions';
import { isAuth } from "./users/helpers"
import PropTypes from 'prop-types';

class ConfirmModal extends Component {
  constructor(props){
    super(props);
    this.state = {
      modal: false,
      userId: isAuth().id
    }
  }

  static propTypes = {
    deleteAll: PropTypes.func.isRequired
  }

  toggle = () => {
    this.setState({
    modal: !this.state.modal
   });
 }

  delete = (e) => {
    e.preventDefault();
    this.props.deleteAll(this.state.userId);
    this.toggle();
 }

  render(){
    return (
      <div>
        <Button
          color="danger"
          style={{marginBottom: '2rem'}}
          onClick={this.toggle}
          block
        >Delete All Items</Button>

        <Modal isOpen={this.state.modal}>
          <ModalHeader>Are you sure that you want to delete all of your items?</ModalHeader>
            <ModalBody> 
              <div class="modal-footer">
                <button type="button" onClick={this.delete} class="btn btn-primary">Yes, please</button>
                <button type="button" onClick={this.toggle} class="btn btn-secondary" data-dismiss="modal">Cancel</button> 
              </div>
           
            </ModalBody>
        </Modal>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  item: state.item
});

export default connect(mapStateToProps, {deleteAll})(ConfirmModal);