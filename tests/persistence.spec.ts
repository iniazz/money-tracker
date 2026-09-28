import { describe, expect, it } from 'vitest'
import {
  CURRENCY_STORAGE_KEY,
  loadTrackerData,
  saveTrackerData,
  TRANSACTIONS_STORAGE_KEY,
  type StorageLike,
} from '../src/services/persistence'
import type { Transaction } from '../src/domain/models'

function createStorage(initial: Record<string, string> = {}) {
  const values = new Map(Object.entries(initial))
  const storage: StorageLike = {
    getItem: (key) => values.get(key) ?? null,
    setItem: (key, value) => { values.set(key, value) },
  }
  return { storage, values }
}

describe('tracker persistence', () => {
  it('loads and validates the prototype decimal-amount format', () => {
    const { storage } = createStorage({
      [TRANSACTIONS_STORAGE_KEY]: JSON.stringify([
        { id: 'legacy', type: 'expense', description: 'Lunch', amount: 12.34, category: 'Food', date: '2026-09-28' },
        { id: 'invalid', type: 'expense', description: 'Bad category', amount: 5, category: 'Salary', date: '2026-09-28' },
      ]),
      [CURRENCY_STORAGE_KEY]: 'EUR',
    })

    expect(loadTrackerData(storage)).toMatchObject({
      transactions: [{ id: 'legacy', amountCents: 1234 }],
      currency: 'EUR',
      storageError: false,
      dataError: false,
    })
  })

  it('saves cents in the existing storage schema', () => {
    const { storage, values } = createStorage()
    const transaction: Transaction = {
      id: '1', type: 'income', description: 'Pay', amountCents: 10050, category: 'Salary', date: '2026-09-28',
    }

    expect(saveTrackerData([transaction], 'USD', storage)).toBe(true)
    expect(JSON.parse(values.get(TRANSACTIONS_STORAGE_KEY) ?? '[]')).toEqual([
      { id: '1', type: 'income', description: 'Pay', category: 'Salary', date: '2026-09-28', amount: 100.5 },
    ])
    expect(values.get(CURRENCY_STORAGE_KEY)).toBe('USD')
  })
})