import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {USER_API_URL} from './AppConst';
import {fetchPost,fetchGet} from './AppService';
import Header from './Header';

function LoginRegister() {
  const [pageType,setPageType]=useState('login');
  const [pageError,setPageError]=useState({});
  const [email,setEmail] = useState('');
  const [pwd,setPwd] = useState('');
  const [username,setUserName] = useState('');
  const [re_pwd,setRe_Pwd] = useState('');
  const [usertype,setUserType] = useState('user');
  const navigate = useNavigate();
  
  const loginValidation=()=>{
    let status = false;
    let error = {};
    if(username == ""){
      status = true;
      error.username = true;
    }
    if(email == ""){
      status = true;
      error.email = true;
    }if(pwd == ""){
      error.pwd = true;
      status = true;
    }
    setPageError(error);
    console.log(error);
    return status;
  }
  const adminValidation=()=>{
    let status = false;
    let error = {};
    if(username == ""){
      status = true;
      error.username = true;
    }if(pwd == ""){
      error.pwd = true;
      status = true;
    }
    setPageError(error);
    console.log(error);
    return status;
  }

  const registerValidation=()=>{
    let status = false;
    let error = {};
    if(username == ""){
      status = true;
      error.username = true;
    }
    if(email == ""){
      status = true;
      error.email = true;
    } if(pwd == ""){
      status = true;
      error.pwd = true;
    }if(re_pwd == ""){
      status = true;
      error.re_pwd = true;
    }if(re_pwd != pwd){
      status = true;
      error.pwd_same = true;
    }
    console.log(error);
    setPageError(error);
    console.log(pageError['username']);
    return status;
  }
  const login=()=>{
    if(!loginValidation()){
      let req = {
        "username":username,
        "email":email,
        "password":pwd,
        "user_type":usertype
      }
      fetchPost(USER_API_URL+"user/login",req)
      .then(res=>{
        console.log("response");
        console.log(res);
        console.log("request");
        console.log(req);
        if(res.hasOwnProperty("id")){
        localStorage.setItem("token",JSON.stringify(res));
        localStorage.setItem("user_id",res['id']);
          if(usertype == "owner"){
            navigate('/flatcreate');
          }else if(usertype == "user"){
           navigate('/home');
          }
        }else{
          alert("Error while login. "+res['message']);
        }
        
         
            //navigate to home page..
      }).catch(err=>{
        err.then(er=>{
          alert(er['message']);
          //console.log(er);
        })
      }) 
    }
    
  }
  const clearFields=()=>{
    setUserName('');
    setEmail("");
    setPwd('');
    setRe_Pwd("");
    setPageError({});
  }
  const adminLogin=()=>{
    if(!adminValidation()){

    
      if(username == 'admin' && pwd == "admin"){
        navigate("/adminApprove")
      }else{
        alert("wrong Username or password");
      }
    }
  }
  const SubHeader=()=>{
    
    return( <div className={"sub-menu row "+pageType}>
      <div className="col-md-3">
           <h4 onClick={()=>{setPageType('login');clearFields()}}  className='login_tab login-tab-menu'>Login</h4>
      </div>
      <div className="col-md-3">
          <h4 onClick={()=>{setPageType('admin');clearFields()}} className='login_tab admin-tab-menu'>Admin</h4>
    </div>
    <div className="col-md-3">
          <h4 onClick={()=>{setPageType('register');clearFields()}} className='login_tab register-tab-menu'>Register</h4>
    </div>
    </div>);
    
  }
  const register=()=>{
    if(!registerValidation()){
      //json object
      let req = {
        "username":username,
        "email":email,
        "password":pwd,
        "user_type":usertype
      }
      //common method from api service
      fetchPost(USER_API_URL+"user/register",req)
      .then(res=>{
        console.log(res);
        console.log(req);
        clearFields();
        // if(res.hasOwnProperty("message") && res['message'] == 'ok'){
          // alert("User is registered successfully");
          // setPageType("login");
        // }else{ alert("Error while register")}
        alert("User is registered successfully");
          setPageType("login");
        //navigate to login page after register..
      }).catch(err=>{
        err.then(er=>{
          alert(er['message']);
          //console.log(er);
        })
      })     
  }

}
  const AdminLoginPage=()=>{
    return(
      
      <section id="aa-signin">
  <div className="container">
    <div className="row">
      <div className="col-md-12">
        <div className="aa-signin-area">
          <div className="aa-signin-form">
            <div className="aa-signin-form-title">
            {SubHeader()}              

            </div>
            <form className="contactform">                                                 
              
              <div className="aa-single-field">
                <label for="email">Username <span className="required">*</span></label>
                <input type="email" onChange={(e)=>setUserName(e.target.value)}   name="email"/>
                {pageError['username']?<span className='error_field_input'> Username  should not be empty</span>:''}

              </div>
              <div className="aa-single-field">
                <label for="password">Password <span className="required">*</span></label>
                <input type="password" onChange={(e)=>setPwd(e.target.value)}   name="password"/> 
                {pageError['pwd']?<span className='error_field_input'> Password should not be empty</span>:''}

              </div>
              
              <div className="aa-single-submit">
                <input type="button" value="Login" onClick={adminLogin} name="submit"/>                    
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>);
}

  const loginPage=()=>{
      return(
        
        <section id="aa-signin">
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div className="aa-signin-area">
            <div className="aa-signin-form">
              <div className="aa-signin-form-title">
            
            {SubHeader()}
              </div>
              <form className="contactform">                                                 
              <div className="aa-single-field">
                  <label for="name">Name <span className="required">*</span></label>
                  <input type="text" onChange={(e)=>setUserName(e.target.value)} name="name"/>
                  {pageError['username']?<span className='error_field_input'> Name field should not be empty</span>:''}
                </div>
                <div className="aa-single-field">
                  <label for="email">Email <span className="required">*</span></label>
                  <input type="email" onChange={(e)=>setEmail(e.target.value)}   name="email"/>
                    {pageError['email']?<span className='error_field_input'>Email field should not be empty</span>:''}
                </div>
                <div className="aa-single-field">
                  <label for="password">Password <span className="required">*</span></label>
                  <input type="password" onChange={(e)=>setPwd(e.target.value)}   name="password"/> 
                  {pageError['pwd']?<span className='error_field_input'>Password field should not be empty</span>:''}
                </div>
                <div className="aa-single-field">
                  <label for="password">User Type <span className="required">*</span></label>
                  <select class="form-control" onChange={(e)=>setUserType(e.target.value)} >
                  <option value="user">User</option>
                    <option value="owner">Owner</option>
                  </select>           
              </div>
                <div className="aa-single-submit">
                  <input type="button" value="Login" onClick={login} name="submit"/>                    
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>);
  }
  



  const registerPage =()=>{
    return (<section id="aa-signin">
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div className="aa-signin-area">
            <div className="aa-signin-form">
              <div className="aa-signin-form-title">
              {SubHeader()}
              </div>
              <form className="contactform">                                                 
                <div className="aa-single-field">
                  <label for="name">Name <span className="required">*</span></label>
                  <input type="text" onChange={(e)=>setUserName(e.target.value)} name="name"/>
                  {pageError['username']?<span className='error_field_input'> Name field should not be empty</span>:''}
                </div>
                <div className="aa-single-field">
                  <label for="email">Email <span className="required">*</span></label>
                  <input type="email" onChange={(e)=>setEmail(e.target.value)} name="email"/>
                  {pageError['email']?<span className='error_field_input'> Email field should not be empty</span>:''}

                </div>
                <div className="aa-single-field">
                  <label for="password">User Type <span className="required">*</span></label>
                  <select class="form-control" onChange={(e)=>setUserType(e.target.value)}>
                    <option value="user">User</option>
                    <option value="owner">Owner</option>
                  </select>              
              </div>

                <div className="aa-single-field">
                  <label for="password">Password <span className="required">*</span></label>
                  <input type="password" onChange={(e)=>setPwd(e.target.value)} name="password"/> 
                  {pageError['pwd']?<span className='error_field_input'>Password field should not be empty</span>:''}

                </div>
               
                <div className="aa-single-field">
                  <label for="confirm-password">Confirm Password <span className="required">*</span></label>
                  <input type="password" onChange={(e)=>setRe_Pwd(e.target.value)} name="confirm-password"/> 
                  {pageError['re_pwd']?<span className='error_field_input'>Confirm Password should not be empty</span>:''}
                  {pageError['pwd_same']?<span className='error_field_input'>Confirm Password and password should be same</span>:''}

                </div>
                <div className="aa-single-submit">
                  <input type="button"  onClick={register} value="Create Account" name="submit"/>                    
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>);
  }
  return (
    <>
    <Header/>
    
       {pageType == 'login'?loginPage():''}
       {pageType == 'register'?registerPage():''}
       {pageType == 'admin'?AdminLoginPage():''}
    
   
    </>
  );
}

export default LoginRegister;
