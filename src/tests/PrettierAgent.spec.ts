import { describe, it, expect } from '@jest/globals';
import PrettierAgent from '../PrettierAgent';
import AssertionFailedError from '../exceptions/AssertionFailedError';

jest.mock('fs', () => {
  const actualModule = jest.requireActual('fs');
  return {
    ...actualModule,
    readFileSync: (filePath: string) => {
      if (filePath === '/test/code') {
        return Buffer.from('foo ( );', 'utf-8');
      }

      return actualModule.readFileSync(filePath);
    },
    writeFileSync: (filePath: string, data: Buffer) => {
      if (filePath !== '/test/code') {
        throw new AssertionFailedError('Path is not matched');
      }

      if (data.toString('utf-8') !== 'foo();\n') {
        throw new AssertionFailedError('Content is not matched');
      }
    },
  };
});

describe('Prettier Test', () => {
  it('loadConfig', () => {
    const prettierAgent = new PrettierAgent();

    const givenConfigPath = '../../.prettierrc.json';
    expect(() => prettierAgent.loadConfig(givenConfigPath)).not.toThrow();
  });

  it('beautifySingleFile', () => {
    const prettierAgent = new PrettierAgent();

    const givenFilePath = '/test/code';

    expect(() => prettierAgent.beautifySingleFile(givenFilePath)).not.toThrow();
  });

  it('loadFileContent', () => {
    const prettierAgent = new PrettierAgent();

    const givenFilePath = '/test/code';
    const result = prettierAgent.loadFileContent(givenFilePath);

    expect(result).toEqual('foo ( );');
  });

  it('beautifyCode', () => {
    const prettierAgent = new PrettierAgent();

    const givenCode = 'foo ( );';
    const beautifiedCode = prettierAgent.beautifyCode(givenCode);

    expect(beautifiedCode).toEqual('foo();\n');
  });

  it('overwriteFileContent', () => {
    const prettierAgent = new PrettierAgent();

    const givenCode = 'foo();\n';
    const givenPath = '/test/code';
    expect(() =>
      prettierAgent.overwriteFileContent(givenPath, givenCode)
    ).not.toThrow();
  });
});
