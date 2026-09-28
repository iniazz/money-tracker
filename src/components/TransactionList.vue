<script setup lang="ts">
import { categoryIcons } from '../domain/categories'
import { formatMoney } from '../domain/currencies'
import type { CurrencyCode, Transaction, TransactionFilter } from '../domain/models'

defineProps<{
  transactions: readonly Transaction[]
  search: string
  filter: TransactionFilter
  currency: CurrencyCode
}>()

const emit = defineEmits<{
  'update:search': [value: string]
  'update:filter': [value: TransactionFilter]
  'delete-transaction': [id: string]
}>()

function transactionDate(value: string): string {
  const date = new Date(Number(value.slice(0, 4)), Number(value.slice(5, 7)) - 1, Number(value.slice(8, 10)))
  return new Intl.DateTimeFormat(undefined, {
    month: 'short',
    day: 'numeric',
    year: date.getFullYear() !== new Date().getFullYear() ? 'numeric' : undefined,
  }).format(date)
}

function updateSearch(event: Event): void {
  emit('update:search', (event.target as HTMLInputElement).value)
}

function updateFilter(event: Event): void {
  emit('update:filter', (event.target as HTMLSelectElement).value as TransactionFilter)
}
</script>

<template>
  <section
    class="panel"
    aria-labelledby="transactions-title"
  >
    <div class="panel-head">
      <div>
        <h2
          id="transactions-title"
          class="panel-title"
        >
          Transactions
        </h2>
        <p class="panel-subtitle">
          {{ transactions.length }} {{ transactions.length === 1 ? 'transaction' : 'transactions' }}{{ search.trim() || filter !== 'all' ? ' found' : '' }}
        </p>
      </div>
      <div class="transaction-tools">
        <label class="search-box">
          <svg
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          ><circle
            cx="10.8"
            cy="10.8"
            r="6.3"
            stroke="currentColor"
            stroke-width="1.8"
          /><path
            d="m16 16 4.3 4.3"
            stroke="currentColor"
            stroke-width="1.8"
            stroke-linecap="round"
          /></svg>
          <span class="sr-only">Search transactions</span>
          <input
            :value="search"
            type="search"
            placeholder="Search"
            autocomplete="off"
            @input="updateSearch"
          >
        </label>
        <label>
          <span class="sr-only">Filter transactions</span>
          <select
            class="filter-select"
            :value="filter"
            @change="updateFilter"
          >
            <option value="all">All types</option>
            <option value="expense">Expenses</option>
            <option value="income">Income</option>
          </select>
        </label>
      </div>
    </div>
    <div
      class="table-head"
      aria-hidden="true"
    >
      <span>Description</span><span>Category</span><span>Date</span><span class="amount-column">Amount</span><span />
    </div>
    <div
      v-if="transactions.length === 0"
      class="empty-state"
    >
      <span
        class="empty-icon"
        aria-hidden="true"
      >{{ search.trim() || filter !== 'all' ? '⌕' : '+' }}</span>
      <strong>{{ search.trim() || filter !== 'all' ? 'No matching transactions' : 'A fresh start' }}</strong>
      <p>
        {{ search.trim() || filter !== 'all' ? 'Try a different search or filter.' : 'Add your first transaction to see your money take shape.' }}
      </p>
    </div>
    <div v-else>
      <div
        v-for="transaction in transactions"
        :key="transaction.id"
        class="transaction-row"
      >
        <div class="description-cell">
          <span
            class="transaction-icon"
            aria-hidden="true"
          >{{ categoryIcons[transaction.category] }}</span>
          <span class="description-copy">
            <strong>{{ transaction.description }}</strong>
            <span>{{ transaction.type === 'income' ? 'Income' : 'Expense' }}</span>
          </span>
        </div>
        <span class="category-cell">{{ transaction.category }}</span>
        <span class="date-cell">{{ transactionDate(transaction.date) }}</span>
        <span
          class="amount-cell"
          :class="transaction.type"
        >
          {{ transaction.type === 'income' ? '+' : '−' }}{{ formatMoney(transaction.amountCents, currency) }}
        </span>
        <button
          class="delete-button"
          type="button"
          :aria-label="`Delete ${transaction.description}`"
          title="Delete transaction"
          @click="emit('delete-transaction', transaction.id)"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          ><path
            d="M4 7h16m-10 4v6m4-6v6M5.5 7l1 13h11l1-13M9 7V4h6v3"
            stroke="currentColor"
            stroke-width="1.6"
            stroke-linecap="round"
            stroke-linejoin="round"
          /></svg>
        </button>
      </div>
    </div>
  </section>
</template>