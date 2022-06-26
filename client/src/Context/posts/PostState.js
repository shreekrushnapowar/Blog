import React,{useState} from 'react'
import PostContext from './postContext'
import axios from 'axios'
const PostState = (props) => { 
  const [Siglepost, setSiglepost] = useState([])   
    const host = "http://localhost:8000";
    const [Gottdata, setGottdata] = useState([])
    const [GetAllpostData, setGetAllpostData] = useState([])
const CreateUser = async(username, password) => {
   const data =await axios.post(`${host}/createuser`, {
        username: username,
        password: password
      })
      .then(function (response) {
       return response;
      })
      .catch(function (error) {
        console.log(error);
      });
      return data;

}

const signin=async(username,password)=>{
       const data =await axios
        .post(`${host}/signin`,{
            username: username,
            password: password
          })
        .then()
        .catch(error => console.log(error));
       return data;
}

const UploadPost=async(Formdata)=>{
      console.log('form data',Formdata.photo.name);
      const Storageusername=localStorage.getItem('PostUserName')
      const res=  await axios.post(`${host}/PostBlog/${Storageusername}`,Formdata);
      console.log(res);
}
const GetOwnData=async()=>{
  const Storageusername=localStorage.getItem('PostUserName');
  // const res=  await axios.get(`${host}/GetOwnPosts/${Storageusername}`);
  // const json=await res.json();
  // setGottdata(res.posts);
  const response = await fetch(`${host}/GetOwnPosts/${Storageusername}`, {
    method: 'GET', 
    headers: {
      'Content-Type': 'application/json',
    }
  }); 
   const json=await response.json();
   setGottdata(json.posts);
 
}
const GetAllData=async()=>{
  // const res=  await axios.get(`${host}/GetOwnPosts/${Storageusername}`);
  // const json=await res.json();
  // setGottdata(res.posts);
  const response = await fetch(`${host}/GetallPosts`, {
    method: 'GET', 
    headers: {
      'Content-Type': 'application/json',
    }
  }); 
   const json=await response.json();
   setGetAllpostData(json.posts);
 
}

const DeletePost=async(id)=>{
   const res=  await axios.delete(`${host}/deletepost/${id}`);
   if(res){setSiglepost([]);alert('post deleted successfully')}

}

const updatepost=async(id,title,description,status)=>{
  console.log(id,title,description,status);
  const response = await fetch(`${host}/updatepost/${id}`, {
    method: 'PUT', 
    headers: {
      'Content-Type': 'application/json'

    },
       body: JSON.stringify({title,description,status}) 
  }); 
   const json=response.json();
   let newpost=JSON.parse(JSON.stringify(Siglepost))
     for (let index = 0; index < newpost.length; index++) {
       const element = newpost[index];
       if(element._id===id)
       {
        newpost[index].title=title;
        newpost[index].description=description;
        newpost[index].status=status;
        break;      
       }           
     }
     setSiglepost(newpost)
}

  return (
    <PostContext.Provider value={{CreateUser,signin,UploadPost,GetOwnData,Gottdata,setGottdata,GetAllData,GetAllpostData,Siglepost, setSiglepost,DeletePost,updatepost}}>
        {props.children}
    </PostContext.Provider>
  )
}

export default PostState