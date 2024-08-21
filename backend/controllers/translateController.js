const { translateText, detectLanguage } = require('../utils/translateService');
const { ErrorResponse } = require('../utils/errorHandler');
const logger = require('../utils/logger');

const translate = async (req, res, next) => {
    const { text, targetLanguage } = req.body;

    try {
        logger.info(`Translating text to ${targetLanguage}`);
        const translatedText = await translateText(text, targetLanguage);
        res.status(200).json({ success: true, translatedText });
    } catch (error) {
        next(new ErrorResponse(error.message, 500));
    }
};

const detect = async (req, res, next) => {
    const { text } = req.body;

    try {
        logger.info('Detecting language');
        const language = await detectLanguage(text);
        res.status(200).json({ success: true, language });
    } catch (error) {
        next(new ErrorResponse(error.message, 500));
    }
};

module.exports = {
    translate,
    detect
};
