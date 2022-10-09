import { describe, it, expect } from '@jest/globals';
import PrettierAgent from '../PrettierAgent';

const GIVEN_CONFIG_PATH = '/CONFIG_PATH';

describe('Prettier Test', () => {
  it('loadConfig', () => {
    const prettierAgent = new PrettierAgent();

    expect(() => prettierAgent.loadConfig(GIVEN_CONFIG_PATH)).not.toThrow();
  });

  it('beautifySingleFile', () => {
    const prettierAgent = new PrettierAgent();

    const givenFilePath = '/test/code';
    prettierAgent.beautifySingleFile(givenFilePath);

    expect(() => prettierAgent.beautifySingleFile(givenFilePath)).not.toThrow();
  });

  it('loadFileContent', () => {
    const prettierAgent = new PrettierAgent();

    const givenFilePath = '/test/code';
    const result = prettierAgent.loadFileContent(givenFilePath);

    expect(result).toEqual('FAIL');
  });

  it('beautifyCode', () => {
    const prettierAgent = new PrettierAgent();

    const givenCode = 'foo ( );';
    const beautifiedCode = prettierAgent.beautifyCode(givenCode);

    expect(beautifiedCode).toEqual('foo()');
  });

  it('overwriteFileContent', () => {
    const prettierAgent = new PrettierAgent();

    const givenCode = 'TEST CODE';
    const givenPath = '/test/code';
    prettierAgent.overwriteFileContent(givenPath, givenCode);

    // fs Spy로 Call 확인
  });
});
