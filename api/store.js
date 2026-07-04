// api/store.js (Vercel serverless function)
import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { username, email, message } = req.body;

    // Define file path (inside server storage)
    const filePath = path.join(process.cwd(), 'data', 'user_data.txt');

    // Format data
    const logEntry = `User: ${username}, Email: ${email}, Message: ${message}\n`;

    // Append to file
    fs.appendFileSync(filePath, logEntry, 'utf8');

    res.status(200).json({ success: true, message: 'Data stored successfully!' });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
