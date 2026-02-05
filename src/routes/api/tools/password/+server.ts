import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import crypto from 'crypto';

// Load word lists
import words from '$lib/data/words.json';

const symbols = '!@#$%^&*';
const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const lowercase = 'abcdefghijklmnopqrstuvwxyz';
const digits = '0123456789';

function getRandomInt(max: number): number {
  return crypto.randomInt(0, max);
}

function getRandomElement<T>(array: T[]): T {
  return array[getRandomInt(array.length)];
}

function generateSimplePassword(): string {
  const word1 = getRandomElement(words);
  const word2 = getRandomElement(words);
  const symbol = symbols[getRandomInt(symbols.length)];
  const digitsStr = Array.from({ length: 4 }, () => getRandomInt(10)).join('');

  // Capitalize first letter of each word
  const capitalizedWord1 = word1.charAt(0).toUpperCase() + word1.slice(1);
  const capitalizedWord2 = word2.charAt(0).toUpperCase() + word2.slice(1);

  let password = `${capitalizedWord1}${symbol}${capitalizedWord2}${digitsStr}`;

  // Ensure minimum 13 characters
  while (password.length < 13) {
    password += getRandomInt(10).toString();
  }

  return password;
}

function generateComplexPassword(length: number, options: {
  uppercase: boolean;
  lowercase: boolean;
  digits: boolean;
  symbols: boolean;
}): string {
  let chars = '';
  if (options.uppercase) chars += uppercase;
  if (options.lowercase) chars += lowercase;
  if (options.digits) chars += digits;
  if (options.symbols) chars += symbols;

  if (!chars) chars = lowercase; // fallback

  let password = '';
  for (let i = 0; i < length; i++) {
    password += chars[getRandomInt(chars.length)];
  }

  return password;
}

export const POST: RequestHandler = async ({ request }) => {
  try {
    const { mode, length, options } = await request.json();

    let password: string;

    if (mode === 'simple') {
      password = generateSimplePassword();
    } else {
      password = generateComplexPassword(length || 16, options || {
        uppercase: true,
        lowercase: true,
        digits: true,
        symbols: true
      });
    }

    return json({ password });
  } catch {
    return json({ error: 'Failed to generate password' }, { status: 500 });
  }
};
