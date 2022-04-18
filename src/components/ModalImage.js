import React from 'react';
import { Button, Modal } from 'react-bootstrap';

const ModalImage = ({ show, handleClose, imageUrl }) => {
  return (
    <>
      <Modal
        dialogClassName="modal-90w"
        centered
        className="modal-image"
        show={show}
        onHide={handleClose}
      >
        {imageUrl && <img src={imageUrl} alt="" />}
      </Modal>
    </>
  );
};

export default ModalImage;
