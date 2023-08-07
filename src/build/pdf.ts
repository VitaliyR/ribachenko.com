import puppeteer from 'puppeteer';
import config from '../config';

const PDFs = [
  {
    url: new URL('cv', config.localUrl).toString(),
    file: 'static/cv.pdf'
  },
  {
    url: new URL('cv?short', config.localUrl).toString(),
    file: 'static/cv-short.pdf'
  }
];

const pdf = async function pdf() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--font-render-hinting=none']
  });

  const jobs = PDFs.map(async (task) => {
    const page = await browser.newPage();
    await page.goto(task.url, { waitUntil: 'networkidle0' });
    await page.pdf({
      path: task.file,
      format: 'A4'
    });
  });

  await Promise.all(jobs);
  await browser.close();
};

pdf().then(() => {
  console.log('PDF Saved');
});
