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
      slug: 'uuid',
      title: 'UUID Generator',
      description: 'Generate universally unique identifiers (UUID v4)',
      icon: 'Fingerprint',
      category: 'Generators',
      tags: ['Generator', 'UUID', 'GUID']
    },
    {
      slug: 'lorem-ipsum',
      title: 'Lorem Ipsum Generator',
      description: 'Generate placeholder text for designs and mockups',
      icon: 'Type',
      category: 'Generators',
      tags: ['Generator', 'Text', 'Placeholder']
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
      slug: 'regex-tester',
      title: 'Regex Tester',
      description: 'Test and debug regular expressions with real-time matching',
      icon: 'SearchCode',
      category: 'Development',
      tags: ['Development', 'Regex', 'Testing']
    },
    {
      slug: 'diff-checker',
      title: 'Diff Checker',
      description: 'Compare two texts and highlight differences',
      icon: 'Diff',
      category: 'Development',
      tags: ['Development', 'Comparison', 'Diff']
    },
    {
      slug: 'base64',
      title: 'Base64 Encoder/Decoder',
      description: 'Encode and decode Base64 strings',
      icon: 'Type',
      category: 'Encoders',
      tags: ['Encoding', 'Data']
    },
    {
      slug: 'url-encoder',
      title: 'URL Encoder/Decoder',
      description: 'Encode and decode URLs for safe transmission',
      icon: 'Link',
      category: 'Encoders',
      tags: ['Encoding', 'URL']
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
