import React from 'react';
import { Button, Spinner } from 'react-bootstrap';

const ButtonDumbMerch = ({
  children,
  full,
  type,
  sm,
  disabled,
  onClick,
  loading,
  outlined,
}) => {
  return (
    <Button
      onClick={onClick}
      type={type}
      className={`${outlined ? 'btn-outlined' : 'button-dumb-merch'} ${
        full ? 'w-100' : 'px-3'
      } ${sm ? 'btn-sm' : ''}`}
      disabled={loading || disabled}
    >
      {loading && (
        <Spinner
          as="span"
          animation="border"
          size="sm"
          role="status"
          aria-hidden="true"
          className="me-2"
        />
      )}
      {children}
    </Button>
  );
};

export default ButtonDumbMerch;
