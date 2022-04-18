import React, { useContext, useEffect, useState } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import Layout from '../../hoc/Layout';
import { io } from 'socket.io-client';
import ContactByJody from '../../components/ContactByJody';
import { UserContext } from '../../context/user/UserContext';
import Chat from '../../components/Chat';
let socket;
const ComplainAdmin = () => {
  const [contact, setContact] = useState(null);
  const [contacts, setContacts] = useState([]);
  const [messages, setMessages] = useState([]);

  const title = 'Complain admin';
  document.title = 'DumbMerch | ' + title;

  const [state] = useContext(UserContext);

  useEffect(() => {
    socket = io('http://localhost:5000', {
      auth: {
        token: localStorage.getItem('token'),
      },
    });

    socket.on('new message', () => {
      socket.emit('load messages', contact?.id);
    });

    socket.on('connect_error', (err) => {
      console.error(err.message); // not authorized
    });
    loadContacts();
    loadMessages();

    return () => {
      socket.disconnect();
    };
  }, [messages]); // code here

  const loadContacts = () => {
    socket.emit('load customer contacts');
    socket.on('customer contacts', (data) => {
      // filter just customers which have sent a message
      let dataContacts = data.map((item) => ({
        ...item,
        message:
          messages.length > 0
            ? messages[messages.length - 1].message
            : 'Click here to start message',
      }));
      setContacts(dataContacts);
    });
  };

  // used for active style when click contact
  const onClickContact = (data) => {
    setContact(data);
    socket.emit('load messages', data.id);
  };

  const loadMessages = () => {
    socket.on('messages', async (data) => {
      console.log(data);
      if (data.length > 0) {
        const dataMessages = data.map((item) => ({
          id_sender: item.sender.id,
          message: item.message,
        }));
        setMessages(dataMessages);
      } else {
        setMessages([]);
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
            <ContactByJody
              dataContact={contacts}
              clickContact={onClickContact}
              contact={contact}
            />
          </Col>
          <Col md={8}>
            <Row className="g-0">
              <Col md={12} className="">
                <div className="messages-container">
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

export default ComplainAdmin;
