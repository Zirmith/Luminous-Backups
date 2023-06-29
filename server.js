const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// In-memory storage for backup data
const backupData = [];

// Route to handle backup POST requests
app.post('/backups', (req, res) => {
  const { hwid, status } = req.body;

  if (hwid && typeof status === 'boolean') {
    // Check if the HWID already exists in the backup data
    const found = backupData.some(item => item.hwid === hwid);

    if (found) {
      // HWID found in the backup data
      res.json({ found: true });
    } else {
      // HWID not found in the backup data
      // Add the HWID to the backup data
      backupData.push({ hwid, status });
      res.json({ found: false });
    }
  } else {
    res.status(400).json({ error: 'Invalid HWID or status.' });
  }
});

// Route to retrieve all backup data
app.get('/backups', (req, res) => {
  res.json(backupData);
});

// Start the server
const port = 3000; // Replace with your desired port number
app.listen(port, () => {
  console.log(`Backup API is running on port ${port}.`);
});
