<script setup lang="ts">
import AppHeader from './components/AppHeader.vue'
import AppSidebar from './components/AppSidebar.vue'
import SummaryCards from './components/SummaryCards.vue'
import ToastMessage from './components/ToastMessage.vue'
import TransactionForm from './components/TransactionForm.vue'
import TransactionList from './components/TransactionList.vue'
import { currencies } from './domain/currencies'
import type { CurrencyCode } from './domain/models'
import { useMoneyTracker } from './composables/useMoneyTracker'

const {
  currency,
  deleteTransaction,
  filter,
  monthLabel,
  search,
  summary,
  toastMessage,
  todayLabel,
  updateCurrency,
  visibleTransactions,
  addTransaction,
} = useMoneyTracker()
function changeCurrency(value: CurrencyCode): void {
  updateCurrency(value)
}
</script>

<template>
  <div class="app">
    <AppSidebar />

    <main class="main">
      <AppHeader
        :today-label="todayLabel"
        :currency="currency"
        :currencies="currencies"
        @update:currency="changeCurrency"
      />

      <section aria-labelledby="overview-title">
        <div class="welcome-row">
          <div>
            <h2 id="overview-title">
              Your overview
            </h2>
            <p>{{ monthLabel }}</p>
          </div>
        </div>
        <SummaryCards
          :summary="summary"
          :currency="currency"
        />
      </section>

      <div class="content-grid">
        <TransactionList
          v-model:search="search"
          v-model:filter="filter"
          :transactions="visibleTransactions"
          :currency="currency"
          @delete-transaction="deleteTransaction"
        />
        <TransactionForm
          :currency="currency"
          @add-transaction="addTransaction"
        />
      </div>
    </main>

    <ToastMessage :message="toastMessage" />
  </div>
</template>