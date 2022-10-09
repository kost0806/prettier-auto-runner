import NotImplementedError from './exceptions/NotImplementedError';

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
    throw new NotImplementedError();
  }

  public beautifyCode(code: string): string {
    throw new NotImplementedError();
  }

  public overwriteFileContent(path: string, code: string): void {
    throw new NotImplementedError();
  }
}

export default PrettierAgent;
