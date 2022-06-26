import React,{useRef,useContext,useState} from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import './Navbar.css'
import postContext from '../Context/posts/postContext'
const Navbar = () => {
 let history= useHistory();
  const context = useContext(postContext);
  const [count, setcount] = useState(0)
  const { GetOwnData, Gottdata } = context;
  const ref=useRef(null);
  const refClose=useRef(null);
 const  onclick=()=>{
      GetOwnData(); 
      // console.log(Gottdata.length);
      setcount(Gottdata.length)
       
  ref.current.click(); 
 }
 const logout=()=>{
  localStorage.removeItem('PostUserName');
  history.push('/');

 }
  return (
<>
<button ref={ref} type="button" className="d-none btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal2">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal2" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">User Information</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                               <form>    
                                   
                                  <div className="mb-3">
                                        <label for="exampleFormControlInput1" className="form-label">User Name:{localStorage.getItem('PostUserName')}</label>
                                    </div>
                                    <div className="mb-3">
                                        <label for="exampleFormControlInput1" className="form-label">Total number of posts:{count}</label>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
    <div className="container">
    <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
  <div className="container-fluid">
    <NavLink className="navbar-brand" to="/">Navbar</NavLink>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <NavLink className="nav-link"  to="/upload">Upload</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/mypost">My Posts</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/publicpost">Public Posts</NavLink>
        </li>   
      </ul> 
     
        <i class="fa fa-user userinfo" aria-hidden="true" onClick={onclick}></i>
        <button class="btn btn-outline-success loginfo" type="submit" onClick={logout}>Logout</button>
       
    </div>
  </div>
</nav>
</div>
</>
  )
}

export default Navbar