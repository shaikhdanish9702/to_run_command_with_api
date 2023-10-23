const express = require('express');
const { exec } = require('child_process');

const app = express();
const port = 3000; // You can change this to any port you prefer

app.use(express.json());

// API endpoint to run a command
app.post('/run-command', (req, res) => {
  const command = req.body.command;

  exec(command, (error, stdout, stderr) => {
    if (error) {
      res.status(500).json({ error: error.message });
      return;
    }
    if (stderr) {
      res.status(400).json({ error: stderr });
      return;
    }
    res.json({ output: stdout });
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
