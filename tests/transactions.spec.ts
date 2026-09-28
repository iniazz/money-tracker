import { describe, expect, it } from 'vitest'
import { calculateSummary, filterTransactions, isTransaction } from '../src/domain/transactions'
import type { Transaction } from '../src/domain/models'

const transactions: Transaction[] = [
  { id: '1', type: 'income', description: 'Payday', amountCents: 250000, category: 'Salary', date: '2026-09-04' },
  { id: '2', type: 'expense', description: 'Groceries', amountCents: 3899, category: 'Food', date: '2026-09-05' },
  { id: '3', type: 'expense', description: 'Train pass', amountCents: 1200, category: 'Transport', date: '2026-08-31' },
]

describe('calculateSummary', () => {
  it('calculates balance and current-month totals using integer cents', () => {
    expect(calculateSummary(transactions, new Date(2026, 8, 28))).toEqual({
      balanceCents: 244901,
      incomeCents: 250000,
      expenseCents: 3899,
      incomeCount: 1,
      expenseCount: 1,
    })
  })
})

describe('filterTransactions', () => {
  it('searches descriptions and categories, filters type, and sorts newest first', () => {
    expect(filterTransactions(transactions, 'FOOD', 'expense').map(({ id }) => id)).toEqual(['2'])
    expect(filterTransactions(transactions, '', 'all').map(({ id }) => id)).toEqual(['2', '1', '3'])
  })
})

describe('isTransaction', () => {
  it('accepts well-formed transactions and rejects invalid categories and amounts', () => {
    expect(isTransaction(transactions[0])).toBe(true)
    expect(isTransaction({ ...transactions[0], category: 'Food' })).toBe(false)
    expect(isTransaction({ ...transactions[0], amountCents: 0 })).toBe(false)
  })
})