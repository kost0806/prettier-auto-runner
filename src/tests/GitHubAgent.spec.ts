import { describe, it, expect } from '@jest/globals';
import GitHubAgent from '../GitHubAgent';

describe('GitHubAgent - GitHub Actions Toolkit Part', () => {
  it('getChangedFilePaths', () => {
    const githubAgent = new GitHubAgent();

    const changedFilePaths = githubAgent.getChangedFilePaths();

    expect(changedFilePaths).toContain([
      '/src/GitHubAgent.ts',
      '/src/index.ts',
      '/src/PrettierAutoRunner.ts',
      '/src/exceptions/NotImplementedError.ts',
    ]);
  });

  it('getRawFileContent', () => {
    const githubAgent = new GitHubAgent();

    const expectedFileContent = githubAgent.getRawFileContent('/src/index.ts');

    expect(expectedFileContent).toEqual('Test File Content');
  });
});

describe('GitHubAgent - git-tools Part', () => {
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
