import React,{useContext} from 'react'
import { useHistory } from 'react-router-dom';
import postContext from '../Context/posts/postContext';
import './Post.css'
const Post = (props) => {
    const context = useContext(postContext);
    const {setSiglepost}=context;
    let history=useHistory();
    const redirect=()=>{
        setSiglepost(props.post)
        history.push('/singlepost')
    }
    return (
        <div className="col-md-3">      
            <div className="card my-3 clickhere" onClick={redirect}>
            
            <img className="postimg" src={`http://localhost:8000/public/images/${props.post.photo}`} alt=""/>
                <div className="card-body">
                    <h5 className="card-title">{props.post.title}</h5>
                    <p className="card-text description">{props.post.description}</p>                 
                </div>
            </div>
        </div>

    )
}

export default Post