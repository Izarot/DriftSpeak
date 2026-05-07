export function getConfig() {
  const args = process.argv.slice(2);

  const input =
    args[0] || "Hello world";

  let cycles =
    parseInt(args[1]) || 10;

  if (cycles < 1) {
    cycles = 1;
  }

  if (cycles > 500) {
    cycles = 500;
  }

  return {
    input,
    cycles
  };
}