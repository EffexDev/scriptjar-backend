const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(cors({
    origin: 'https://scriptjar.jordancartledge.com.au',  // Frontend domain
    methods: 'GET,POST',  // Allowed methods
    allowedHeaders: 'Content-Type',  // Allowed headers for the request
    credentials: true,  // Allow cookies (optional)
    preflightContinue: false,  // Make sure the OPTIONS request is handled
}));

app.options('*', cors());

// POST endpoint for doubling the number
app.post('/double', (req, res) => {
    const { number } = req.body;
    
    if (typeof number !== 'number') {
        return res.status(400).json({ error: 'Invalid input. Please send a number.' });
    }
    
    const doubled = number * 2;
    res.json({ result: doubled });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
