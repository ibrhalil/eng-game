const escapeRegExp = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

export const highlightWordInExample = (example: string, word: string) => {
  const normalizedWord = word.trim();
  if (!normalizedWord) {
    return example;
  }

  const pattern = new RegExp(`\\b(${escapeRegExp(normalizedWord)})\\b`, 'gi');
  const parts = example.split(pattern);

  if (parts.length === 1) {
    return example;
  }

  return parts.map((part, index) =>
    part.toLowerCase() === normalizedWord.toLowerCase() ? (
      <span key={`${part}-${index}`} className="example-highlight">
        {part}
      </span>
    ) : (
      <span key={`${part}-${index}`}>{part}</span>
    )
  );
};
