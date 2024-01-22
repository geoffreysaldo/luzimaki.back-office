export function toEuro(price: number | undefined) {
  return `${price?.toFixed(2)} €`;
}
