// useSpeechRecognition.js
import { useEffect, useState } from 'react';

const useSpeechRecognition = () => {
    const [transcript, setTranscript] = useState('');
    const [isListening, setIsListening] = useState(false);
    const [speechRecognition, setSpeechRecognition] = useState(null);

    useEffect(() => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();

        recognition.interimResults = true;
        recognition.lang = 'ar-SA';
        recognition.onresult = (event) => {
            const lastResultIndex = event.results.length - 1;
            setTranscript(event.results[lastResultIndex][0].transcript);
        };

        recognition.onstart = () => {
            setIsListening(true);
        };

        recognition.onend = () => {
            setIsListening(false);
        };

        setSpeechRecognition(recognition);

        return () => {
            recognition.stop();
        };
    }, []);

    const startListening = () => {
        if (speechRecognition) {
            setTranscript('');
            speechRecognition.start();
        }
    };

    const stopListening = () => {
        if (speechRecognition) {
            speechRecognition.stop();
        }
    };

    return { transcript, isListening, startListening, stopListening };
};

export default useSpeechRecognition;
