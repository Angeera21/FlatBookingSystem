import { useEffect, useState } from "react";
import Header from "./Header";
import {USER_API_URL,FLAT_API_URL} from './AppConst';
import {fetchPost,fetchGet,getUserId} from './AppService';
function UserUpdate(){
  
  const [pincode,setPincode] = useState('');
  const [address,setAddress] = useState('');
  const [rent,setRent] = useState('');
  const [sqft,setSqft] = useState('');
  const [bhk,setBhk] = useState('');

  const [selectedFile,setSelectedFile] = useState('');
  
  const [flatList,setFlatList] = useState([]);

const deleteFlat=(flat)=>{
  alert("need to call server");
/*
*/
}
  const getAll=()=>{

    //rent bhk pincode
    let param = {
      'searchType':''
    }
    fetchPost(FLAT_API_URL+"flat/search",param)
    .then(res=>{
      let user_id = getUserId();
      let filterFlat = res.filter(o=>o.owner_id == user_id)
      //console.log(res)
      setFlatList(filterFlat);
    });
  }
//  const onFileChange = event => {
    
//     // Update the state
//     setSelectedFile({ selectedFile: event.target.files[0] });
  
//   };

  useEffect(()=>{
  //  getAll()
},[])
  

    return(
      <>
        
      <a className="scrollToTop" href="#"><i className="fa fa-angle-double-up"></i></a>
      {/* <Header/> */}
    
    <section id="aa-menu-area">
      <nav className="navbar navbar-default main-navbar" role="navigation">  
        <div className="container">
          <div className="navbar-header">
            
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
          
             {/* <a className="navbar-brand aa-logo" href="index.html"> Home <span>Property</span></a> */}
          
          </div>
          <div id="navbar" className="navbar-collapse collapse">
            <ul id="top-menu" className="nav navbar-nav navbar-right aa-main-nav">
              <li className="active"><a href="/">Logout</a></li>
              
            </ul>                            
          </div>      
        </div>          
      </nav> 
    </section>
   
    <section id="aa-slider">
      <div className="aa-slider-area"> 
        <div className="aa-top-slider">
         
          <div className="aa-top-slider-single">
            <img src="img/slider/3.jpg" alt="img"/>
         
            <div className="aa-top-slider-content">
              <span className="aa-top-slider-catg">Create Flat</span>
              {/* <h2 className="aa-top-slider-title">1560 Square Feet</h2> */}
              {/* <p className="aa-top-slider-location"><i className="fa fa-map-marker"></i>South Beach, Miami (USA)</p>
              <span className="aa-top-slider-off">30% OFF</span>
              <p className="aa-top-slider-price">$460,000</p>
              <a href="#" className="aa-top-slider-btn">Read More <span className="fa fa-angle-double-right"></span></a> */}
            </div>
           
          </div>
          
       
          
        </div>
      </div>
    </section>
    <section id="aa-advance-search">
      <div className="container">
        {/* <div className="aa-advance-search-area">
          <div className="form">
           <div className="aa-advance-search-top">
              <div className="row">
                <div className="col-md-4">
                  <div className="aa-single-advance-search">
                    <input type="text" placeholder="Type Your Pincode"/>
                  </div>
                </div>
               
              
               
                <div className="col-md-2">
                  <div className="aa-single-advance-search">
                    <input className="aa-search-btn"  type="submit" value="Search"/>
                  </div>
                </div>
              </div>
            </div>
           <div className="aa-advance-search-bottom">
             <div className="row">
              <div className="col-md-6">
                <div className="aa-single-filter-search">
                  <span>AREA (SQ)</span>
                  <span>FROM</span>
                  <span id="skip-value-lower" className="example-val">30.00</span>
                  <span>TO</span>
                  <span id="skip-value-upper" className="example-val">100.00</span>
                  <div id="aa-sqrfeet-range" className="noUi-target noUi-ltr noUi-horizontal noUi-background">
                  </div>                  
                </div>
              </div>
              <div className="col-md-6">
                <div className="aa-single-filter-search">
                  <span>PRICE ($)</span>
                  <span>FROM</span>
                  <span id="skip-value-lower2" className="example-val">30.00</span>
                  <span>TO</span>
                  <span id="skip-value-upper2" className="example-val">100.00</span>
                  <div id="aa-price-range" className="noUi-target noUi-ltr noUi-horizontal noUi-background">
                  </div>      
                </div>
              </div>
            </div>  
           </div>
          </div>
        </div> */}
      </div>
    </section>
    
    
    <section id="aa-latest-property">
      <div className="container">
        <div className="aa-latest-property-area">
          <div className="aa-title">
            <h2>Update Details</h2>
            <span></span>
                   
          </div>
          <div className="aa-latest-properties-content">
            <div className="row">
            <div className="col-md-6">
          <div className="aa-signin-area">
            <div className="aa-signin-form">
              
              
             
          <form className="contactform">                                                 
                {/* <div className="aa-single-field">
                  <label for="name">Name <span className="required">*</span></label>
                  <input type="text" required="required" aria-required="true" value="" name="name"/>
                </div> */}
                <div className="aa-single-field">
                  <label for="email">Picture <span className="required">*</span></label>
                  <input type="file" class="form-control" onChange={(e)=>onFileChange(e.target.value)} />
                </div>
                <div className="aa-single-field">
                  <label for="email">Sqft <span className="required">*</span></label>
                  <input type="email" class="form-control" onChange={(e)=>setSqft(e.target.value)} name="email"/>
                </div>
                <div className="aa-single-field">
                  <label for="password">Rent <span className="required">*</span></label>
                  <input type="email"class="form-control" onChange={(e)=>setRent(e.target.value)} name="email"/>
              </div>

                <div className="aa-single-field">
                  <label for="password">Address <span className="required">*</span></label>
                  <input type="text" class="form-control"onChange={(e)=>setAddress(e.target.value)} name="password"/> 
                </div>   
                
                <div className="aa-single-field">
                  <label for="password">Pincode <span className="required">*</span></label>
                  <input type="text" class="form-control" onChange={(e)=>setPincode(e.target.value)} name="password"/> 
                </div>  
                <div className="aa-single-field">
                  <label for="password">BHk <span className="required">*</span></label>
                  <input type="text" class="form-control" onChange={(e)=>setBhk(e.target.value)} name="password"/> 
                </div>           
                <div className="aa-single-submit">
                  <input type="button"  class="btn btn-primary mb-3" onClick={createFlat} value="Create Flat" name="submit"/>                    
                </div>
              </form>
              </div>
            </div>
            </div>
              
              
              
             
            </div>
          </div>
          <div className="aa-latest-properties-content">
            <div className="row">
           
           
             
            </div>
          </div>
        </div>
      </div>
    </section>
   
    
    
    
    
    
    <footer id="aa-footer">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
          <div className="aa-footer-area">
            <div className="row">
              <div className="col-md-3 col-sm-6 col-xs-12">
                <div className="aa-footer-left">
                 <p>Designed by <a rel="nofollow" href="http://www.markups.io/">MarkUps.io</a></p>
                </div>
              </div>
              <div className="col-md-3 col-sm-6 col-xs-12">
                <div className="aa-footer-middle">
                  <a href="#"><i className="fa fa-facebook"></i></a>
                  <a href="#"><i className="fa fa-twitter"></i></a>
                  <a href="#"><i className="fa fa-google-plus"></i></a>
                  <a href="#"><i className="fa fa-youtube"></i></a>
                </div>
              </div>
              <div className="col-md-6 col-sm-12 col-xs-12">
                <div className="aa-footer-right">
                  <a href="#">Home</a>
                  <a href="#">Support</a>
                  <a href="#">License</a>
                  <a href="#">FAQ</a>
                  <a href="#">Privacy & Term</a>
                </div>
              </div>            
            </div>
          </div>
        </div>
        </div>
      </div>
    </footer>
    </>
        
    )
}
export default UserUpdate;