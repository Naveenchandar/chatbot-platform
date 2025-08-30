import express from 'express';
import cors from 'cors';
import db from './db.js';

const app = express();
const PORT = 4000; // or any port you want

app.use(cors());
app.use(express.json());

app.post('/api/logs', (req, res) => {
  const { level, message, timestamp, userId, url, userAgent, stacktrace } = req.body;

  if (!message || !level) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  db.prepare(`
    INSERT INTO logs (level, message, timestamp, userId, url, userAgent, stacktrace)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `).run(level, message, timestamp, userId, url, userAgent, stacktrace);

  console.log(`[${level.toUpperCase()}] ${message}`);
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Logger API listening on http://localhost:${PORT}`);
});
