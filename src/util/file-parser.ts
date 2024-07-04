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

/*
  getContent = (): string[][] => {
    const content = fs.readFileSync(this.#filePath, 'utf-8');
    const out: string[][] = [];
    content.split(/\r?\n/).map((line) => {
      if (line.trim() !== '') {
        out.push(line.trim().split(/\ +/));
      }
    });
    return out;
  };
  */
