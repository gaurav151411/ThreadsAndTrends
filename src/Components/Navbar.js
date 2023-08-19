import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component{
    render() {
        return (
 
            <nav class="navbar navbar-expand-lg bg-primary">
  <div class="container-fluid" >
    <Link to="/" style={{textDecoration:"none"}}>
    <a class="navbar-brand" href="#" style={{display:"flex"}}>
    <img src="https://cavinkare.com/img/2021/12/Flipkart-Logo-removebg-preview-300x300.png" alt="Logo" width="120" height="80" class="d-inline-block align-text-top"/>
      <h1 style={{color:"#F8E831",marginLeft:"0.5em",marginTop:"0.3em"}}>Threads And Trends</h1>
    </a>
    </Link>
    
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="#">Home</a>
        </li>

        <li class="nav-item dropdown">
          <a style={{color:"black"}}class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Support
          </a>
          <ul class="dropdown-menu" >
            <li><a class="dropdown-item" href="#">Action</a></li>
            <li><a class="dropdown-item" href="#">Another action</a></li>
            <li><hr class="dropdown-divider"/></li>
            <li><a class="dropdown-item" href="#">Something else here</a></li>
          </ul>
        </li>
      
      </ul>
      <form class="d-flex" role="search">
        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
        <button class="btn btn-outline-warning" type="submit">Search</button>
      </form>
    </div>
  </div>
</nav>


               
        )  
    }   
}