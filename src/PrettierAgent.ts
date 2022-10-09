import NotImplementedError from './exceptions/NotImplementedError';
import * as fs from 'fs';

const prettier = require('prettier');

type PrettierType = InstanceType<typeof prettier>;

class PrettierAgent {
  private prettier: PrettierType;

  constructor() {
    this.prettier = prettier;
  }

  public loadConfig(path: string): void {
    this.prettier.resolveConfigFile.sync(path);
  }

  public beautifySingleFile(path: string): void {
    throw new NotImplementedError();
  }

  public loadFileContent(path: string): string {
    const fileBuffer = fs.readFileSync(path);
    return fileBuffer.toString('utf-8');
  }

  public beautifyCode(code: string): string {
    throw new NotImplementedError();
  }

  public overwriteFileContent(path: string, code: string): void {
    throw new NotImplementedError();
  }
}

export default PrettierAgent;
