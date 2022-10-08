import NotImplementedError from './exceptions/NotImplementedError';

class PrettierAutoRunner {
  constructor() {}

  public run(): void {
    throw new NotImplementedError();
  }

  private beautify(filePaths: Array<string>): void {
    throw new NotImplementedError();
  }

  private applyChangesToPullRequest(): void {
    throw new NotImplementedError();
  }
}

export default PrettierAutoRunner;
