export function formatPrice(priceCents) {
  return (priceCents / 100).toFixed(2);
}

export function formatCurrency(priceCents) {
  return formatPrice(priceCents);
}
