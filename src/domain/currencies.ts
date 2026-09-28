import type { CurrencyCode, CurrencyConfiguration } from './models'

export const currencies: readonly CurrencyConfiguration[] = [
  { code: 'USD', label: 'USD $', symbol: '$' },
  { code: 'SGD', label: 'SGD $', symbol: '$' },
  { code: 'EUR', label: 'EUR €', symbol: '€' },
  { code: 'GBP', label: 'GBP £', symbol: '£' },
  { code: 'AUD', label: 'AUD $', symbol: '$' },
  { code: 'CAD', label: 'CAD $', symbol: '$' },
  { code: 'INR', label: 'INR ₹', symbol: '₹' },
  { code: 'JPY', label: 'JPY ¥', symbol: '¥' },
  { code: 'MYR', label: 'MYR RM', symbol: 'RM' },
]

export const defaultCurrency: CurrencyCode = 'USD'

export function isCurrencyCode(value: unknown): value is CurrencyCode {
  return currencies.some((currency) => currency.code === value)
}

export function getCurrencySymbol(currency: CurrencyCode): string {
  return currencies.find((configuration) => configuration.code === currency)?.symbol ?? currency
}

export function formatMoney(amountCents: number, currency: CurrencyCode): string {
  return new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency,
    maximumFractionDigits: currency === 'JPY' ? 0 : 2,
  }).format(amountCents / 100)
}