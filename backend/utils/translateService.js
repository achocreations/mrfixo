// backend/utils/translateService.js
const { Translate } = require('@google-cloud/translate').v2;
const path = require('path');

// Initialize the Google Cloud Translate API client
const translate = new Translate({
    keyFilename: path.join(__dirname, 'path-to-your-service-account-file.json')
});

// Function to detect the language of a given text
const detectLanguage = async (text) => {
    try {
        const [detection] = await translate.detect(text);
        return detection.language;
    } catch (error) {
        throw new Error('Error detecting language: ' + error.message);
    }
};

// Function to translate text from one language to another
const translateText = async (text, targetLanguage) => {
    try {
        const [translation] = await translate.translate(text, targetLanguage);
        return translation;
    } catch (error) {
        throw new Error('Error translating text: ' + error.message);
    }
};

module.exports = {
    detectLanguage,
    translateText
};
