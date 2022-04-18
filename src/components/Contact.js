import React, { useState } from 'react';

const Contact = ({ dataContact, activeContact, setActiveContact }) => {
  return (
    <div
      onClick={() => setActiveContact(!activeContact)}
      className={`contact p-3 ${
        activeContact ? 'active-chat' : ''
      }  rounded d-flex align-items-center mt-4`}
    >
      <img
        width={50}
        height={50}
        className="rounded-circle user-profile"
        src="/assets/images/default_admin_profile.png"
        alt=""
      />
      <div className="ms-3">
        <span>{dataContact?.name}</span>
        <p className="m-0 text-secondary">Hello Admin, I Need Your Help</p>
      </div>
    </div>
  );
};

export default Contact;
