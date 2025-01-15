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
const getWebsite = async () => {
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
};

getWebsite()
  .then((website) => {
    websiteContent = website;
    console.log(websiteContent);
  })
  .catch((error) => console.log(error));
