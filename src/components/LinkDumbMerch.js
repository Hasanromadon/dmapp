import React from 'react';
import { Link } from 'react-router-dom';

const LinkDumbMerch = ({ children, to, active }) => {
  return (
    <Link
      to={to}
      className={`btn link-light text-decoration-none px-4 py-2 ${
        active ? 'link-dumb-merch' : ''
      }`}
    >
      {children}
    </Link>
  );
};

export default LinkDumbMerch;
