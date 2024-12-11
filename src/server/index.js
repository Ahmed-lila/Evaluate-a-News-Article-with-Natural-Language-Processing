import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';
import 'dotenv/config';
import fetch from 'node-fetch';
import mockAPIResponse from './mockAPI.js';

const app = express();
const PORT = 8081;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('dist'));

app.get('/', function (req, res) {
    res.sendFile(path.resolve('dist/index.html'));
});

app.post('/add', async (req, res) => {
    const url = req.body.url;
    const apiKey = process.env.API_KEY;
    const baseURL = 'https://api.meaningcloud.com/sentiment-2.1';
    const fetchURL = `${baseURL}?key=${apiKey}&url=${url}&lang=en`;

    try {
        const response = await fetch(fetchURL);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const result = {
            text: data.sentence_list[0].text,
            score_tag: data.score_tag,
            agreement: data.agreement,
            subjectivity: data.subjectivity,
            confidence: data.confidence,
            irony: data.irony
        };
        res.send(result);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Error processing your request');
    }
});

app.get('/test', function (req, res) {
    res.send(mockAPIResponse);
});

app.listen(PORT, (error) => {
    if (error) throw new Error(error);
    console.log(`Server listening on port ${PORT}!`);
});

export default app;
