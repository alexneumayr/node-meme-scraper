import { existsSync, mkdirSync } from 'node:fs';

const folderName = './memes';
try {
  if (!existsSync(folderName)) {
    mkdirSync(folderName);
  }
} catch (err) {
  console.error(err);
}
