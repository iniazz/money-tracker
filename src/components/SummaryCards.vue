<script setup lang="ts">
import { formatMoney } from '../domain/currencies'
import type { CurrencyCode, TransactionSummary } from '../domain/models'

defineProps<{
  summary: TransactionSummary
  currency: CurrencyCode
}>()
</script>

<template>
  <div
    class="summary-grid"
    aria-live="polite"
  >
    <article class="summary-card balance">
      <div class="card-top">
        <span class="card-label">Total balance</span>
        <span
          class="card-icon"
          aria-hidden="true"
        ><svg
          width="17"
          height="17"
          viewBox="0 0 24 24"
          fill="none"
        ><path
          d="M3.5 8.5h17v11h-17zM3.5 8.5l2-4h13l2 4M15 13h3"
          stroke="currentColor"
          stroke-width="1.7"
          stroke-linecap="round"
          stroke-linejoin="round"
        /><circle
          cx="14"
          cy="13.5"
          r=".6"
          fill="currentColor"
        /></svg></span>
      </div>
      <div class="card-value">
        {{ formatMoney(summary.balanceCents, currency) }}
      </div>
      <div class="card-foot">
        {{ summary.balanceCents >= 0 ? 'Across all your transactions' : 'Your spending is ahead of recorded income' }}
      </div>
    </article>
    <article class="summary-card">
      <div class="card-top">
        <span class="card-label">Income this month</span>
        <span
          class="card-icon"
          aria-hidden="true"
        ><svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
        ><path
          d="M12 19V5m0 0L6.5 10.5M12 5l5.5 5.5"
          stroke="currentColor"
          stroke-width="1.8"
          stroke-linecap="round"
          stroke-linejoin="round"
        /></svg></span>
      </div>
      <div class="card-value">
        {{ formatMoney(summary.incomeCents, currency) }}
      </div>
      <div class="card-foot">
        {{ summary.incomeCount ? `${summary.incomeCount} income ${summary.incomeCount === 1 ? 'transaction' : 'transactions'}` : 'No income recorded yet' }}
      </div>
    </article>
    <article class="summary-card">
      <div class="card-top">
        <span class="card-label">Spending this month</span>
        <span
          class="card-icon"
          aria-hidden="true"
        ><svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
        ><path
          d="M12 5v14m0 0 5.5-5.5M12 19l-5.5-5.5"
          stroke="currentColor"
          stroke-width="1.8"
          stroke-linecap="round"
          stroke-linejoin="round"
        /></svg></span>
      </div>
      <div class="card-value">
        {{ formatMoney(summary.expenseCents, currency) }}
      </div>
      <div class="card-foot">
        {{ summary.expenseCount ? `${summary.expenseCount} expense ${summary.expenseCount === 1 ? 'transaction' : 'transactions'}` : 'No spending recorded yet' }}
      </div>
    </article>
  </div>
</template>