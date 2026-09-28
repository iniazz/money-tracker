import { categories } from './categories'
import type {
  Category,
  Transaction,
  TransactionFilter,
  TransactionSummary,
  TransactionType,
} from './models'

const datePattern = /^\d{4}-\d{2}-\d{2}$/

export function isTransaction(value: unknown): value is Transaction {
  if (typeof value !== 'object' || value === null) return false

  const item = value as Partial<Transaction>
  return typeof item.id === 'string'
    && (item.type === 'expense' || item.type === 'income')
    && typeof item.description === 'string'
    && item.description.trim().length > 0
    && typeof item.amountCents === 'number'
    && Number.isSafeInteger(item.amountCents)
    && item.amountCents > 0
    && typeof item.category === 'string'
    && categories[item.type].some((category) => category === item.category)
    && typeof item.date === 'string'
    && datePattern.test(item.date)
}

function dateKey(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export function calculateSummary(
  transactions: readonly Transaction[],
  currentDate = new Date(),
): TransactionSummary {
  const monthStart = dateKey(new Date(currentDate.getFullYear(), currentDate.getMonth(), 1))
  const nextMonthStart = dateKey(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
  let balanceCents = 0
  let incomeCents = 0
  let expenseCents = 0
  let incomeCount = 0
  let expenseCount = 0

  for (const transaction of transactions) {
    if (transaction.type === 'income') balanceCents += transaction.amountCents
    else balanceCents -= transaction.amountCents

    if (transaction.date < monthStart || transaction.date >= nextMonthStart) continue
    if (transaction.type === 'income') {
      incomeCents += transaction.amountCents
      incomeCount += 1
    } else {
      expenseCents += transaction.amountCents
      expenseCount += 1
    }
  }

  return { balanceCents, incomeCents, expenseCents, incomeCount, expenseCount }
}

export function filterTransactions(
  transactions: readonly Transaction[],
  search: string,
  filter: TransactionFilter,
): Transaction[] {
  const query = search.trim().toLocaleLowerCase()
  return transactions
    .filter((transaction) => filter === 'all' || transaction.type === filter)
    .filter((transaction) => `${transaction.description} ${transaction.category}`.toLocaleLowerCase().includes(query))
    .slice()
    .sort((left, right) => right.date.localeCompare(left.date) || right.id.localeCompare(left.id))
}

export function isCategoryForType(category: string, type: TransactionType): category is Category {
  return categories[type].some((option) => option === category)
}