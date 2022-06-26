import React,{useEffect,useContext,useState} from 'react'
import Navbar from './Navbar'
import postContext from '../Context/posts/postContext'
import Post from './Post'
import Searchfeature2 from './Searchfeature2'
const PublicPosts = () => {
    const context = useContext(postContext)
    const {GetAllpostData,GetAllData}=context;
    const [searchterm, setsearchterm] = useState("");
    const [saearchresult, setsaearchresult] = useState([])
    useEffect(() => {
        GetAllData();
         // eslint-disable-next-line
 },[])

 const searchHandler=(searchterm)=>{
    setsearchterm(searchterm);
    if(searchterm!=="")
    { 
        const newdatalist=GetAllpostData.filter((mydata)=>{
         return  Object.values(mydata)
           .join("")
           .toLowerCase()
           .includes(searchterm.toLowerCase());        
        })
        
        setsaearchresult(newdatalist);
    }
    else
    {
        setsaearchresult(GetAllpostData);

    }
// console.log(saearchresult);
}
    return (
        <>
            <Navbar />
            <br/>
            <br/>
            <br/>
             <Searchfeature2 term={searchterm} searchkeyword={searchHandler}/>
            <div className="container posts">   
               <div className="row my-3">
                        {searchterm.length<1?GetAllpostData ? GetAllpostData.map((item) => {
                            return <Post key={item._id} post={item} />

                        }) : <></>:saearchresult.map((item) => {
                            return <Post key={item._id} post={item} />

                        })}
                    </div>
            
           
        </div>
        </>
    )
}

export default PublicPosts