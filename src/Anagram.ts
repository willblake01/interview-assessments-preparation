export const isAnagram = (str1: string, str2: string): boolean => {
  // Normalize the strings by removing spaces and converting to lowercase
  const normalizedStr1 = str1.replace(/\s+/g, '').toLowerCase();
  const normalizedStr2 = str2.replace(/\s+/g, '').toLowerCase();

  // If lengths differ, they cannot be anagrams
  if (normalizedStr1.length !== normalizedStr2.length) {
    return false;
  }

  // Create a frequency map for characters in the first string
  const charCount: { [key: string]: number } = {};
  
  for (const char of normalizedStr1) {
    charCount[char] = (charCount[char] || 0) + 1;
  }

  // Decrease the count for characters found in the second string
  for (const char of normalizedStr2) {
    if (!charCount[char]) {
      return false; // Character not found or count is zero
    }
    charCount[char]--;
  }

  // Check if all counts are zero
  return Object.values(charCount).every(count => count === 0);
}

export const isAnagramSort = (str1: string, str2: string): boolean => {
  // Normalize the strings by removing spaces and converting to lowercase
  const normalizedStr1 = str1.replace(/\s+/g, '').toLowerCase();
  const normalizedStr2 = str2.replace(/\s+/g, '').toLowerCase();

  // If lengths differ, they cannot be anagrams
  if (normalizedStr1.length !== normalizedStr2.length) {
    return false;
  }

  // Sort the characters of both strings and compare
  const sortedStr1 = normalizedStr1.split('').sort().join('');
  const sortedStr2 = normalizedStr2.split('').sort().join('');

  return sortedStr1 === sortedStr2;
}

export const isAnagramRecursive = (str1: string, str2: string): boolean => {
  // Normalize the strings by removing spaces and converting to lowercase
  const normalizedStr1 = str1.replace(/\s+/g, '').toLowerCase();
  const normalizedStr2 = str2.replace(/\s+/g, '').toLowerCase();

  // If lengths differ, they cannot be anagrams
  if (normalizedStr1.length !== normalizedStr2.length) {
    return false;
  }

  // Recursive function to check if two strings are anagrams
  const checkAnagram = (str1: string, str2: string): boolean => {
    if (str1.length === 0) {
      return true; // Base case: both strings are empty
    }

    const char = str1[0];
    const index = str2.indexOf(char);

    if (index === -1) {
      return false; // Character not found in second string
    }

    // Remove the character from both strings and continue checking
    return checkAnagram(str1.slice(1), str2.slice(0, index) + str2.slice(index + 1));
  };

  return checkAnagram(normalizedStr1, normalizedStr2);
}

export const isAnagramMap = (str1: string, str2: string): boolean => {
  // Normalize the strings by removing spaces and converting to lowercase
  const normalizedStr1 = str1.replace(/\s+/g, '').toLowerCase();
  const normalizedStr2 = str2.replace(/\s+/g, '').toLowerCase();

  // If lengths differ, they cannot be anagrams
  if (normalizedStr1.length !== normalizedStr2.length) {
    return false;
  }

  // Create a frequency map for characters in the first string
  const charCount: Map<string, number> = new Map();
  
  for (const char of normalizedStr1) {
    charCount.set(char, (charCount.get(char) || 0) + 1);
  }

  // Decrease the count for characters found in the second string
  for (const char of normalizedStr2) {
    if (!charCount.has(char) || charCount.get(char)! <= 0) {
      return false; // Character not found or count is zero
    }
    charCount.set(char, charCount.get(char)! - 1);
  }

  // Check if all counts are zero
  return Array.from(charCount.values()).every(count => count === 0);
}

export const isAnagramSortMap = (str1: string, str2: string): boolean => {
  // Normalize the strings by removing spaces and converting to lowercase
  const normalizedStr1 = str1.replace(/\s+/g, '').toLowerCase();
  const normalizedStr2 = str2.replace(/\s+/g, '').toLowerCase();

  // If lengths differ, they cannot be anagrams
  if (normalizedStr1.length !== normalizedStr2.length) {
    return false;
  }

  // Sort the characters of both strings and compare using Map
  const sortedStr1 = new Map<string, number>();
  const sortedStr2 = new Map<string, number>();

  for (const char of normalizedStr1) {
    sortedStr1.set(char, (sortedStr1.get(char) || 0) + 1);
  }
  
  for (const char of normalizedStr2) {
    sortedStr2.set(char, (sortedStr2.get(char) || 0) + 1);
  }

  if (sortedStr1.size !== sortedStr2.size) {
    return false;
  }

  for (const [key, value] of sortedStr1.entries()) {
    if (sortedStr2.get(key) !== value) {
      return false;
    }
  }

  return true;
}
