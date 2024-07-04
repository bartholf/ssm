import fs from 'fs';

const getFileContent = (filePath: string): string => {
  try {
    return fs.readFileSync(filePath, 'utf-8');
  } catch (e) {
    console.error(`Error reading file: ${filePath}`);
    process.exit(1);
  }
};

export const FileParser = {
  parseJson: <T = []>(filePath: string): T => {
    const content = getFileContent(filePath);
    try {
      return JSON.parse(content);
    } catch (e) {
      console.error(`Error parsing JSON: ${filePath}`);
      process.exit(1);
    }
  },
};
