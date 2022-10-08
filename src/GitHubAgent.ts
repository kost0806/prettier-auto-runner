import NotImplementedError from './exceptions/NotImplementedError';
import * as GitHub from '@actions/github';
import * as Core from '@actions/core';
import * as fs from 'fs';
import * as child_process from 'child_process';

type Octokit = ReturnType<typeof GitHub.getOctokit>;

class GitHubAgent {
  private octokit: Octokit;
  private static CLONE_PATH: string = '/tmp/_repo';

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

  public cloneToFileSystem(): void {
    if (!fs.existsSync(GitHubAgent.CLONE_PATH)) {
      fs.mkdirSync(GitHubAgent.CLONE_PATH);
    }

    child_process.execSync(
      `git clone ${GitHub.context.payload.repository?.html_url} ${GitHubAgent.CLONE_PATH}`
    );
  }

  public getRawFileContent(filePath: string): string {
    let actualFilePath = GitHubAgent.CLONE_PATH;
    if (filePath.startsWith('/')) {
      actualFilePath += filePath;
    } else {
      actualFilePath += `/${filePath}`;
    }
    const buffer = fs.readFileSync(actualFilePath);

    return buffer.toString('utf-8');
  }

  public addFiles(filePaths: Array<string>): void {
    child_process.execSync(`git add ${filePaths.join(' ')}`);
  }

  public commit(): void {
    throw new NotImplementedError();
  }

  public push(): void {
    throw new NotImplementedError();
  }
}

export default GitHubAgent;
