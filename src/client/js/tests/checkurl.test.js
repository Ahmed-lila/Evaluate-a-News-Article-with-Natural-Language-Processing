import { checkURL } from '../checkurl';

test('checkURL should return true for a valid URL', () => {
    const url = 'https://www.example.com';
    expect(checkURL(url)).toBe(true);
});

test('checkURL should return false for an invalid URL', () => {
    const url = 'invalid-url';
    expect(checkURL(url)).toBe(false);
});
