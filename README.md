# Log Ingestor - MERN Stack
The Log Ingestor System efficiently handles vast volumes of log data and provides a user-friendly query interface for searching through logs.
## How to Run the Project

1. Clone the repository: `git clone https://github.com/Harsh-Anand-Singh/log-ingestor.git`
2. Navigate to the project folder: `cd log-ingestor`
3. Install dependencies: `npm install`
4. Start the server: `npm start`

## System Design
The system consists of two main components:

## Log Ingestor (log_ingestor.js):

Responsible for ingesting logs into the system.
Ensures scalability to handle high volumes of logs efficiently.
Mitigates potential bottlenecks, such as I/O operations and database write speeds.
Runs an HTTP server on port 3000 for log ingestion.

## Query Interface (server.js):

Provides a user interface (Web UI or CLI) for full-text search across logs.
Includes filters based on log attributes: level, message, resourceId, timestamp, traceId, spanId, commit, metadata.parentResourceId.
Aims for efficient and quick search results.
Features Implemented

## Log Ingestor:

Ingests logs in the specified format.
Ensures scalability for handling high log volumes.
Mitigates potential bottlenecks.
HTTP server for log ingestion on port 3000.
Query Interface:

User interface (Web UI or CLI) for full-text search.
Filters for log attributes.
Efficient and quick search results.

## Advanced Features (Bonus)
Search within specific date ranges.
Utilize regular expressions for search.
Allow combining multiple filters.
Real-time log ingestion and searching capabilities.
Role-based access to the query interface.

Sample Queries
Find all logs with the level set to "error".
Search for logs with the message containing the term "Failed to connect".
Retrieve all logs related to resourceId "server-1234".
Filter logs between the timestamp "2023-09-10T00:00:00Z" and "2023-09-15T23:59:59Z".

##Identified Issues
None reported as of the current version.

##Configuration
Database URL and name are specified in config.js.
Default HTTP server port is 3000.

##Notes
Ensure MongoDB is running and accessible before starting the log ingestor

