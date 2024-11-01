import React, { useState, useEffect } from 'react';
import { Flex, Text, Button } from '@mantine/core';

const ShahadaRecitation = ({ transcript, isListening, onStartListening, onStopListening }) => {
    const [step, setStep] = useState('ready'); // ready, language, recitation
    const [userLanguage, setUserLanguage] = useState('');
    const [currentWord, setCurrentWord] = useState(0);
    const [showCorrection, setShowCorrection] = useState(false);
    const [lastAttempt, setLastAttempt] = useState('');

    const shahadaWords = [
        {
            arabic: 'اشهد',
            latin: 'ashhadu',
            translation: {
                en: 'I bear witness',
                fr: 'Je témoigne',
            }
        },
        {
            arabic: 'أن',
            latin: 'anna',
            translation: {
                en: 'that',
                fr: 'que',
            }
        },
        {
            arabic: 'لا',
            latin: 'la',
            translation: {
                en: 'there is no',
                fr: 'il n\'y a pas',
            }
        },
        {
            arabic: 'إله',
            latin: 'ilaha',
            translation: {
                en: 'deity',
                fr: 'de divinité',
            }
        },
        {
            arabic: 'إلا',
            latin: 'illa',
            translation: {
                en: 'except',
                fr: 'sauf',
            }
        },
        {
            arabic: 'الله',
            latin: 'Allah',
            translation: {
                en: 'Allah',
                fr: 'Allah',
            }
        },
        {
            arabic: 'محمد',
            latin: 'Muhammad',
            translation: {
                en: 'Muhammad',
                fr: 'Muhammad',
            }
        },
        {
            arabic: 'رسول',
            latin: 'rasulu',
            translation: {
                en: 'messenger',
                fr: 'messager',
            }
        },
        {
            arabic: 'الله',
            latin: 'Allah',
            translation: {
                en: 'of Allah',
                fr: 'd\'Allah',
            }
        }
    ];

    // بدء الاستماع عندما نكون في مرحلة التطك
    useEffect(() => {
        if (step === 'recitation') {
            onStartListening();
        }
    }, [step, currentWord]);


    const checkPronunciation = (transcript) => {
        const userInput = transcript.toLowerCase().trim();
        if (step === 'recitation') {
            if (currentWord < shahadaWords.length) {
                const currentTarget = userLanguage === 'native'
                    ? shahadaWords[currentWord].translation[userLanguage].toLowerCase()
                    : shahadaWords[currentWord].latin.toLowerCase();
                return userInput.includes(currentTarget);
            }
        }
        return false;
    };

    const handleCorrectPronunciation = () => {
        setShowCorrection(false);
        setTimeout(() => {
            moveToNextWord();
        }, 1000);
    };

    const handleIncorrectPronunciation = () => {
        setShowCorrection(true);
        onStopListening();
        setTimeout(() => {
            setShowCorrection(false);
            onStartListening();
        }, 3000);
    };

    const moveToNextWord = () => {
        onStopListening();
        if (currentWord < shahadaWords.length - 1) {
            setCurrentWord(prev => prev + 1);
            setLastAttempt('');
            setTimeout(() => {
                onStartListening();
            }, 1000);
        } else if (userLanguage === 'native') {
            setUserLanguage('arabic');
            setCurrentWord(0);
            setLastAttempt('');
            setTimeout(() => {
                onStartListening();
            }, 1000);
        } else {
            setStep('completed');
        }
    };

    const ReadyStep = () => (
        <Flex direction="column" align="center" gap="xl" className="ready-container">
            <Text size="2xl" weight={700} className="mb-4">
                هل أنت مستعد لنطق الشهادة؟
            </Text>
            <Button
                size="lg"
                onClick={() => setStep('language')}
                className="ready-button"
            >
                نعم، أنا مستعد
            </Button>
        </Flex>
    );

    const LanguageStep = () => (
        <Flex direction="column" align="center" gap="xl" className="language-container">
            <Text size="2xl" weight={700} className="mb-4">
                اختر لغتك الأم
            </Text>
            <Flex gap="md">
                <Button
                    size="lg"
                    onClick={() => {
                        setUserLanguage('en');
                        setStep('recitation');
                    }}
                >
                    English
                </Button>
                <Button
                    size="lg"
                    onClick={() => {
                        setUserLanguage('fr');
                        setStep('recitation');
                    }}
                >
                    Français
                </Button>
            </Flex>
        </Flex>
    );

    const RecitationStep = () => (
        <Flex direction="column" align="center" gap="lg" className="recitation-container">
            <Text size="xl" weight={700}>
                {userLanguage === 'native' ? 'كرر بلغتك:' : 'كرر باللغة العربية:'}
            </Text>

            <div className="word-display">
                <Text size="2xl" className="mb-2">
                    {userLanguage === 'native'
                        ? shahadaWords[currentWord].translation[userLanguage]
                        : shahadaWords[currentWord].latin}
                </Text>
                {userLanguage !== 'native' && (
                    <Text size="xl" color="dimmed">
                        {shahadaWords[currentWord].arabic}
                    </Text>
                )}
            </div>

            {showCorrection && (
                <Flex direction="column" align="center" gap="sm" className="correction-feedback">
                    <Text color="red" size="lg">حاول مرة أخرى</Text>
                    <Text>النطق الصحيح:</Text>
                    <Text size="lg" weight={700}>
                        {userLanguage === 'native'
                            ? shahadaWords[currentWord].translation[userLanguage]
                            : shahadaWords[currentWord].latin}
                    </Text>
                </Flex>
            )}

            {lastAttempt && (
                <Text size="sm" color="dimmed">
                    ما سمعته: {lastAttempt}
                </Text>
            )}
        </Flex>
    );

    const CompletedStep = () => (
        <Flex direction="column" align="center" gap="md">
            <Text size="2xl" weight={700} color="green">
                أحسنت!
            </Text>
            <Text size="lg">
                لقد أتممت نطق الشهادة بنجاح.
            </Text>
        </Flex>
    );

    // عرض الخطوة المناسبة بناء على الحالة الحالية
    const renderStep = () => {
        switch (step) {
            case 'ready':
                return <ReadyStep />;
            case 'language':
                return <LanguageStep />;
            case 'recitation':
                return <RecitationStep />;
            case 'completed':
                return <CompletedStep />;
            default:
                return <ReadyStep />;
        }
    };

    return (
        <div className="shahada-container">
            {renderStep()}
        </div>
    );
};

export default ShahadaRecitation;