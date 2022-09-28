import fetch from 'node-fetch';
import process from 'process';
import fs from 'fs';
import dotenv from 'dotenv';
import sharp from 'sharp';

import siteConfig from '../data/config.json' assert { type: 'json' };

dotenv.config();

const mapboxKey = process.env.MAPBOX_KEY;
if (!mapboxKey) {
  throw new Error('Mapbox key not provided');
}

const { currentPlace } = siteConfig;
const mapStyles = ['light', 'dark'];

const getMapUrl = (style: string): string => {
  const centerPos = `${currentPlace.lng},${currentPlace.lat}`;
  return `https://api.mapbox.com/styles/v1/mapbox/${style}-v10/static/pin-l+EC0005(${centerPos})/${centerPos},4,0,0/640x1080?access_token=${mapboxKey}`; // eslint-disable-line max-len
};

const downloadMap = async () => {
  console.log('Download map');

  const imagesRequests = mapStyles.map(getMapUrl).map((url) => fetch(url));

  const imagesRaws = await Promise.all(imagesRequests);

  return Promise.all(
    imagesRaws.map(async (imageRaw, index) => {
      const buffer = await imageRaw.buffer();
      await fs.promises.mkdir('./static/g', { recursive: true });
      await fs.promises.writeFile(`./static/g/${mapStyles[index]}Map.png`, buffer, 'binary');
      const webp = await sharp(buffer).webp().toBuffer();
      return fs.promises.writeFile(`./static/g/${mapStyles[index]}Map.webp`, webp, 'binary');
    })
  );
};

downloadMap().then(() => {
  console.log('Map saved');
});
