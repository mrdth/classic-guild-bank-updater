import fs from 'fs';
const readline = require('readline');

class FileParser {
  filePath: string;
  exportStrings: string[] = [];

  constructor (filePath: string) { this.filePath = filePath; }

  async parse (): Promise<string[]> {
    const readInterface = readline.createInterface({
      input: fs.createReadStream(this.filePath),
      // output: process.stdout,
      console: false
    });

    for await (const line of readInterface) {
      this.checkLine(line);
    }

    return this.exportStrings;
  }

  checkLine (line: string) {
    const pattern = 'exportString';
    if (line.indexOf(pattern) !== -1) {
      this.exportStrings.push(line.replace('["exportString"] = "', '').replace(/",/, '').trim());
    }
  }
}

export default FileParser;
