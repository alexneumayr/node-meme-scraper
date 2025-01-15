import fs from 'node:fs';
import client from 'node:https';

// Create "memes" folder
const folderName = './memes';
try {
  if (!fs.existsSync(folderName)) {
    fs.mkdirSync(folderName);
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
function imageUrlsToArray(websiteContent) {
  let tempArray;
  const urls = [];
  const rex = /<img[^>]+src="?([^"\s]+)"?\s*\/>/g;

  while ((tempArray = rex.exec(websiteContent))) {
    urls.push(tempArray[1]);
  }
  urls.length = 10;
  return urls;
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

// Function to download images from an array containing images URLs and save it in the memes folder
function downloadFromArray(urlArray) {
  urlArray.forEach((imageURL, index) =>
    downloadImage(
      imageURL,
      index < 10 ? `./memes/0${index + 1}.jpg` : `./memes/${index + 1}.jpg`,
    ),
  );
}

// Function containing the main functionality of the application
async function main() {
  // Save website content in a variable
  const websiteContent = await getWebsite();
  // Extract URLs from the website content and save it in an array
  const urlArray = imageUrlsToArray(websiteContent);
  // Download the images from the array
  downloadFromArray(urlArray);
}

main().catch((error) => console.error('Error:', error));
