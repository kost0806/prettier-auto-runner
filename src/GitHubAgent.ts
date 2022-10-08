import NotImplementedError from './exceptions/NotImplementedError';

class GitHubAgent {
  constructor() {}

  public getChangedFilePaths(): Array<string> {
    throw new NotImplementedError();
  }

  public getRawFileContent(filePath: string): string {
    throw new NotImplementedError();
  }

  public addFiles(filePaths: Array<string>): void {
    throw new NotImplementedError();
  }

  public commit(): void {
    throw new NotImplementedError();
  }

  public push(): void {
    throw new NotImplementedError();
  }
}

export default GitHubAgent;
