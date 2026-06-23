// api/track.js
import { Buffer } from 'buffer';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const token = process.env.GH_TOKEN; // set in Vercel env vars
  const owner = process.env.GITHUB_OWNER;
  const repo = process.env.GITHUB_REPO;
  const branch = process.env.GITHUB_BRANCH || 'main';
  const path = process.env.TRACKER_PATH || 'tracker.log';

  const { ua, ip, page } = req.body || {};
  const line = `${new Date().toISOString()} | ${ip || 'unknown'} | ${ua || 'unknown'} | ${page || ''}\n`;

  // 1. Get existing file
  const getUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${path}?ref=${branch}`;
  const getResp = await fetch(getUrl, {
    headers: { Authorization: `token ${token}`, Accept: 'application/vnd.github.v3+json' }
  });

  let oldContent = '';
  let sha = null;
  if (getResp.status === 200) {
    const json = await getResp.json();
    oldContent = Buffer.from(json.content, 'base64').toString('utf8');
    sha = json.sha;
  } else if (getResp.status !== 404) {
    return res.status(502).json({ error: 'Failed to read tracker file' });
  }

  // 2. Append and PUT
  const newContent = oldContent + line;
  const b64 = Buffer.from(newContent, 'utf8').toString('base64');
  const putUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;
  const body = {
    message: `tracker: append visit ${new Date().toISOString()}`,
    content: b64,
    branch
  };
  if (sha) body.sha = sha;

  const putResp = await fetch(putUrl, {
    method: 'PUT',
    headers: {
      Authorization: `token ${token}`,
      Accept: 'application/vnd.github.v3+json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });

  if (!putResp.ok) {
    const err = await putResp.text();
    console.error('GitHub PUT error', putResp.status, err);
    return res.status(502).json({ error: 'Failed to update tracker file' });
  }

  return res.status(204).end();
}
