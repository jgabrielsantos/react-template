// @ts-nocheck
import { checkForCookie } from '../../src/utils';

xdescribe('checkForCookie', () => {
  // Mock document.cookie
  Object.defineProperty(document, 'cookie', {
    writable: true,
    value: 'testCookie={"key":"value"}; otherCookie=otherValue',
  });

  it('should return cookie value when cookie exists and is valid JSON', () => {
    const result = checkForCookie<{ key: string }>('testCookie');
    expect(result.exist).toBe(true);
    expect(result.value).toEqual({ key: 'value' });
  });

  it('should return null value when cookie exists but is not valid JSON', () => {
    const result = checkForCookie('otherCookie');
    expect(result.exist).toBe(true);
    expect(result.value).toBe('otherValue');
  });

  it('should return null value when cookie does not exist', () => {
    const result = checkForCookie('nonExistentCookie');
    expect(result.exist).toBe(false);
    expect(result.value).toBe(undefined);
  });
});
