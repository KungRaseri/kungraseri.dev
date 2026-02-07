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
    },
    {
      slug: 'jwt-decoder',
      title: 'JWT Decoder',
      description: 'Decode and inspect JSON Web Tokens (JWT)',
      icon: 'KeySquare',
      category: 'Security',
      tags: ['Security', 'JWT', 'Token']
    },
    {
      slug: 'base-converter',
      title: 'Base Converter',
      description: 'Convert between binary, octal, decimal, and hexadecimal',
      icon: 'Binary',
      category: 'Converters',
      tags: ['Converter', 'Number', 'Base']
    },
    {
      slug: 'caesar-cipher',
      title: 'Caesar Cipher',
      description: 'Encode and decode text using Caesar cipher (ROT13)',
      icon: 'Lock',
      category: 'Security',
      tags: ['Security', 'Cipher', 'Encoding']
    },
    {
      slug: 'markdown-preview',
      title: 'Markdown Previewer',
      description: 'Live preview of markdown with HTML rendering',
      icon: 'FileText',
      category: 'Development',
      tags: ['Development', 'Markdown', 'Preview']
    },
    {
      slug: 'cron-expression',
      title: 'Cron Expression Builder',
      description: 'Build and test cron expressions with descriptions',
      icon: 'Clock',
      category: 'Development',
      tags: ['Development', 'Cron', 'Scheduling']
    },
    {
      slug: 'favicon-generator',
      title: 'Favicon Generator',
      description: 'Generate SVG favicons from text with custom colors',
      icon: 'Image',
      category: 'Design',
      tags: ['Design', 'Favicon', 'SVG']
    },
    {
      slug: 'csv-to-json',
      title: 'CSV to JSON',
      description: 'Convert CSV data to JSON format',
      icon: 'FileJson',
      category: 'Converters',
      tags: ['Converter', 'CSV', 'JSON']
    },
    {
      slug: 'json-to-csv',
      title: 'JSON to CSV',
      description: 'Convert JSON arrays to CSV format',
      icon: 'Table',
      category: 'Converters',
      tags: ['Converter', 'JSON', 'CSV']
    },
    {
      slug: 'xml-formatter',
      title: 'XML Formatter',
      description: 'Format and beautify XML with indentation',
      icon: 'Code',
      category: 'Development',
      tags: ['Development', 'XML', 'Formatter']
    },
    {
      slug: 'yaml-json',
      title: 'YAML/JSON Converter',
      description: 'Convert between YAML and JSON formats',
      icon: 'FileCode',
      category: 'Converters',
      tags: ['Converter', 'YAML', 'JSON']
    },
    {
      slug: 'image-to-base64',
      title: 'Image to Base64',
      description: 'Convert images to Base64 data URLs',
      icon: 'Image',
      category: 'Converters',
      tags: ['Converter', 'Image', 'Base64']
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
