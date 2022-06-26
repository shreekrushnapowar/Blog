import React,{useState} from 'react'
import Navbar from './Navbar'
// import postContext from '../Context/posts/postContext'
import Axios from 'axios'
const Upload = () => {
    const host = "http://localhost:8000";
    // const context = useContext(postContext);
    // const {UploadPost}=context;
    const [Postdata, setPostdata] = useState({title:"",description:"",status:"",photo:""})
    
    const handleclick=async(e)=>{
        e.preventDefault();
        const formData =new FormData();
        // formData.append('username', localStorage.getItem('PostUserName'));
        formData.append('title', Postdata.title);
        formData.append('description', Postdata.description);
        formData.append('status', Postdata.status);
        formData.append('photo', Postdata.photo);

        // console.log('data is ',formData)// will not console log because browser will not understand
        // Axios.post("https://httpbin.org/anything",formData)
        // .then(res=>console.log(res))
        // .catch(err=>console.log(err))
        // const upload=await UploadPost(Postdata);
        // console.log(upload)
  
        const Storageusername=localStorage.getItem('PostUserName')
        const res=  await Axios.post(`${host}/PostBlog/${Storageusername}`,formData);
        console.log(res)
        if(res.statusText==='OK')
        {
          alert('Blog posted successfully');
        }
        else
        {
            alert('Something went wrong');
        }
        
 
    }
    return (
        <>
            <Navbar />
            <br />
            <div className='Upload my-5 container'>
            <div class="card">
                <h5 class="card-header ">Post A Blog</h5>
                <div class="card-body">         
                    <form>
                    <div className="mb-3">
                        <label for="exampleFormControlInput1" className="form-label">Title</label>
                        <input type="text" className="form-control" id="title" placeholder="title" name="title" onChange={(e)=>{setPostdata({...Postdata, [e.target.name]: e.target.value});}} required />
                    </div>
                    <div className="mb-3">
                        <label for="exampleFormControlTextarea1" className="form-label">Write a Blog Here</label>
                        <textarea className="form-control" id="description" rows="3" name="description" onChange={(e)=>{setPostdata({...Postdata, [e.target.name]: e.target.value});}} required></textarea>
                    </div>
                    <div className="mb-3">
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="status" id="inlineRadio1" value="private" onChange={(e)=>{setPostdata({...Postdata, [e.target.name]: e.target.value});}}/>
                            <label className="form-check-label" for="inlineRadio1">Private</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="status" id="inlineRadio2" value="public" onChange={(e)=>{setPostdata({...Postdata, [e.target.name]: e.target.value});}}/>
                            <label className="form-check-label" for="inlineRadio2">Public</label>
                        </div>
                    </div>
                    <div className="mb-3">
                        <label for="iamge" className="form-label" >Choose Image</label>
                        <input type="file" className="form-control" id="photo" rows="3"   accept=".png, .jpg, .jpeg"
                          name="photo"  onChange={(e)=>{ setPostdata({...Postdata, photo: e.target.files[0]});}} required />
                    </div>
                    <center>
                        <button type="submit" className="btn btn-primary" onClick={handleclick}>Publish</button>
                    </center>
                </form>
                </div>
            </div>
            </div>
                
           





        </>
    )
}

export default Upload