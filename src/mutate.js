export function mutateText(text, chain) {
  const history = [];

  let current = text;

  chain.forEach((step, index) => {
    const mutated =
      `[${step.from}→${step.to}] ${current}`;

    history.push({
      cycle: index + 1,
      from: step.from,
      to: step.to,
      input: current,
      output: mutated
    });

    current = mutated;
  });

  return {
    original: text,
    cycles: chain.length,
    final: current,
    history
  };
}