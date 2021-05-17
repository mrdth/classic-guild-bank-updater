import path from 'path';
import FileParser from '../FileParser';

describe('File Parser', () => {
  it('can be instantiated with a filename', () => {
    const fileParser = new FileParser('file');

    expect(fileParser.filePath).toBe('file');
  });

  it('extracts export strings from the file', async () => {
    const testFilePath = path.join(__dirname, '/testData/example.lua');
    const fileParser = new FileParser(testFilePath);
    const strings = await fileParser.parse();

    expect(strings).toEqual(['W0tjdGJhbmssMTQ4OTkzOCxlblVTXTtbLTEsLDAs=']); ;
  });
});
