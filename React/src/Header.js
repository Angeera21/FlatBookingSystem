import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
function Header(){
    return(

  <header style={{'background-color':"red"}} id="aa-header">  
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <div class="aa-header-area">
          <div class="row">
            <div class="col-md-6 col-sm-6 col-xs-6">
              <div class="aa-header-left">
                <div class="aa-telephone-no">
                  <span class="fa fa-phone"></span>
                  03461 255158
                </div>
                <div class="aa-email hidden-xs">
                  <span class="fa fa-envelope-o"></span> contactpod3@test.com
                </div>
              </div>              
            </div>
            <div class="col-md-6 col-sm-6 col-xs-6">
              <div class="aa-header-right">
              <Link class="aa-register" to="/login">Login/Register</Link> 
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</header>
    )
}

export default Header;