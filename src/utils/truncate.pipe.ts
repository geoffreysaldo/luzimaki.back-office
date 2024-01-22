export function truncate(arg: string, size: number) {
  if (arg.length > size) {
    return arg.slice(0, size || 20) + "...";
  }

  return arg;
}
