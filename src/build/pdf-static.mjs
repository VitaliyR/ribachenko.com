import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';

const PORT = 4000;
const BUILD_DIR = 'build';
const FILES = ['cv.pdf', 'cv-short.pdf'];

const waitForServer = async (url, attempts = 60) => {
  for (let i = 0; i < attempts; i += 1) {
    try {
      const response = await fetch(url);
      if (response.ok) {
        return true;
      }
    } catch {
      /* empty */
    }
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
  return false;
};

const run = (command, args) =>
  new Promise((resolve, reject) => {
    const child = spawn(command, args, { stdio: 'inherit' });
    child.on('error', reject);
    child.on('exit', (code) => (code === 0 ? resolve() : reject(new Error(`${command} exited with code ${code}`))));
  });

const preview = spawn('pnpm', ['exec', 'vite', 'preview', '--port', String(PORT)], {
  stdio: 'inherit',
  detached: true
});

const stopPreview = () => {
  if (preview.exitCode !== null || preview.signalCode !== null) {
    return;
  }
  try {
    process.kill(-preview.pid, 'SIGTERM');
  } catch {
    /* empty */
  }
};

process.on('exit', stopPreview);
process.on('SIGINT', () => {
  stopPreview();
  process.exit(1);
});
process.on('SIGTERM', () => {
  stopPreview();
  process.exit(1);
});

try {
  if (!(await waitForServer(`http://localhost:${PORT}/cv`))) {
    throw new Error(`Preview server did not start on port ${PORT}`);
  }

  await run('pnpm', ['exec', 'puppeteer', 'browsers', 'install', 'chrome']);
  await run('pnpm', ['run', 'get:pdf']);

  for (const file of FILES) {
    fs.copyFileSync(path.join('static', file), path.join(BUILD_DIR, file));
  }
} finally {
  stopPreview();
}
