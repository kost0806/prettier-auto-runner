import NotImplementedError from './exceptions/NotImplementedError';

class PrettierAgent {
  constructor() {}

  public loadConfig(path: string): void {
    throw new NotImplementedError();
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
