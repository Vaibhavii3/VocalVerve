import React, { useState } from "react";
import axios from "axios";

const SpeechInput = () => {
    const [transcript, setTranscript] = useState("");
    const [translatedText, setTranslatedText] = useState("");

    const handleAudioCapture = async () => {
        const audioData = "base64AudioData";

        const response = await axios.post("http://localhost:5000/", {
            audioData,
        });
        setTranscript(response.data.transcript);

        const translationResponse = await axios.post("http://localhost:5000/translate", {

            text: response.data.transcript,
            targetLanguage: "es",
        });
        setTranslatedText(translationResponse.data.translatedText);
    };

    return (
        <div style={{ 
            backgroundColor: "wheat",
        }}>
            <button onClick={handleAudioCapture}>Start Translation</button>
            <div>
                <h3> Transcript: </h3>
                <p> {transcript} </p>
                <h3> Translation: </h3>
                <p> {translatedText} </p>
            </div>
        </div>
    );
};

export default SpeechInput;