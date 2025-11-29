import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Search.css';

const Search = () => {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const searchHandler = (e) => {
    e.preventDefault();
    const query = search.trim();

    if (query) {
      navigate(`/search/${query}`);
    } else {
      navigate('/product'); // vraća sve proizvode ako je input prazan
    }
  };

  const handleIconClick = () => {
    const query = search.trim();
    if (query) {
      navigate(`/search/${query}`);
    } else {
      navigate('/product');
    }
  };

  return (
    <form onSubmit={searchHandler}>
      <div className="search-container">
        <img
          src="https://cdn-icons-png.flaticon.com/128/54/54481.png"
          alt="search icon"
          onClick={handleIconClick}
        />
        <input
          type="text"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          placeholder="Search product or brand"
        />
      </div>
    </form>
  );
};

export default Search;
