import GitHubAgent from './GitHubAgent';
import PrettierAgent from './PrettierAgent';

class PrettierAutoRunner {
  private githubAgent: GitHubAgent;
  private prettierAgent: PrettierAgent;

  constructor() {
    this.githubAgent = new GitHubAgent();
    this.prettierAgent = new PrettierAgent();
  }

  public async run(): Promise<void> {
    const changedFilePaths = await this.githubAgent.getChangedFilePaths();
    this.githubAgent.cloneToFileSystem();
    const actualFilePaths = changedFilePaths.map(
      (path) => `/tmp/_repo/${path}`
    );

    this.beautify(actualFilePaths);
    this.applyChangesToPullRequest(actualFilePaths);
  }

  private beautify(filePaths: Array<string>): void {
    for (const filePath of filePaths) {
      this.prettierAgent.beautifySingleFile(filePath);
    }
  }

  private applyChangesToPullRequest(filePaths: Array<string>): void {
    this.githubAgent.addFiles(filePaths);
    this.githubAgent.commit();
    this.githubAgent.push();
  }
}

export default PrettierAutoRunner;
