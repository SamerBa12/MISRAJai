import React, { useState, useEffect } from 'react';
import '../assets/css/homePage.css';
import { Flex, Text } from '@mantine/core';
import listeningImg from '../assets/image/listening.png';
import speakingImg from '../assets/image/talking.png';
import excitedImg from '../assets/image/success.png';
import errorImg from '../assets/image/wrong.png';

import useSpeechRecognition from '../customs/useSpeechRecognition';
import useTextToSpeech from '../customs/useTextToSpeech';
import ShahadaRecitation from '../components/ShahadaRecitation';

const HomePage = () => {
    const { transcript, isListening, startListening, stopListening } = useSpeechRecognition();
    const [interactionState, setInteractionState] = useState('idle');
    const speak = useTextToSpeech();

    const getImage = () => {
        switch (interactionState) {
            case 'listening':
                return listeningImg;
            case 'speaking':
                return speakingImg;
            case 'excited':
                return excitedImg;
            case 'error':
                return errorImg;
            default:
                return listeningImg;
        }
    };

    const handleStartListening = () => {
        startListening();
        setInteractionState('listening');
    };

    const handleStopListening = () => {
        stopListening();
        setInteractionState('idle');
    };

    // تغيير حالة الصورة عند وجود خطأ في النطق
    useEffect(() => {
        if (interactionState === 'listening' && transcript) {
            // يمكنك إضافة منطق هنا لتحديد ما إذا كان النطق صحيحًا أم لا
            setInteractionState('error'); // أو 'excited' في حالة النجاح

            // إعادة الصورة إلى حالة الاستماع بعد فترة
            setTimeout(() => {
                setInteractionState('listening');
            }, 2000);
        }
    }, [transcript]);

    return (
        <div className='homePage'>
            <Flex direction="column" align="center" gap="xl">
                <Text fz={64}>SHAHADA</Text>
                <Text fz={20}>Your first step on your path to Islam.</Text>

                <img
                    src={getImage()}
                    alt="interaction-state"
                    className="interaction-image"
                />
                {transcript}
                <ShahadaRecitation
                    transcript={transcript}
                    isListening={isListening}
                    onStartListening={handleStartListening}
                    onStopListening={handleStopListening}
                />
            </Flex>
        </div>
    );
};

export default HomePage;