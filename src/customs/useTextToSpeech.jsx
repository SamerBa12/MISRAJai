import { useEffect, useCallback } from 'react';

const useTextToSpeech = (text) => {
    // دالة لتحويل النص إلى صوت
    const speak = useCallback((text) => {
        if (text) {
            const utterance = new SpeechSynthesisUtterance(text);
            // يمكنك تخصيص خصائص الصوت هنا مثل حجم الصوت وسرعته
            utterance.volume = 1; // قيمة بين 0 و 1
            utterance.rate = 1; // قيمة بين 0.1 و 10
            utterance.pitch = 1; // قيمة بين 0 و 2
            speechSynthesis.speak(utterance);
        }
    }, []);

    useEffect(() => {
        // استدعاء الدالة عند تغيير النص
        speak(text);
    }, [text, speak]); // تتبع النص و speak

    return speak;
};

export default useTextToSpeech;
