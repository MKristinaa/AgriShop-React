import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Search.css';


const Search = () => {

  const [search, setSearch] = useState('');
  const navigate = useNavigate()

  const searchHandler = (e) => {
    e.preventDefault()

    if(search.trim()){
      navigate(`/search/${search}`)
    } else{
      navigate('/Product')
    }
  }

  return (
    <form onSubmit={searchHandler}>
    <div className="search-container">
      <img src="https://cdn-icons-png.flaticon.com/128/54/54481.png" alt="" style={{width:25,height:25}}/>
      <input 
        type="text" 
        onChange={(e) => setSearch(e.target.value)} 
        value={search}  
        placeholder="Search product or brand" 
        
      />
    </div>
    </form>
  );
}

export default Search;