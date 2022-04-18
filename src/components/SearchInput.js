import React, { useEffect, useState } from 'react';
import { FormControl } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { Link, useSearchParams } from 'react-router-dom';

const SearchInput = ({ handleSearchSubmit }) => {
  const [key, setKey] = useState('');
  const [search] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const handleSumbit = (e) => {
    if (handleSearchSubmit) {
      handleSearchSubmit.mutate(key);
    }

    if (key !== '') {
      e.preventDefault();
      navigate('/search?key=' + key);
    }
  };

  useEffect(() => {
    if (search.get('key') !== null) {
      setKey(search.get('key'));
    }
  }, []);

  return (
    <form onSubmit={(e) => handleSumbit(e)}>
      <div className="d-flex search-input-container position-relative">
        <FormControl
          placeholder="Search product"
          className="pe-5"
          type="search"
          value={key}
          onChange={(e) => setKey(e.target.value)}
        />
        <img
          onClick={() => handleSumbit()}
          className="position-absolute search-icon  top-50 end-0 translate-middle"
          alt=""
          src="/assets/icons/search.svg"
        />
      </div>
    </form>
  );
};

export default SearchInput;
