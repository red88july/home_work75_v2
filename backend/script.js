const express = require('express');
const Vigenere = require('caesar-salad').Vigenere;
const bodyParser= require('body-parser');
const cors = require('cors');
const app = express();
const port = 8000;

app.use(cors());

app.use(bodyParser.json());

app.post('/encode', (req, res) => {

    const password = req.body.password;
    const message = req.body.message;

    const encryptPass = Vigenere.Cipher(password).crypt(message);
    res.json({encoded: encryptPass});
});

app.post('/decode', (req, res) => {
    const password = req.body.password;
    const message = req.body.message;

    if (!password || !message) {
        return res.status(400).json({ error: 'Password and message are required.' });
    }

    const decryptionPassword = Vigenere.Decipher(password).crypt(message);
    res.json({ decoded: decryptionPassword });
});

// app.post('/decode', (req, res) => {
//
//     const password = req.body.password;
//     const message = req.body.message;
//     console.log('Password:', password);
//     console.log('Message:', message);
//
//     const decryptionPassword = Vigenere.Decipher(password).crypt(message);
//     res.json({decoded: decryptionPassword});
// });

app.listen(port, () => {
    console.log(`Server is online on ${port}`);
});