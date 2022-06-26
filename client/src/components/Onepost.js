import React, { useContext,useRef,useState } from 'react'
import Navbar from './Navbar'
import './OnePost.css';
import postContext from '../Context/posts/postContext';
const Onepost = () => {
    const [checkpriavt, setcheckpriavt] = useState(false);
    const [checkpublic, setcheckpublic] = useState(false);
    
    const ref=useRef(null);
    const refClose=useRef(null);
    const context = useContext(postContext);
    const { setSiglepost,Siglepost, DeletePost, updatepost } = context;
    const DeleteSinglePost = () => {
        const surity=window.confirm('You Really want to delete the item?')
        if(surity){DeletePost(Siglepost._id)}
            
    }

    const UpdateSinglePost = () => {
        if(Siglepost.status==='private')
        {
            setcheckpriavt(true);
        }
        else
        {
            setcheckpublic(true)
        }
        ref.current.click(); 
    }
    const handleclick1=()=>{
         updatepost(Siglepost._id,Siglepost.title,Siglepost.description,Siglepost.status)
         alert('updated successfully');
         refClose.current.click();
      
    }
    const onChange=(e)=>{
        setSiglepost({...Siglepost,[e.target.name]:e.target.value})
    }
   const onChange2=(e)=>{
    setSiglepost({...Siglepost,[e.target.name]:e.target.value})
        if(Siglepost.status==='private')
        {
            setcheckpriavt(false);
        }
        else
        {
            setcheckpublic(false)
        }
   }
    return (
        <>
            <Navbar/>
            <br />
            <br />
            <br />
            <button ref={ref} type="button" className="d-none btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>


            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Your Blog</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <form>
                                    <div className="mb-3">
                                        <label for="exampleFormControlInput1" className="form-label">Title</label>
                                        <input type="text" className="form-control" id="title" placeholder="title" name="title"  required onChange={onChange} value={Siglepost.title} />
                                    </div>
                                    <div className="mb-3">
                                        <label for="exampleFormControlTextarea1" className="form-label">Write a Blog Here</label>
                                        <textarea className="form-control" id="description" rows="3" name="description" required onChange={onChange} value={Siglepost.description}></textarea>
                                    </div>
                                    <div className="mb-3">
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="radio" name="status" id="inlineRadio1" value='private' checked={checkpriavt} onChange={onChange2} />
                                            <label className="form-check-label" for="inlineRadio1" >Private</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="radio" name="status" id="inlineRadio2" value="public" checked={checkpublic} onChange={onChange2} />
                                            <label className="form-check-label" for="inlineRadio2">Public</label>
                                        </div>
                                    </div>
                                   
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button onClick={handleclick1} type="button" className="btn btn-primary">Update changes</button>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            {Siglepost ? <div className='container'>
                <img className="SingleImage" src={`http://localhost:8000/public/images/${Siglepost.photo}`} alt="" />

                <h1 className="Oneposttitle">{Siglepost.title}
                    <div className="Onposticon">
                        {(Siglepost.username === localStorage.getItem('PostUserName')) ?
                            <> <i class="singleicon fa fa-trash-o" aria-hidden="true" onClick={DeleteSinglePost}></i>
                                <i class="singleicon fa fa-pencil-square-o" aria-hidden="true" onClick={UpdateSinglePost}></i></>
                            : <></>}

                    </div>
                </h1>
                <div className="onpostinfo">
                    <span>User:{Siglepost.username}</span>
                    <span>Date:{Siglepost.updatedAt}</span>
                </div>
                <p className="description">{Siglepost.description}</p>
            </div> : <></>}

        </>
    )
}

export default Onepost