// Harsh
// server/log_ingestor.js
const { MongoClient } = require('mongodb');
const { DATABASE_URL, DATABASE_NAME } = require('./config');

async function ingestLog(logData) {
    if (!isValidLog(logData)) {
        throw new Error('Invalid log format');
    }

    const client = new MongoClient(DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        await client.connect();
        console.log('Connected to MongoDB.');

        const db = client.db(DATABASE_NAME);
        const collection = db.collection('logs');

        // Create a text index for the message field
        await collection.createIndex({ message: 'text' });

        await collection.insertOne(logData);

        console.log('Log ingested successfully.');
    } catch (error) {
        console.error(`Error ingesting log: ${error}`);
        throw error;
    } finally {
        await client.close();
    }
}

async function searchLogs(query) {
    const client = new MongoClient(DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        await client.connect();
        console.log('Connected to MongoDB.');

        const db = client.db(DATABASE_NAME);
        const collection = db.collection('logs');

        const result = await collection.find(query).toArray();
        console.log('Search successful.');

        return result;
    } catch (error) {
        console.error(`Error searching logs: ${error}`);
        throw error;
    } finally {
        await client.close();
    }
}

function isValidLog(logData) {
    if (!logData) {
        console.error('Invalid log format: Log data is missing.');
        return false;
    }

    const requiredFields = ['level', 'message', 'resourceId', 'timestamp', 'traceId', 'spanId', 'commit'];

    for (const field of requiredFields) {
        if (!logData[field]) {
            console.error(`Invalid log format: Missing required field - ${field}`);
            return false;
        }
    }

    return true;
}

module.exports = { ingestLog, searchLogs, isValidLog };
