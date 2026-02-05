import type { PageServerLoad } from './$types';

interface Tool {
  slug: string;
  title: string;
  description: string;
  icon: string;
  category: string;
  tags: string[];
}

export const load = (async () => {
  const tools: Tool[] = [
    {
      slug: 'password-generator',
      title: 'Password Generator',
      description: 'Generate secure passwords with customizable length and character types',
      icon: 'KeyRound',
      category: 'Security',
      tags: ['Security', 'Generator']
    },
    {
      slug: 'hash-generator',
      title: 'Hash Generator',
      description: 'Generate MD5, SHA-1, SHA-256, SHA-512 hashes from text',
      icon: 'LockKeyhole',
      category: 'Security',
      tags: ['Security', 'Crypto']
    },
    {
      slug: 'color-palette',
      title: 'Color Palette Generator',
      description: 'Generate beautiful color schemes with harmony and material design modes',
      icon: 'Palette',
      category: 'Design',
      tags: ['Design', 'Colors']
    },
    {
      slug: 'qr-code',
      title: 'QR Code Generator',
      description: 'Create QR codes from text or URLs with customizable error correction',
      icon: 'QrCode',
      category: 'Generators',
      tags: ['Generator', 'Utility']
    },
    {
      slug: 'json-formatter',
      title: 'JSON Formatter',
      description: 'Format, validate, minify, and beautify JSON data',
      icon: 'Code',
      category: 'Development',
      tags: ['Development', 'Data']
    },
    {
      slug: 'base64',
      title: 'Base64 Encoder/Decoder',
      description: 'Encode and decode Base64 strings',
      icon: 'Type',
      category: 'Encoders',
      tags: ['Encoding', 'Data']
    }
  ];

  // Group tools by category
  const categories = tools.reduce((acc, tool) => {
    if (!acc[tool.category]) {
      acc[tool.category] = [];
    }
    acc[tool.category].push(tool);
    return acc;
  }, {} as Record<string, Tool[]>);

  return { tools, categories };
}) satisfies PageServerLoad;
