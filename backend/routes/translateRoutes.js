// backend/routes/translateRoutes.js
const express = require('express');
const { detectLanguage, translateText } = require('../utils/translateService');
const router = express.Router();

router.post('/translate', async (req, res) => {
    const { text, targetLanguage } = req.body;

    try {
        const translatedText = await translateText(text, targetLanguage);
        res.json({ success: true, translatedText });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

router.post('/detect-language', async (req, res) => {
    const { text } = req.body;

    try {
        const language = await detectLanguage(text);
        res.json({ success: true, language });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

module.exports = router;
