import React, { useContext, useEffect, useState } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import Layout from '../../hoc/Layout';
import { io } from 'socket.io-client';
import Contact from '../../components/Contact';
import Chat from '../../components/Chat';
import { UserContext } from '../../context/user/UserContext';
import ContactComplain from '../../components/ContactComplain';

let socket;
const Complain = () => {
  const [contact, setContact] = useState(null);
  const [contacts, setContacts] = useState([]);

  const [messages, setMessages] = useState([]);

  const title = 'Complain admin';
  document.title = 'DumbMerch | ' + title;

  const [state] = useContext(UserContext);

  useEffect(() => {
    socket = io('https://dumbmerch-hasan.herokuapp.com', {
      auth: {
        token: localStorage.getItem('token'),
      },
    });

    socket.on('new message', () => {
      socket.emit('load messages', contact?.id);
    });

    // listen error sent from server
    socket.on('connect_error', (err) => {
      console.error(err.message); // not authorized
    });
    loadContact();
    loadMessages();

    return () => {
      socket.disconnect();
    };
  }, [messages]); // code here

  const loadContact = () => {
    // emit event load admin contact
    socket.emit('load admin contact');
    // listen event to get admin contact
    socket.on('admin contact', (data) => {
      console.log(data);

      const dataContact = {
        ...data,
        message:
          messages.length > 0
            ? messages[messages.length - 1].message
            : 'Click here to start message',
      };

      setContacts([dataContact]);
    });
  };

  // used for active style when click contact
  const onClickContact = (data) => {
    setContact(data);
    socket.emit('load messages', data.id);
  };

  const loadMessages = () => {
    socket.on('messages', async (data) => {
      if (data.length > 0) {
        const dataMessages = data.map((item) => ({
          id_sender: item.sender.id,
          message: item.message,
        }));

        setMessages(dataMessages);
      }
    });
  };

  const onSendMessage = (e) => {
    if (e.key === 'Enter') {
      const data = {
        id_recipient: contact?.id,
        message: e.target.value,
      };

      socket.emit('send message', data);
      e.target.value = '';
    }
  };

  return (
    <Layout>
      <Container>
        <Row className="complain-page">
          <Col className="border-end border-secondary" md={4}>
            <ContactComplain
              dataContact={contacts}
              clickContact={onClickContact}
              contact={contact}
            />
          </Col>
          <Col md={8}>
            <Row className="g-0">
              <Col md={12} className="">
                <div className="messages-container">
                  {/* message */}
                  <Chat
                    contact={contact}
                    messages={messages}
                    user={state.user}
                    sendMessage={onSendMessage}
                  />
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default Complain;
