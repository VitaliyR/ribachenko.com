import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { getFiles } from '../lib/utils-server.mjs';

const DEFAULTS = {
  input: './static/assets',
  output: './static/g',
  assetsUrl: '/assets',
  quality: 80,
  pngLevel: 8
};

class ImagePreprocessor {
  processFoldersRunIds = [];

  constructor(opts) {
    this.options = {
      ...DEFAULTS,
      ...opts
    };
  }

  optimize(buffer, outPath) {
    return sharp(buffer)
      .jpeg({ quality: this.options.quality, progressive: false, force: false })
      .webp({ quality: this.options.quality, lossless: true, force: false })
      .png({ compressionLevel: this.options.pngLevel, force: false })
      .toFile(outPath)
      .catch(() => true);
  }

  async processFoldersOnce() {
    const runId = this.options.input;

    if (this.processFoldersRunIds.includes(runId)) {
      return;
    }
    this.processFoldersRunIds.push(runId);

    const input = path.resolve(this.options.input);

    for await (const f of getFiles(input)) {
      const ext = path.extname(f);
      const fileName = path.basename(f, ext);
      const relativePath = path.relative(input, f);
      const dirName = path.dirname(relativePath);

      if (!['.webp', '.png', '.jpg', '.jpeg'].includes(ext)) {
        continue;
      }

      const buffer = await fs.promises.readFile(f);

      const outputDir = path.resolve(path.join(this.options.output, dirName));
      await fs.promises.mkdir(outputDir, { recursive: true });

      await Promise.all([
        this.optimize(buffer, path.resolve(path.join(this.options.output, relativePath))),
        ext === '.webp' ? true : this.optimize(buffer, path.join(outputDir, `${fileName}.webp`))
      ]);
    }
  }

  markup = async (data) => {
    await this.processFoldersOnce();
    return data;
  };
}

export default (opts) => new ImagePreprocessor(opts);
