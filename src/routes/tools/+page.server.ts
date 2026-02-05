import type { PageServerLoad } from './$types';

export const load = (async () => {
  const tools = [
    {
      slug: 'password-generator',
      title: 'Password Generator',
      description: 'Generate secure passwords with customizable length and character types',
      icon: 'KeyRound',
      tags: ['Security', 'Generator']
    },
    {
      slug: 'color-palette',
      title: 'Color Palette Generator',
      description: 'Generate beautiful color schemes with hex, rgb, and hsl values',
      icon: 'Palette',
      tags: ['Design', 'Colors']
    },
    {
      slug: 'json-formatter',
      title: 'JSON Formatter',
      description: 'Format, validate, and beautify JSON data',
      icon: 'Code',
      tags: ['Development', 'Data']
    },
    {
      slug: 'base64',
      title: 'Base64 Encoder/Decoder',
      description: 'Encode and decode Base64 strings',
      icon: 'Type',
      tags: ['Encoding', 'Data']
    },
    {
      slug: 'hash-generator',
      title: 'Hash Generator',
      description: 'Generate MD5, SHA-1, SHA-256 hashes from text',
      icon: 'LockKeyhole',
      tags: ['Security', 'Crypto']
    },
    {
      slug: 'qr-code',
      title: 'QR Code Generator',
      description: 'Create QR codes from text or URLs',
      icon: 'QrCode',
      tags: ['Generator', 'Utility']
    }
  ];

  return { tools };
}) satisfies PageServerLoad;
