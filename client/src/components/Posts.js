import React, { useEffect, useContext,useState } from 'react'
import Post from './Post'
import postContext from '../Context/posts/postContext'
import SearchFeature from './SearchFeature'
const Posts = () => {
    const context = useContext(postContext)
    const { GetOwnData, Gottdata } = context;
    const [searchterm, setsearchterm] = useState("");
    const [saearchresult, setsaearchresult] = useState([])
    useEffect(() => {
        GetOwnData();
        // eslint-disable-next-line
    }, [])

const searchHandler=(searchterm)=>{
    setsearchterm(searchterm);
    if(searchterm!=="")
    { 
        const newdatalist=Gottdata.filter((mydata)=>{
         return  Object.values(mydata)
           .join(" ")
           .toLowerCase()
           .includes(searchterm.toLowerCase());        
        })
        
        setsaearchresult(newdatalist);
    }
    else{
        setsaearchresult(Gottdata);
    }
   
// console.log(saearchresult);
}
    return (
        <>
            <br />
            <br />
            <br/>
        
                 <SearchFeature term={searchterm} searchkeyword={searchHandler}/>
              
                <div className="container posts">
                    <div className="row my-3">
                        {searchterm.length<1?Gottdata ? Gottdata.map((item) => {
                             return <Post key={item._id} post={item} />

                        }) : <></>:saearchresult.map((item) => {
                            return <Post key={item._id} post={item} />

                        })}
                    </div>

                </div>
            </>
            )
}

            export default Posts