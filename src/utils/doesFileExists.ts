import fs from 'fs';

const doesFileExists = (filePath: string) => fs.existsSync(filePath);

export default doesFileExists;
