import NotImplementedError from './exceptions/NotImplementedError';
import * as GitHub from '@actions/github';
import * as Core from '@actions/core';

type Octokit = ReturnType<typeof GitHub.getOctokit>;

class GitHubAgent {
  private octokit: Octokit;
  constructor() {
    const githubToken = Core.getInput('github-token', { required: true });
    this.octokit = GitHub.getOctokit(githubToken);
  }

  public async getChangedFilePaths(): Promise<Array<string>> {
    try {
      const { data } = await this.octokit.rest.pulls.listFiles({
        owner: GitHub.context.repo.owner,
        repo: GitHub.context.repo.repo,
        pull_number: GitHub.context.payload.pull_request?.number || 0,
        per_page: 100,
      });

      return data.map((file: any) => file.filename);
    } catch (e) {
      console.error('Failed to get changed file list.');
    }

    return [];
  }

  public async getRawFileContent(filePath: string): Promise<string> {
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
