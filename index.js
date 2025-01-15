import { existsSync, mkdirSync } from 'node:fs';

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
