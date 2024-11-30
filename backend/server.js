const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

//route for speech to text
app.post("/speech-to-text", async (req, res) => {
    const { audioData } = req.body;
    
    res.json({ transcript: "Hello, how are you" });
});

//route for translation
app.post("/translate", async (req, res) => {
    const { text, targetLanguage } = req.body;
    try {
        const response = await axios.post(
            "https://translation.googleapis.com/language/translate/v2",
            null,
            {
                params: {
                    q: text,
                    target: targetLanguage,
                    key: "google-translate-api-key",
                },
            }
        );
        res.json({ translatedText: response.data.data.translations[0].translatedText });
    } catch (error) {
        res.status(500).send("Translation Error");
    }
});

app.listen(5000, () => {
    console.log("Server is running on port 5000");
});