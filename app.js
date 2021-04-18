const fs = require('fs');
const express = require('express');

const app = express();

const tours = JSON.parse(
    fs.readFileSync('./dev-data/data/tours-simple.json', 'utf8')
);

app.get('/api/v1/tours', (req, res) => {
    res.status(200).json({
        status: 'success',
        results: tours.length,
        data: { tours },
    });
});

const port = 3000;
app.listen(port, () => {
    console.log('Started');
});
