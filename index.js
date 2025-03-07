const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

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
