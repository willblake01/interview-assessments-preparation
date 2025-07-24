import { isAnagram } from './Anagram';

describe('Anagram', () => {
  it('should return true for anagrams', () => {
    expect(isAnagram('listen', 'silent')).toBe(true);
    expect(isAnagram('triangle', 'integral')).toBe(true);
    expect(isAnagram('evil', 'vile')).toBe(true);
  });

  it('should return false for non-anagrams', () => {
    expect(isAnagram('hello', 'world')).toBe(false);
    expect(isAnagram('test', 'taste')).toBe(false);
    expect(isAnagram('anagram', 'nagaramx')).toBe(false);
  });

  it('should handle empty strings', () => {
    expect(isAnagram('', '')).toBe(true);
    expect(isAnagram('', 'nonempty')).toBe(false);
  });

  it('should handle case insensitivity', () => {
    expect(isAnagram('Listen', 'Silent')).toBe(true);
    expect(isAnagram('Triangle', 'Integral')).toBe(true);
  });
});
