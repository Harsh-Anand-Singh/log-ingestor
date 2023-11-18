// Harsh
// server/server.js
const express = require('express');
const bodyParser = require('body-parser');
const { ingestLog, searchLogs } = require('./log_ingestor');
const { PORT } = require('./config');

const app = express();

app.use(bodyParser.json());

app.post('/ingest', async (req, res) => {
    const logData = req.body;
    try {
        await ingestLog(logData);
        res.send('Log ingested successfully');
    } catch (error) {
        console.error(`Error ingesting log: ${error}`);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/search', async (req, res) => {
    const { level, message, resourceId, timestamp, traceId, spanId, commit, parentResourceId, startDate, endDate } = req.query;

    const query = {
        level,
        message: { $regex: new RegExp(message, 'i') }, // Case-insensitive message search
        resourceId,
        timestamp,
        traceId,
        spanId,
        commit,
        'metadata.parentResourceId': parentResourceId,
    };

    if (startDate && endDate) {
        query.timestamp = {
            $gte: new Date(startDate),
            $lte: new Date(endDate),
        };
    }

    try {
        const result = await searchLogs(query);
        res.json(result);
    } catch (error) {
        console.error(`Error searching logs: ${error}`);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(PORT, (error) => {
    if (error) {
        console.error(`Error starting the server: ${error}`);
    } else {
        console.log(`Server running on http://localhost:${PORT}`);
    }
});

