function tokenizeCommandLine(text) {
  const tokens = [];
  let current = '';
  let inQuotes = false;
  let quoteChar = '';

  for (let i = 0; i < text.length; i++) {
    const char = text[i];

    if ((char === '"' || char === "'") && !inQuotes) {
      inQuotes = true;
      quoteChar = char;
    } else if (char === quoteChar && inQuotes) {
      inQuotes = false;
      quoteChar = '';
    } else if (char === ' ' && !inQuotes) {
      if (current.trim()) {
        tokens.push(current.trim());
        current = '';
      }
    } else {
      current += char;
    }
  }

  if (current.trim()) {
    tokens.push(current.trim());
  }

  return tokens;
}

function parseFlags(tokens) {
  const flags = {};
  const positional = [];

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    if (token.startsWith('--')) {
      const key = token.slice(2);
      if (i + 1 < tokens.length && !tokens[i + 1].startsWith('--')) {
        flags[key] = tokens[i + 1];
        i++;
      } else {
        flags[key] = true;
      }
    } else {
      positional.push(token);
    }
  }

  return { flags, positional };
}

// Test cases
const input = 'project add --title "Sistem AI Keren" --year "2026" --tech "React, Tailwind" --cat "Web System"';
const tokens = tokenizeCommandLine(input);
const parsed = parseFlags(tokens);
console.log('Tokens:', tokens);
console.log('Parsed:', parsed);

