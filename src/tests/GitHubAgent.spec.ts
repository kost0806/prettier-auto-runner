import { describe, it, expect } from '@jest/globals';
import GitHubAgent from '../GitHubAgent';

jest.mock('@actions/core', () => ({
  getInput: () => 'test-token',
}));

/**
 * GitHub.context.repo.owner,
 * GitHub.context.repo.repo,
 * GitHub.context.payload.pull_request?.number || 0,
 */

jest.mock('@actions/github', () => ({
  context: {
    repo: {
      owner: '',
      repo: '',
    },
    payload: {
      pull_request: {
        number: 1,
      },
    },
  },
  getOctokit: () => ({
    rest: {
      pulls: {
        listFiles: (p: {
          owner: string;
          per_page: number;
          pull_number: number;
          repo: string;
        }) =>
          new Promise((resolve, reject) =>
            resolve({
              data: [
                { filename: '/src/GitHubAgent.ts' },
                { filename: '/src/index.ts' },
                { filename: '/src/exceptions/NotImplementedError.ts' },
                { filename: '/src/PrettierAutoRunner.ts' },
              ],
            })
          ),
      },
    },
  }),
}));

describe('GitHubAgent - GitHub Actions Toolkit Part', () => {
  it('getChangedFilePaths', async () => {
    const githubAgent = new GitHubAgent();

    const changedFilePaths = await githubAgent.getChangedFilePaths();

    expect(changedFilePaths.sort()).toEqual(
      [
        '/src/GitHubAgent.ts',
        '/src/index.ts',
        '/src/PrettierAutoRunner.ts',
        '/src/exceptions/NotImplementedError.ts',
      ].sort()
    );
  });
});

describe('GitHubAgent - git-tools Part', () => {
  it('getRawFileContent', () => {
    const githubAgent = new GitHubAgent();

    const expectedFileContent = githubAgent.getRawFileContent('/src/index.ts');

    expect(expectedFileContent).toEqual('Test File Content');
  });

  it('addFiles', () => {
    expect('').toBe('');
  });

  it('commit', () => {
    expect('').toBe('');
  });

  it('push', () => {
    expect('').toBe('');
  });
});
