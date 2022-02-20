import React from 'react';
import ReactDOM from 'react-dom';
import { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import history from '../history';



/* important note on bootstrap modal:
 so i busted my ass off to find a way to trigerring modal on component load ,while using bootstrap cdn and
 traditional jsx and classes.but nothing worked out.so i had to install react-bootstrap via npm.but by the looks of it
 it does not offer those out of the box functionality like clicking outside of modal to be closed
 and we have to do it manually in component.
 by the way showing modal by default in react-bootstrap is as simple as show={true} attr in Modal component*/
const MyModal = (props)=>{

    const [modalShow,setModalShow] = useState(true)
 
    return ReactDOM.createPortal(
        <div onClick={()=>history.push('/')}>
        <Modal onClick={(e)=>e.stopPropagation()}show={true}>
      <Modal.Header>{props.title}</Modal.Header>
      <Modal.Body>{props.content}</Modal.Body>
      <Modal.Footer>
          <Link to='/' className='btn btn-secondary'>close</Link>
          <button onClick={props.onDeleteClick} className='btn btn-danger'>delete!</button>
      </Modal.Footer>
    </Modal>
        </div>,document.getElementById('modal')
    )

}

export default MyModal