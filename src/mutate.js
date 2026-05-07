export function mutateText(text, chain) {
  return {
    original: text,
    cycles: chain.length,
    final: text,
    history: []
  };
}