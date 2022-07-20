import { useEffect, useState } from "react";
import Header from "./Header";
import {USER_API_URL,FLAT_API_URL,ADMIN_API_URL} from './AppConst';
import {fetchPost,fetchGet, fetchDelete} from './AppService';
function AdminApproval(){
  
  const [flatList,setFlatList] = useState([]);//create state variable.
  const [userList,setUserList] = useState([]);
  const deleteUser=(user)=>{
    if(!window.confirm("Do you want to delete this user?")){
      return;
    }
    fetchDelete(USER_API_URL+"user/deleteUserById/"+user.id)
    .then(res=>{
      alert("user is deleted");
      getAllUser();
      //console.log(res)
    //  setFlatList(res);
    }).catch(err=>{
      err.then(er=>{
        alert(er['message']);
        //console.log(er);
      })
    }) ;
  }
  const getAllUser=()=>{

    //rent bhk pincode
    let param = {
      'searchType':''
    }
    fetchGet(USER_API_URL+"user/get")
    .then(res=>{
      //console.log(res)
      setUserList(res);//setting the user
    }).catch(err=>{
      err.then(er=>{
        alert(er['message']);
        //console.log(er);
      })
    }) ;
  }
  const getAll=()=>{

    //rent bhk pincode
    let param = {
      'searchType':''
    }
    fetchPost(FLAT_API_URL+"flat/search",param)
    .then(res=>{
      //console.log(res)
      setFlatList(res);//setting the flat.json object from server response.
    }).catch(err=>{
      err.then(er=>{
        alert(er['message']);
        //console.log(er);
      })
    }) ;
  }
  const approveOrReject=(approveStatus,flat)=>{
    if(!window.confirm("Do you want to change the status of the flat?")){
      return;
    }
    //rent bhk pincode
    let param = {
      'id':flat.id,
      "isApprove":approveStatus
    }
    //ADMIN_API_URL/admin
    fetchPost(FLAT_API_URL+"flat/approveOrReject",param)
    .then(res=>{
      //console.log(res)
      getAll();
    }).catch(err=>{
      err.then(er=>{
        alert(er['message']);
        //console.log(er);
      })
    }) ;
  }


  //react hook. will be called when the page is being loaded.only once.
  useEffect(()=>{
    getAll();
    getAllUser();
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
              <span className="aa-top-slider-catg">Welcome Admin</span>
              
            </div>
           
          </div>
          
       
          
        </div>
      </div>
    </section>
    <section id="aa-advance-search">
      <div className="container">
       
      </div>
    </section>
    
    
    <section id="aa-latest-property">
      <div className="container">
        <div className="aa-latest-property-area">
          <div className="aa-title">
            <h2>Approve or Reject Flat</h2>
            <span></span>
                   
          </div>
          <div className="aa-latest-properties-content">
            <div className="row">
            {flatList && flatList.length == 0 ?<h1>No Flat Found</h1>:''}
            {
                flatList && flatList.map((obj,index)=>(
                      <div key={index} className="col-md-4">
                      <article className="aa-properties-item">
                        <a href="#" className="aa-properties-item-img">
                          <img  src={FLAT_API_URL+'flat/imgRead/'+obj.imgName} alt="img"/>
                        </a>
                        <div className="aa-tag for-sale">
                        {obj.isApproved == 1?'Approved':' Not Approved'}
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
                          {obj.isApproved == 1?
                          <button onClick={()=>approveOrReject(0,obj)} className="aa-secondary-btn">Click to Reject</button>
                          :<button onClick={()=>approveOrReject(1,obj)} className="aa-secondary-btn">Click to Approved</button>}
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
            <h2>User List and Delete</h2>
            <span></span>
                   
          </div>
          <div className="aa-latest-properties-content">
            <div className="row">
            {userList && userList.length == 0 ?<h1>No User Found</h1>:''}
            {
                userList && userList.map((obj,index)=>(
                      <div key={index} className="col-md-4">
                      <article className="aa-properties-item">
                        {/* <a href="#" className="aa-properties-item-img">
                          <img src="img/list.jpeg" alt="img"/>
                        </a> */}
                        
                        <div className="aa-properties-item-content">
                          <div className="aa-properties-info">  
                          <div>
                          <span className="title">Email:</span><span> {obj.email}</span> 
                            </div>                         
                            <div>
                          <span className="title">Name:</span><span> {obj.name}</span> 
                            </div>                         
                            

                          </div>
                          {/* <div className="aa-properties-about">
                           
                            <p></p>                      
                          </div> */}
                          <div className="aa-properties-detial">
                            <span className="aa-price">
                              {obj.user_type}
                            </span>
                            {/* <a href="#" className="aa-secondary-btn">View Details</a> */}
                          </div>
                          <div className="aa-properties-detial">
                          <span onClick={()=>deleteUser(obj)} className="btn btn-primary">
                            Delete User
                            </span>
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
    
    
    
    <footer id="aa-footer">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
          <div className="aa-footer-area">
            <div className="row">
              <div className="col-md-3 col-sm-6 col-xs-12">
                <div className="aa-footer-left">
                 <p>Designed by <a rel="nofollow" href="#">084-pod3</a></p>
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
export default AdminApproval;