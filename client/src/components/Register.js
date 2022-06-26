import React,{useState,useContext} from 'react'
import {NavLink, useHistory} from 'react-router-dom';
import postContext from '../Context/posts/postContext';
import './Main.css'
const Register = () => {
	let history=useHistory(); 
	const context = useContext(postContext);
	const {CreateUser}=context;
    const [Credentials, setCredentials] = useState([{username:"",password:"",cpassword:""}]);
    const handlclick=async(e)=>{
       e.preventDefault();
	   if(Credentials.password===Credentials.cpassword)
	   {
		const getdata=await CreateUser(Credentials.username,Credentials.password)
		if(getdata.status===200)
		{   alert('registered successfully');
			history.push('/')
		}
		else
		{
			alert('Something Went Wrong');
		}
		
	   }
	   else
	   {
		alert('Enter correct password');
	   }
				
	}

  return (
    <main id="main" className=" bg-dark">
    <div id="login-left">
   <h3>This is Blog Website</h3>
    </div>
    <div id="login-right">
    <div className="card col-md-8">
  			<div className="card-body">	
              <h5  className="">Register</h5>				
  				<form id="login-form" >
  						<div className="form-group">
  							<label>Username</label>
  							<input type="text" id="username" name="username" className="form-control" onChange={(e)=>{setCredentials({...Credentials,[e.target.name]:e.target.value})}}/>
  						</div>
  						<div className="form-group">
  							<label>Password</label>
  							<input type="password" id="password" name="password" className="form-control" onChange={(e)=>{setCredentials({...Credentials,[e.target.name]:e.target.value})}}/>
  						</div>
                          <div className="form-group">
  							<label >Confirm Password</label>
  							<input type="password" id="cpassword" name="cpassword" className="form-control" onChange={(e)=>{setCredentials({...Credentials,[e.target.name]:e.target.value})}}/>
  						</div>                    

                        <br/>
  						<center><button className="btn-sm btn-block btn-wave col-md-4 btn-primary" onClick={handlclick}>Register</button></center>
  					</form>
                      <center>OR</center>
                      <center><NavLink to='/'>Login</NavLink></center>
  				</div>
  			</div>
    </div>
    </main>
   
  )
}

export default Register