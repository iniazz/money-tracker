<script setup lang="ts">
import { computed, ref } from 'vue'
import { categories } from '../domain/categories'
import { getCurrencySymbol } from '../domain/currencies'
import type { Category, CurrencyCode, TransactionDraft, TransactionType } from '../domain/models'
import { isCategoryForType } from '../domain/transactions'

const props = defineProps<{ currency: CurrencyCode }>()
const emit = defineEmits<{
  'add-transaction': [draft: TransactionDraft]
}>()

const type = ref<TransactionType>('expense')
const category = ref<Category>('Food')
const description = ref('')
const amount = ref('')
const date = ref(todayAsDateInput())
const descriptionInput = ref<HTMLInputElement>()
const availableCategories = computed(() => categories[type.value])
const amountSymbol = computed(() => getCurrencySymbol(props.currency))

function todayAsDateInput(): string {
  const today = new Date()
  const month = String(today.getMonth() + 1).padStart(2, '0')
  const day = String(today.getDate()).padStart(2, '0')
  return `${today.getFullYear()}-${month}-${day}`
}

function selectType(nextType: TransactionType): void {
  type.value = nextType
  category.value = categories[nextType][0] ?? 'Other'
}

function selectCategory(event: Event): void {
  const selected = (event.target as HTMLSelectElement).value
  if (isCategoryForType(selected, type.value)) category.value = selected
}

function submitTransaction(): void {
  const numericAmount = Number(amount.value)
  if (!Number.isFinite(numericAmount) || numericAmount <= 0 || numericAmount > 999999999) return

  emit('add-transaction', {
    type: type.value,
    description: description.value.trim(),
    amountCents: Math.round((numericAmount + Number.EPSILON) * 100),
    category: category.value,
    date: date.value,
  })
  description.value = ''
  amount.value = ''
  date.value = todayAsDateInput()
  descriptionInput.value?.focus()
}
</script>

<template>
  <section
    class="panel form-panel"
    aria-labelledby="add-title"
  >
    <div class="panel-head">
      <div>
        <h2
          id="add-title"
          class="panel-title"
        >
          Add a transaction
        </h2>
        <p class="panel-subtitle">
          Keep your money picture up to date.
        </p>
      </div>
      <span
        class="card-icon card-icon--green"
        aria-hidden="true"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
        ><path
          d="M12 5v14M5 12h14"
          stroke="currentColor"
          stroke-width="1.8"
          stroke-linecap="round"
        /></svg>
      </span>
    </div>
    <form
      class="form-body"
      @submit.prevent="submitTransaction"
    >
      <div
        class="type-toggle"
        role="group"
        aria-label="Transaction type"
      >
        <button
          class="type-button"
          :class="{ 'is-selected': type === 'expense' }"
          type="button"
          data-type="expense"
          :aria-pressed="type === 'expense'"
          @click="selectType('expense')"
        >
          Expense
        </button>
        <button
          class="type-button"
          :class="{ 'is-selected': type === 'income' }"
          type="button"
          data-type="income"
          :aria-pressed="type === 'income'"
          @click="selectType('income')"
        >
          Income
        </button>
      </div>
      <div class="field">
        <label for="description">Description</label>
        <input
          id="description"
          ref="descriptionInput"
          v-model="description"
          name="description"
          type="text"
          placeholder="e.g. Weekly groceries"
          maxlength="70"
          required
        >
      </div>
      <div class="field">
        <label for="amount">Amount</label>
        <div class="amount-input-wrap">
          <span
            class="amount-symbol"
            aria-hidden="true"
          >{{ amountSymbol }}</span>
          <input
            id="amount"
            v-model="amount"
            class="amount-input"
            name="amount"
            type="number"
            min="0.01"
            max="999999999"
            step="0.01"
            placeholder="0.00"
            inputmode="decimal"
            required
          >
        </div>
      </div>
      <div class="form-row">
        <div class="field">
          <label for="category">Category</label>
          <select
            id="category"
            :value="category"
            name="category"
            @change="selectCategory"
          >
            <option
              v-for="option in availableCategories"
              :key="option"
              :value="option"
            >
              {{ option }}
            </option>
          </select>
        </div>
        <div class="field">
          <label for="date">Date</label>
          <input
            id="date"
            v-model="date"
            name="date"
            type="date"
            required
          >
        </div>
      </div>
      <button
        class="submit-button"
        type="submit"
      >
        <svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        ><path
          d="M12 5v14M5 12h14"
          stroke="currentColor"
          stroke-width="1.9"
          stroke-linecap="round"
        /></svg>
        Add transaction
      </button>
    </form>
  </section>
</template>