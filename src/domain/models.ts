export type TransactionType = 'expense' | 'income'

export type Category =
  | 'Food'
  | 'Transport'
  | 'Shopping'
  | 'Bills'
  | 'Health'
  | 'Entertainment'
  | 'Home'
  | 'Salary'
  | 'Freelance'
  | 'Gift'
  | 'Investment'
  | 'Other'

export type CurrencyCode = 'USD' | 'SGD' | 'EUR' | 'GBP' | 'AUD' | 'CAD' | 'INR' | 'JPY' | 'MYR'
export type TransactionFilter = TransactionType | 'all'

export interface Transaction {
  id: string
  type: TransactionType
  description: string
  amountCents: number
  category: Category
  date: string
}

export type TransactionDraft = Omit<Transaction, 'id'>

export interface CurrencyConfiguration {
  code: CurrencyCode
  label: string
  symbol: string
}

export interface TransactionSummary {
  balanceCents: number
  incomeCents: number
  expenseCents: number
  incomeCount: number
  expenseCount: number
}