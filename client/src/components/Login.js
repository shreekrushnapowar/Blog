import React,{useState,useContext} from 'react'
import {NavLink, useHistory} from 'react-router-dom';
import postContext from '../Context/posts/postContext';
import './Main.css'
const Login = () => {
	let history=useHistory();
	const context = useContext(postContext);
	const {signin}=context;
	const [Credentials2, setCredentials2] = useState([{username:"",password:""}]);

	const handleclick=async(e)=>{
		e.preventDefault();
		if(!Credentials2.username||!Credentials2.password){
			alert('fill all the fields');
		}
		else{
			const data=await signin(Credentials2.username,Credentials2.password)
			console.log(data.data);
			
		if(data.data.success===true)
		{   
			  localStorage.setItem('Posttoken',data.data.token)  ;
		      localStorage.setItem('PostUserName',data.data.user.username) ; 
             alert('loggedin Successfully');
			 history.push('/upload');
		}
		else
		{
			 alert('Something went wrong');
		}

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
              <h5  className="">Log IN</h5>				
  				<form id="login-form" >
  						<div className="form-group">
  							<label for="username" className="control-label">Username</label>
  							<input type="text" id="username" name="username" className="form-control" onChange={(e)=>{setCredentials2({...Credentials2,[e.target.name]:e.target.value})}} />
  						</div>
  						<div className="form-group">
  							<label for="password" className="control-label">Password</label>
  							<input type="password" id="password" name="password" className="form-control" onChange={(e)=>{setCredentials2({...Credentials2,[e.target.name]:e.target.value})}}/>
  						</div>
                        <br/>
  						<center><button className="btn-sm btn-block btn-wave col-md-4 btn-primary" onClick={handleclick}>Login</button></center>
  					</form>
                      <center>OR</center>
                      <center><NavLink to='/Register'>Register</NavLink></center>
  				</div>
  			</div>
    </div>
    </main>
          
                    
   
  )
}

export default Login