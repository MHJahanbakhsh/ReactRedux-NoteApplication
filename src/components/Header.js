import React from 'react';
import { Link } from 'react-router-dom';
import GoogleAuth from './GoogleAuth';

const Header = ()=>{
    return <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <div className="container">
        <Link to='/' className="navbar-brand">Note App</Link>
        <Link to='/' className="navbar-brand ms-auto">all notes</Link> {/*in bootstrap 5 left and right changed to start and end so ml=>ms & mr=>me */}  
        <Link to='/'><GoogleAuth></GoogleAuth></Link>
      
    </div>
  </nav>
}

export default Header