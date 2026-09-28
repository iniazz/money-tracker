import { defaultCurrency, isCurrencyCode } from '../domain/currencies'
import { isTransaction } from '../domain/transactions'
import type { CurrencyCode, Transaction } from '../domain/models'

export const TRANSACTIONS_STORAGE_KEY = 'mint-money-tracker-v1'
export const CURRENCY_STORAGE_KEY = 'mint-money-tracker-currency-v1'

export interface StorageLike {
  getItem(key: string): string | null
  setItem(key: string, value: string): void
}

export interface LoadedTrackerData {
  transactions: Transaction[]
  currency: CurrencyCode
  storageError: boolean
  dataError: boolean
}

function storageTarget(storage?: StorageLike): StorageLike {
  if (storage) return storage
  if (typeof window === 'undefined') throw new Error('Browser storage is unavailable')
  return window.localStorage
}

function parseStoredTransactions(value: string | null): { transactions: Transaction[]; dataError: boolean } {
  if (!value) return { transactions: [], dataError: false }

  try {
    const parsed: unknown = JSON.parse(value)
    if (!Array.isArray(parsed)) return { transactions: [], dataError: true }

    const transactions: Transaction[] = []
    for (const entry of parsed) {
      if (typeof entry !== 'object' || entry === null) continue
      const record = entry as Record<string, unknown>
      let candidate: unknown = record

      if (!Number.isSafeInteger(record.amountCents) && typeof record.amount === 'number') {
        candidate = {
          ...record,
          amountCents: Math.round((record.amount + Number.EPSILON) * 100),
        }
      }

      if (isTransaction(candidate)) transactions.push(candidate)
    }
    return { transactions, dataError: false }
  } catch {
    return { transactions: [], dataError: true }
  }
}

export function loadTrackerData(storage?: StorageLike): LoadedTrackerData {
  try {
    const target = storageTarget(storage)
    const parsed = parseStoredTransactions(target.getItem(TRANSACTIONS_STORAGE_KEY))
    const storedCurrency = target.getItem(CURRENCY_STORAGE_KEY)

    return {
      transactions: parsed.transactions,
      currency: isCurrencyCode(storedCurrency) ? storedCurrency : defaultCurrency,
      storageError: false,
      dataError: parsed.dataError,
    }
  } catch {
    return { transactions: [], currency: defaultCurrency, storageError: true, dataError: false }
  }
}

export function saveTrackerData(
  transactions: readonly Transaction[],
  currency: CurrencyCode,
  storage?: StorageLike,
): boolean {
  try {
    const target = storageTarget(storage)
    const compatibleTransactions = transactions.map(({ amountCents, ...transaction }) => ({
      ...transaction,
      amount: amountCents / 100,
    }))
    target.setItem(TRANSACTIONS_STORAGE_KEY, JSON.stringify(compatibleTransactions))
    target.setItem(CURRENCY_STORAGE_KEY, currency)
    return true
  } catch {
    return false
  }
}