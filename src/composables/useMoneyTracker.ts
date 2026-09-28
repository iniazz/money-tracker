import { computed, onUnmounted, ref } from 'vue'
import { defaultCurrency } from '../domain/currencies'
import { calculateSummary, filterTransactions, isTransaction } from '../domain/transactions'
import type {
  CurrencyCode,
  Transaction,
  TransactionDraft,
  TransactionFilter,
} from '../domain/models'
import { loadTrackerData, saveTrackerData } from '../services/persistence'

const storageWarning = 'Your browser could not save data on this device. Your latest change may not be kept after you close this page.'

function createTransactionId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`
}

export function useMoneyTracker() {
  const loadedData = loadTrackerData()
  const transactions = ref<Transaction[]>(loadedData.transactions)
  const currency = ref<CurrencyCode>(loadedData.currency ?? defaultCurrency)
  const search = ref('')
  const filter = ref<TransactionFilter>('all')
  const toastMessage = ref('')
  const today = new Date()
  let toastTimer: number | undefined

  function showToast(message: string): void {
    toastMessage.value = message
    window.clearTimeout(toastTimer)
    toastTimer = window.setTimeout(() => {
      toastMessage.value = ''
    }, 4200)
  }

  if (loadedData.storageError) showToast(storageWarning)
  else if (loadedData.dataError) showToast('Saved transaction data could not be read.')

  const summary = computed(() => calculateSummary(transactions.value, today))
  const visibleTransactions = computed(() => filterTransactions(
    transactions.value,
    search.value,
    filter.value,
  ))
  const monthLabel = new Intl.DateTimeFormat(undefined, { month: 'long', year: 'numeric' }).format(today)
  const todayLabel = new Intl.DateTimeFormat(undefined, {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(today)

  function persist(): void {
    if (!saveTrackerData(transactions.value, currency.value)) showToast(storageWarning)
  }

  function addTransaction(draft: TransactionDraft): boolean {
    const transaction: Transaction = { ...draft, id: createTransactionId() }
    if (!isTransaction(transaction)) {
      showToast('Check the transaction details and try again.')
      return false
    }

    transactions.value.push(transaction)
    persist()
    showToast('Transaction added.')
    return true
  }

  function deleteTransaction(id: string): void {
    transactions.value = transactions.value.filter((transaction) => transaction.id !== id)
    persist()
    showToast('Transaction deleted.')
  }

  function updateCurrency(value: CurrencyCode): void {
    currency.value = value
    persist()
  }

  onUnmounted(() => window.clearTimeout(toastTimer))

  return {
    transactions,
    currency,
    search,
    filter,
    summary,
    visibleTransactions,
    toastMessage,
    monthLabel,
    todayLabel,
    addTransaction,
    deleteTransaction,
    updateCurrency,
  }
}