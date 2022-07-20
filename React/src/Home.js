import { useEffect, useState } from "react";
import Header from "./Header";
import {USER_API_URL,FLAT_API_URL} from './AppConst';
import {fetchPost,fetchPatch,getUserId, fetchDelete} from './AppService';
function Home(){
  const [flatList,setFlatList] = useState([]);
  const [myBookList,setMyBookList] = useState([]);
  const [flatSearchList,setFlatSearchList] = useState([]);
  const [email,setEmail] = useState('');
  const [pwd,setPwd] = useState('');
  const [re_pwd,setRe_Pwd] = useState('');
  const [pageError,setPageError]=useState({});
  const [name,setName] = useState('');

  const [pincode,setPincode] = useState('');
  const [searchType,setSearchType] = useState('');
  const [searchVal,setSearchVal] = useState('');
  const [pageType,setPageType]=useState('search');

  const clearSearch=()=>{
    setSearchVal('');
    setSearchType('');
    searchFlat();
  }
  const loginValidation=()=>{
    let status = false;
    let error = {};
    if(email == ""){
      status = true;
      error.email = true;
    }
    if(name == ""){
      status = true;
      error.name = true;
    }
    setPageError(error);
    return status;
  }
  const userUpdaetDetails=()=>{
    if(loginValidation()){
      return;
    }
    let param = {
      "id":getUserId(),
      'name':name,
      'email':email
    }
    fetchPatch(USER_API_URL+"user/updateUserById",param)
    .then(res=>{
      alert("User details updated!");
    }).catch(err=>{
      err.then(er=>{
        alert(er['message']);
        //console.log(er);
      })    });
  }
  const updatePassword=()=>{
    let status = false;
    let error = {};
    if(pwd == ""){
      status = true;
      error.pwd = true;
    }if(re_pwd == ""){
      status = true;
      error.re_pwd = true;
    }if(re_pwd != pwd){
      status = true;
      error.pwd_same = true;
    }
    setPageError(error);
    if(status){
      //due to error flow ll stop here,
      return;
    }
   
    let param = {
      "id":getUserId(),
      'password':pwd
    }
    fetchPost(USER_API_URL+"user/updatePassword",param)
    .then(res=>{
      alert("updated");
    }).catch(err=>{
      err.then(er=>{
        alert(er['message']);
        //console.log(er);
      })    });
  }
  const changePageType=(type)=>{
    setPageType(type);
  }
  const searchFlat2=()=>{
    if(searchType == "" || searchVal == ""){
      alert("Please enter value and type.");
      return;
    }
    let flatListtmp = [];
    if(searchType == "rent"){
      flatListtmp = flatSearchList.filter(o=>o[searchType] > searchVal);
    }else{
      console.log(searchType+"--"+searchVal);
      flatListtmp = flatSearchList.filter(o=>o[searchType] == searchVal);
    }
    
    setFlatList(flatListtmp);
  }
  const searchFlat=()=>{

    //rent bhk pincode
    let param = {
      'searchType':searchType,
      'searchValue':searchVal
    }
    fetchPost(FLAT_API_URL+"flat/search",param)
    .then(res=>{
      let user_id = getUserId();
      let res_tmp = res.filter(o=>o.isApproved==1);
      let myBookTmp  = res.filter(o=>o.bookModel?.user_id==user_id);
      console.log(res_tmp)
      setFlatList(res_tmp);
      setFlatSearchList(res_tmp);
      setMyBookList(myBookTmp);
    });
  }
  const cancelBook=(book)=>{
   
    if(!window.confirm("Do you want to cancel this booking?")){
      return;
    }
   
    fetchDelete(FLAT_API_URL+"flat/booking/delete/"+book.bookModel.id)
    .then(res=>{
      alert("Flat booking cancelled!");
      searchFlat();//refresh flat
      //setFlatList(res);
    }).catch(err=>{
      err.then(er=>{
        alert(er['message']);
        //console.log(er);
      })
    }) 
  }
  const bookFlat=(flat)=>{
    if(flat.bookModel !=null && flat.bookModel.hasOwnProperty("id")){
      alert("FLat is booked");
      return;
    }
    if(!window.confirm("Do you want to book this flat?")){
      return;
    }
    let param = {
      "userId":parseInt(getUserId()),
      "id":flat.id
    }
    fetchPost(FLAT_API_URL+"flat/booking",param)
    .then(res=>{
      alert("Flat booked successfully!");
      searchFlat();//refresh flat
      console.log(res);
      //setFlatList(res);
    }).catch(err=>{
      err.then(er=>{
        alert(er['message']);
        //console.log(er);
      })
    })    ;
  }
  useEffect(()=>{
      searchFlat()
  },[])


  const userUpdate =()=>{
    return (<section  className="update-form-wrapper">
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div className="aa-signin-area">
            <div className="aa-signin-form">
              <div className="aa-signin-form-title">
              <div className="aa-title">
          <h2>Update My details</h2>
          <span></span>
        </div>
              </div>
              <form className="contactform">                                                 
               
                <div className="aa-single-field">
                  <label for="email">Name<span className="required">*</span></label>
                  <input class="form-control" type="Name" onChange={(e)=>setName(e.target.value)} name="email"/>
                  {pageError['name']?<span className='error_field_input'> Name field should not be empty</span>:''}

                </div>
                <div className="aa-single-field">
                  <label for="email">Email<span className="required">*</span></label>
                  <input class="form-control" type="email" onChange={(e)=>setEmail(e.target.value)} name="email"/>
                  {pageError['email']?<span className='error_field_input'> Email field should not be empty</span>:''}

                </div>
                <br></br>
                <div className="aa-single-submit">
                  <input type="button" class="form-control btn btn-primary"  onClick={userUpdaetDetails} value="Update Account" name="submit"/>                    
                </div>
                
                
                
              </form>
              <form className="contactform">                                                 
               
                <div className="aa-single-field">
                  <label for="password">Password <span className="required">*</span></label>
                  <input class="form-control"  type="password" onChange={(e)=>setPwd(e.target.value)} name="password"/> 
                  {pageError['pwd']?<span className='error_field_input'>Password field should not be empty</span>:''}

                </div>
               
                <div className="aa-single-field">
                  <label for="confirm-password">Confirm Password <span className="required">*</span></label>
                  <input class="form-control"  type="password" onChange={(e)=>setRe_Pwd(e.target.value)} name="confirm-password"/> 
                  {pageError['re_pwd']?<span className='error_field_input'>Confirm Password should not be empty</span>:''}
                  {pageError['pwd_same']?<span className='error_field_input'>Confirm Password and password should be same</span>:''}

                </div>
                <br></br>

                <div className="aa-single-submit">
                  <input type="button" class="form-control btn btn-primary" onClick={updatePassword} value="Update Password" name="submit"/>                    
                </div>
                
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>);
  }

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
 
 <div>
  <section id="aa-slider">
    <div className="aa-slider-area"> 
      <div className="aa-top-slider">
       
        <div className="aa-top-slider-single">
          <img src="img/slider/3.jpg" alt="img"/>
       
          <div className="aa-top-slider-content">
            <span className="aa-top-slider-catg">Premium Property</span>
            <h2 className="aa-top-slider-title">1500 Square Feet</h2>
            <p className="aa-top-slider-location"><i className="fa fa-map-marker"></i>Jadavpur, Kolkata (IN)</p>
            <span className="aa-top-slider-off">10% OFF</span>
            <p className="aa-top-slider-price">Rs 20,000</p>
            <a href="#" className="aa-top-slider-btn">Read More <span className="fa fa-angle-double-right"></span></a>
          </div>
         
        </div>
        
     
        
      </div>
    </div>
  </section>
  <section id="aa-advance-search">
    <div className="container">
      <div className="aa-advance-search-area">
        <div className="form">
         <div className="aa-advance-search-top">
            <div className="row">
              <div className="col-md-4">
                <div className="aa-single-advance-search">
                  <input value={searchVal} onChange={(e)=>setSearchVal(e.target.value)} type="text" placeholder="Type Your Value"/>
                </div>
              </div>
              <div className="col-md-4">
                <div className="aa-single-advance-search">
                  <select value={searchType} onChange={(e)=>setSearchType(e.target.value)}>
                  <option value="">select Type</option>
                    <option value="pincode">Pincode</option>
                    <option value="bhk">Bhk</option>
                    <option value="rent">Rental Price</option>
                  </select>
                </div>
              </div>
            
             
              <div className="col-md-4">
              <div className="row">
              <div className="col-md-4">
              <div className="aa-single-advance-search">
                  <input className="aa-search-btn"  onClick={searchFlat2} type="button" value="Search"/>
                </div>
              </div>
              <div className="col-md-4">
              <div className="aa-single-advance-search">
                  <input className="aa-search-btn" onClick={clearSearch} type="button" value="Clear"/>
                </div>
              </div>
              </div>
            
               
              </div>
            </div>
          </div>
         <div className="aa-advance-search-bottom">
           <div className="row">
            {/* <div className="col-md-6">
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
            </div> */}
          </div>  
         </div>
        </div>
      </div>
    </div>
  </section>
  
  
  <section id="aa-latest-property">
    <div className="container">
      <div className="aa-latest-property-area">
        <div className="aa-title">
          <h2>Latest Properties</h2>
          <span></span>
        </div>
        <div className="aa-latest-properties-content">
          <div className="row">
          {
                (flatList.length) ==0?<h1>No Flats Found</h1>:""}
            {
                flatList && flatList.map((obj,index)=>(
                      <div key={index} className="col-md-4">
                      <article className="aa-properties-item">
                        <a href="#" className="aa-properties-item-img">
                          <img  src={FLAT_API_URL+'flat/imgRead/'+obj.imgName} alt="img"/>
                        </a>
                        <div className="aa-tag for-sale">
                          {obj.bookModel == null?"For Rent":'Booked'}
                          
                        </div>
                        <div className="aa-properties-item-content">
                          <div className="aa-properties-info">                           
                            <span>{obj.bhk} BHK</span> 
                            <span>{obj.sqft} SQ FT</span>
                          </div>
                          {/* <div className="aa-properties-about">
                           
                            <p></p>                      
                          </div> */}
                          <div className="aa-properties-detial">
                            <span className="aa-price">
                            Rent is Rs {obj.rent}
                            </span>
                           
                            {/* <a href="#" className="aa-secondary-btn">View Details</a> */}
                          </div>
                          <div className="aa-properties-detial">
                          <span className="aa-price">
                            Pincode {obj.pincode}
                            </span>&nbsp;&nbsp;
                            <button onClick={()=>bookFlat(obj)} className="aa-secondary-btn">Book</button>
                          </div>
                        </div>
                      </article>
                    </div>
                    
                ))
            }
           
            
            
            
            
           
          </div>
        </div>
      </div>
    </div>
  </section>
 
  
  <section id="aa-latest-property">
    <div className="container">
      <div className="aa-latest-property-area">
        <div className="aa-title">
          <h2>My Booking</h2>
          <span></span>
        </div>
        <div className="aa-latest-properties-content">
          <div className="row">
          {
                (myBookList.length) ==0?<h1>No Booking Found</h1>:""}
            {
                myBookList && myBookList.map((obj,index)=>(
                      <div key={index} className="col-md-4">
                      <article className="aa-properties-item">
                        <a href="#" className="aa-properties-item-img">
                          <img  src={FLAT_API_URL+'flat/imgRead/'+obj.imgName} alt="img"/>
                        </a>
                        {/* <div className="aa-tag for-sale">
                        
                          
                        </div> */}
                        <div className="aa-properties-item-content">
                          <div className="aa-properties-info">                           
                            <span>{obj.bhk} BHK</span> 
                            <span>{obj.sqft} SQ FT</span>
                          </div>
                          {/* <div className="aa-properties-about">
                           
                            <p></p>                      
                          </div> */}
                          <div className="aa-properties-detial">
                            <span className="aa-price">
                            Rent is Rs {obj.rent}
                            </span>
                           
                            {/* <a href="#" className="aa-secondary-btn">View Details</a> */}
                          </div>
                          <div className="aa-properties-detial">
                          <span className="aa-price">
                            Pincode {obj.pincode}
                            </span>&nbsp;&nbsp;
                            <button onClick={()=>cancelBook(obj)} className="aa-secondary-btn">Cancel Booking</button>
                          </div>
                        </div>
                      </article>
                    </div>
                    
                ))
            }
           
            
            
            
            
           
          </div>
        </div>
      </div>
    </div>
  </section>
  </div>
{userUpdate()}
  <div>

  <br></br>
    
  </div>
  
  <footer id="aa-footer">
    <div className="container">
      <div className="row">
        <div className="col-md-12">
        <div className="aa-footer-area">
          <div className="row">
            <div className="col-md-3 col-sm-6 col-xs-12">
              <div className="aa-footer-left">
               <p>Designed by <a rel="nofollow" href="#">084-Pod3</a></p>
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
export default Home;