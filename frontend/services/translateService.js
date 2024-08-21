// frontend/services/translateService.js
import axios from 'axios';
import { handleError } from '../utils/errorHandler';

const API = axios.create({
    baseURL: 'http://your-backend-url.com/api',
});

export const translateText = async (text, targetLanguage) => {
    try {
        const response = await API.post('/translate', { text, targetLanguage });
        return response.data.translatedText;
    } catch (error) {
        handleError(error);
        throw error;
    }
};

export const detectLanguage = async (text) => {
    try {
        const response = await API.post('/detect-language', { text });
        return response.data.language;
    } catch (error) {
        handleError(error);
        throw error;
    }
};
