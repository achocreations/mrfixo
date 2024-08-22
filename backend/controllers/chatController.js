// /backend/controllers/chatController.js
const Message = require('../models/Chat');

exports.fetchMessages = async (req, res) => {
  try {
    const { conversationId } = req.params;
    const messages = await Message.find({ conversationId });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.sendMessage = async (req, res) => {
  try {
    const { conversationId, text } = req.body;
    const message = new Message({
      conversationId,
      senderId: req.user.id,
      text,
    });
    await message.save();
    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

