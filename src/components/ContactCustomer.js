import React from 'react';

const ContactCustomer = ({ dataContact, handleOnClick, activeContact }) => {
  return (
    <div
      onClick={() => handleOnClick(dataContact.id)}
      className={`d-flex align-items-center p-3 rouned contact ${
        activeContact === dataContact.id ? 'active-chat' : ''
      }`}
    >
      <img
        width={50}
        height={50}
        className="rounded-circle user-profile"
        src={dataContact?.profile.image}
        alt=""
      />
      <div className="ms-3">
        <span>{dataContact?.name}</span>
        <p className="m-0 text-secondary">{dataContact?.message}</p>
      </div>
    </div>
  );
};

export default ContactCustomer;
