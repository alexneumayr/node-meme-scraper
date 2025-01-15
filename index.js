import fs, { existsSync, mkdirSync } from 'node:fs';
import client from 'node:https';

let websiteContent = '';

// Create "memes" folder
const folderName = './memes';
try {
  if (!existsSync(folderName)) {
    mkdirSync(folderName);
  }
} catch (err) {
  console.error(err);
}

// Function to fetch the website
async function getWebsite() {
  try {
    const response = await fetch(
      'https://memegen-link-examples-upleveled.netlify.app',
    );
    if (response.ok) {
      const textResponse = await response.text();
      return textResponse;
    } else {
      throw new Error('Request failed!');
    }
  } catch (error) {
    console.log(error);
  }
}

// Function to save image URLs in an array
async function imageUrlsToArray() {
  const websiteContent = await getWebsite();

  let tempArray;
  const urls = [];
  const rex = /<img[^>]+src="?([^"\s]+)"?\s*\/>/g;

  while ((tempArray = rex.exec(websiteContent))) {
    urls.push(tempArray[1]);
  }
  urls.length = 10;
  console.log(urls);
}

// Function to download images
function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    client.get(url, (res) => {
      if (res.statusCode === 200) {
        res
          .pipe(fs.createWriteStream(filepath))
          .on('error', reject)
          .once('close', () => resolve(filepath));
      } else {
        res.resume();
        reject(
          new Error(`Request Failed With a Status Code: ${res.statusCode}`),
        );
      }
    });
  });
}
