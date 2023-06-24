import fs from 'fs';
import path from 'path';
import frontmatter, { type FrontMatterResult } from 'front-matter';
import { parseMarkdown } from './md-utils';
import { getFiles } from './utils-server.mjs';

const DATA_DIR = path.resolve('src/data/');

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type PageData = FrontMatterResult<any>;

export const loadAllPages = async () => {
  const allData: Record<string, PageData> = {};
  for await (const f of getFiles(DATA_DIR)) {
    if (path.extname(f) !== '.md') {
      continue;
    }
    const relativePath = path.relative(DATA_DIR, f);
    const rawData = await fs.promises.readFile(f, 'utf-8');
    const data = frontmatter(rawData);
    allData[relativePath] = {
      ...data,
      body: parseMarkdown(data.body)
    };
  }
  return allData;
};
