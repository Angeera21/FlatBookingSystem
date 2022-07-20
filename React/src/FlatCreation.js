import { useEffect, useState } from "react";
import Header from "./Header";
import {USER_API_URL,FLAT_API_URL} from './AppConst';
import {fetchPost,fetchGet,getUserId,fetchDelete,fetchFileUpload} from './AppService';
function FlatCreation(){
  
  const [pincode,setPincode] = useState('');
  const [address,setAddress] = useState('');
  let imgName = "";
  const [rent,setRent] = useState('');
  const [sqft,setSqft] = useState('');
  const [bhk,setBhk] = useState('');
  const [editId,setEditId] = useState(0);

  const [selectedFile,setSelectedFile] = useState();

  const [flatList,setFlatList] = useState([]);
  const editFlat = (flat)=>{
    setEditId(flat.id);
    setRent(flat.rent);
    setAddress(flat.address);
    setSqft(flat.sqft);
    setBhk(flat.bhk);
    setPincode(flat.pincode);
  }
  const cancelEdit=()=>{
    setEditId(0);
    setRent("");
    setAddress("");
    setSqft("");
    setBhk("");
    setPincode("");
  }
const deleteFlat=(flat)=>{
   
    if(!window.confirm("Do you want to delete this flat?")){
      return;
    }
   
    fetchDelete(FLAT_API_URL+"flat/delete/"+flat.id)
    .then(res=>{
      alert("Flat is deleted!");
      getAll();//refresh flat
      //setFlatList(res);
    }).catch(err=>{
      err.then(er=>{
        alert(er['message']);
        //console.log(er);
      })
    }) 
  
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
 const onFileChange = (event) => {
    
    // Update the state
    setSelectedFile(event.target.files[0] );
  
  };
  const editUpdate=()=>{
    createFlat();
  }
  const imgUpload=()=>{
    let file = new FormData();
    if(selectedFile == undefined || selectedFile ==""){
      alert("Please select Image");
      return;
    } if(address == ""){
      alert("Address should not be empty");
      return;
    }else if(pincode == ""){
      alert("Pincode should not be empty");
      return;
    }else if(rent == ""){
      alert("Rent should not be empty");
      return;
    }else if(sqft == ""){
      alert("Sqft should not be empty");
      return;
    }else if(bhk == ""){
      alert("Bhk should not be empty");
      return;
    }else{
      file.append("file",selectedFile);
      file.append('fileName', selectedFile.name);
  
      fetchFileUpload(FLAT_API_URL+"flat/imgUpload",file)
      .then(res=>{
        imgName = res['message'];
        createFlat();
      }).catch(err=>{
        alert("Error: "+err.message);
      });
    }
   
  }

  const createFlat=()=>{
    if(address == ""){
      alert("Address should not be empty");
      return;
    }else if(pincode == ""){
      alert("Pincode should not be empty");
      return;
    }else if(rent == ""){
      alert("Rent should not be empty");
      return;
    }else if(sqft == ""){
      alert("Sqft should not be empty");
      return;
    }else if(bhk == ""){
      alert("Bhk should not be empty");
      return;
    }else{
      let param = {
        'address':address,
        'pincode':pincode,
        "rent":rent,
        "sqft":sqft,
        "bhk":bhk,
        "owernerId":getUserId()
      }
      let urlMethod = "create";
      if(editId > 0){
        param.id = editId;
        urlMethod = "edit";
      }
      if(imgName != ""){
        param.imgName = imgName;
      }
      
      fetchPost(FLAT_API_URL+"flat/"+urlMethod,param)
      .then(res=>{
        console.log(res);
        alert("Flat is "+urlMethod+"ed");
        getAll();
        cancelEdit();//clear the fields
        //setFlatList(res);
      }).catch(err=>{
        alert("Error: "+err.message);
      });
    }
    
  }
  useEffect(()=>{
    getAll()
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
            <h2>Create Flat</h2>
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
                  <label for="email">Sqft <span className="required">*</span></label>
                  <input type="email" class="form-control" value={sqft} onChange={(e)=>setSqft(e.target.value)} name="email"/>
                </div>
                <div className="aa-single-field">
                  <label for="password">Rent <span className="required">*</span></label>
                  <input type="email"class="form-control"   value={rent}onChange={(e)=>setRent(e.target.value)} name="rent"/>
              </div>

                <div className="aa-single-field">
                  <label for="password">Address <span className="required">*</span></label>
                  <input type="text" class="form-control"  value={address} onChange={(e)=>setAddress(e.target.value)} name="password"/> 
                </div>   
                
                <div className="aa-single-field">
                  <label for="password">Pincode <span className="required">*</span></label>
                  <input type="text" class="form-control"  value={pincode} onChange={(e)=>setPincode(e.target.value)} name="pincode"/> 
                </div>  
                <div className="aa-single-field">
                  <label for="password">BHk <span className="required">*</span></label>
                  <input type="text" class="form-control"  value={bhk} onChange={(e)=>setBhk(e.target.value)} name="bhk"/> 
                </div>           
              
                {
                 ( editId >0)? <div className="aa-single-submit">
                 <input type="button"  class="btn btn-primary mb-3" onClick={editUpdate} value="Update" />                    
                 <input type="button"  class="btn btn-primary mb-3" onClick={cancelEdit} value="Cancel" />                    
               </div>: <><div className="aa-single-field">
                  <label for="email">Picture <span className="required">*</span></label>
                  <input type="file" class="form-control" onChange={(e)=>onFileChange(e)} />
                  <br></br>
                </div> <div className="aa-single-submit">
                  <input type="button"  class="btn btn-primary mb-3" onClick={imgUpload} value="Create Flat" name="submit"/>                    
                </div></>}
                
               
              </form>
              </div>
            </div>
            </div>
              
              
              
             
            </div>
          </div>
          <div className="aa-latest-properties-content">
            <div className="row">
            {flatList && flatList.length == 0 ?<h1>No Flat Found</h1>:''}
            {
                flatList && flatList.map((obj,index)=>(
                      <div key={index} className="col-md-4">
                      <article className="aa-properties-item">
                        <a href="#" className="aa-properties-item-img">
                          <img src={FLAT_API_URL+'flat/imgRead/'+obj.imgName} alt="img"/>
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
                          <span onClick={()=>deleteFlat(obj)} className="btn btn-primary mb-3">
                            Delete
                            </span>
                            &nbsp;
                            <span onClick={()=>editFlat(obj)} className="btn btn-primary">
                            Edit
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
export default FlatCreation;