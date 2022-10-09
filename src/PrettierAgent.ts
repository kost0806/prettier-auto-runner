import NotImplementedError from './exceptions/NotImplementedError';
import notImplementedError from './exceptions/NotImplementedError';

class PrettierAgent {
  constructor() {}

  public loadConfig(path: string): void {
    throw new NotImplementedError();
  }

  public beautifySingleFile(path: string): void {
    throw new NotImplementedError();
  }

  private loadFileContent(path: string): string {
    throw new NotImplementedError();
  }

  private beautifyCode(code: string): string {
    throw new NotImplementedError();
  }

  private overwriteFileContent(code: string): void {
    throw new NotImplementedError();
  }
}
