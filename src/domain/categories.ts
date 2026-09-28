import type { Category, TransactionType } from './models'

export const categories: Record<TransactionType, readonly Category[]> = {
  expense: ['Food', 'Transport', 'Shopping', 'Bills', 'Health', 'Entertainment', 'Home', 'Other'],
  income: ['Salary', 'Freelance', 'Gift', 'Investment', 'Other'],
}

export const categoryIcons: Record<Category, string> = {
  Food: '⌂',
  Transport: '↗',
  Shopping: '▣',
  Bills: '≋',
  Health: '+',
  Entertainment: '♫',
  Home: '⌂',
  Salary: '↗',
  Freelance: '✳',
  Gift: '◇',
  Investment: '⌁',
  Other: '·',
}