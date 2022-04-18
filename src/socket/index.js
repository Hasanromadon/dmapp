// import models
const { chats, users, profiles } = require('../../models');

const jwt = require('jsonwebtoken');

const { Op } = require('sequelize');

// init variable here
const connectedUser = {};

const socketIo = (io) => {
  // create middlewares before connection event
  // to prevent client access socket server without token
  io.use((socket, next) => {
    if (socket.handshake.auth && socket.handshake.auth.token) {
      next();
    } else {
      next(new Error('Not Authorized'));
    }
  });

  io.on('connection', async (socket) => {
    console.log('client connect: ', socket.id);

    const token = socket.handshake.auth.token;
    const tokenKey = process.env.JWT_SECRET;
    const userId = jwt.verify(token, tokenKey).id;

    connectedUser[userId] = socket.id;

    // define listener on event load admin contact
    socket.on('load admin contact', async () => {
      try {
        let adminContact = await users.findOne({
          include: [
            {
              model: profiles,
              as: 'profile',
              attributes: {
                exclude: ['createdAt', 'updatedAt'],
              },
            },
          ],
          where: {
            role: 'admin',
          },
          attributes: {
            exclude: ['createdAt', 'updatedAt', 'password'],
          },
        });
        adminContact = JSON.parse(JSON.stringify(adminContact));
        adminContact.profile.image =
          process.env.PATH_FILE + '/users/' + adminContact.profile.image;

        socket.emit('admin contact', adminContact);
      } catch (err) {
        console.log(err);
      }
    });

    // define listener on event load customer contact
    socket.on('load customer contacts', async () => {
      try {
        let customerContacts = await users.findAll({
          include: [
            {
              model: profiles,
              as: 'profile',
              attributes: {
                exclude: ['createdAt', 'updatedAt'],
              },
            },
            {
              model: chats,
              as: 'recipientMessage',
              attributes: {
                exclude: [
                  'createdAt',
                  'updatedAt',
                  'id_recipient',
                  'id_sender',
                ],
              },
            },
            {
              model: chats,
              as: 'senderMessage',
              attributes: {
                exclude: [
                  'createdAt',
                  'updatedAt',
                  'id_recipient',
                  'id_sender',
                ],
              },
            },
          ],
          attributes: {
            exclude: ['createdAt', 'updatedAt', 'password'],
          },
          where: {
            role: 'user',
          },
        });

        customerContacts = JSON.parse(JSON.stringify(customerContacts));
        customerContacts = customerContacts.map((item) => ({
          ...item,
          profile: {
            ...item.profile,
            image: item.profile?.image
              ? process.env.PATH_FILE + '/users/' + item.profile?.image
              : null,
          },
        }));

        socket.emit('customer contacts', customerContacts);
      } catch (err) {
        console.log(err);
      }
    });

    socket.on('load messages', async (payload) => {
      try {
        const id_recipient = payload;
        const id_sender = userId;

        let data = await chats.findAll({
          where: {
            id_recipient: {
              [Op.or]: [id_recipient, id_sender],
            },
            id_sender: {
              [Op.or]: [id_recipient, id_sender],
            },
          },
          include: [
            {
              model: users,
              as: 'recipient',
              attributes: {
                exclude: ['createdAt', 'updatedAt', 'password'],
              },
            },
            {
              model: users,
              as: 'sender',
              attributes: {
                exclude: ['createdAt', 'updatedAt', 'password'],
              },
            },
          ],
          attributes: {
            exclude: ['createdAt', 'updatedAt', 'id_recipient', 'id_sender'],
          },
          order: [['createdAt', 'ASC']],
        });

        data = JSON.parse(JSON.stringify(data));

        socket.emit('messages', data);
      } catch (error) {
        console.log(error);
      }
    });

    socket.on('send message', async (payload) => {
      try {
        const id_sender = userId;
        const { id_recipient, message } = payload;

        const data = { id_sender, id_recipient, message };

        await chats.create(data);

        io.to(socket.id).to(connectedUser[id_recipient]).emit('new message');
      } catch (error) {
        console.log(error);
      }
    });

    socket.on('disconnect', () => {
      console.log('client disconnected', socket.id);
      // code here
    });
  });
};

module.exports = socketIo;
