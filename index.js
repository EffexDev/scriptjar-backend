const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json()); // Middleware to parse JSON body

// Parse the Firebase service account JSON from an environment variable
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

app.post('/double', (req, res) => {

    const { number } = req.body;
    if (typeof number !== 'number') {
        return res.status(400).json({ error: 'Invalid input. Please send a number.' });
    }

    const doubled = number * 2;
    res.json({ result: doubled });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
