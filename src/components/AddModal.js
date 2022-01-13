import React, { Component, useState, useEffect } from 'react';
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import IconButton from './IconButton.js'

function AddModal(props) {
    var handleSubmit = props.handleSubmit;

    const [state, setState] = useState({name: "", description: "", qty: "0"});
    const [show, setShow] = useState(false);
    const handleClose = () => {
        setShow(false);
        setState({name: "", description: "", qty: "0"});
    }
    const handleShow = () => setShow(true);

    function handleChange(event) {
        const value = event.target.value;
        const name = event.target.name;
        setState({
            ...state,
            [name]: value
        });
    }

    function handleSubmitModal(event) {
        handleSubmit(state.name, state.description, state.qty);
        handleClose();
    }

    return (
      <>
        <IconButton icon = {faPlus} func={handleShow}/>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <Form.Group>
                  <Form.Label>Name: </Form.Label>
                  <Form.Control type="text" name = "name" minLength = "1" onChange={handleChange} value={state.name}/> 
                  <Form.Label>Description: </Form.Label>
                  <Form.Control type="text" name ="description" minLength = "1" onChange={handleChange} value={state.description}/> 
                  <Form.Label>Quantity: </Form.Label>
                  <Form.Control type="number" name = "qty" minLength = "1" onChange={handleChange} min = "0" value={state.qty}/> 
              </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleSubmitModal}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
  
export default AddModal;