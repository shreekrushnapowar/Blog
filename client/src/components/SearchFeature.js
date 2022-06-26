import React from 'react'

const SearchFeature = (props) => {
    const gtesrearchterm=(e)=>{
    props.searchkeyword(e.target.value)
    // console.log(e.target.value);
    }
  return (
    <>
        <input
         id="search"
         name="search"
         value={props.term}
         onChange={gtesrearchterm}
         placeholder="Search Here"
         
        />
    </>
  )
}

export default SearchFeature