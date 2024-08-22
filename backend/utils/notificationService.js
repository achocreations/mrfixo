// /backend/utils/notificationService.js
const admin = require('firebase-admin');

admin.initializeApp({
  credential: admin.credential.cert(require('../config/serviceAccountKey.json')),
});

exports.sendNotification = (token, title, body) => {
  const message = {
    notification: {
      title,
      body,
    },
    token,
  };

  admin.messaging().send(message)
    .then(response => {
      console.log('Successfully sent message:', response);
    })
    .catch(error => {
      console.log('Error sending message:', error);
    });
};
