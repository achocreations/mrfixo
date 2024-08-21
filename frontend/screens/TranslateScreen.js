// frontend/screens/TranslateScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { translateText } from '../services/translateService';

const TranslateScreen = () => {
    const [text, setText] = useState('');
    const [translatedText, setTranslatedText] = useState('');

    const handleTranslate = async () => {
        try {
            const translation = await translateText(text, 'es'); // 'es' for Spanish, 'en' for English
            setTranslatedText(translation);
        } catch (error) {
            console.error('Translation failed', error);
        }
    };

    return (
        <View>
            <Text>Enter Text:</Text>
            <TextInput
                value={text}
                onChangeText={setText}
                placeholder="Enter text to translate"
            />
            <Button title="Translate to Spanish" onPress={handleTranslate} />
            {translatedText ? (
                <View>
                    <Text>Translated Text:</Text>
                    <Text>{translatedText}</Text>
                </View>
            ) : null}
        </View>
    );
};

export default TranslateScreen;
