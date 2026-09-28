<script setup lang="ts">
import type { CurrencyCode, CurrencyConfiguration } from '../domain/models'

defineProps<{
  todayLabel: string
  currency: CurrencyCode
  currencies: readonly CurrencyConfiguration[]
}>()

const emit = defineEmits<{
  'update:currency': [value: CurrencyCode]
}>()
</script>

<template>
  <header class="topbar">
    <div>
      <p class="eyebrow">
        {{ todayLabel }}
      </p>
      <h1>Your money, at a glance</h1>
    </div>
    <div class="topbar-right">
      <span class="privacy-pill">
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        ><rect
          x="5"
          y="10"
          width="14"
          height="11"
          rx="2"
          stroke="currentColor"
          stroke-width="1.7"
        /><path
          d="M8 10V7a4 4 0 0 1 8 0v3"
          stroke="currentColor"
          stroke-width="1.7"
          stroke-linecap="round"
        /></svg>
        Saved on this device
      </span>
      <label class="currency-wrap">
        <span class="sr-only">Currency</span>
        <select
          class="currency-select"
          :value="currency"
          aria-label="Display currency"
          @change="emit('update:currency', ($event.target as HTMLSelectElement).value as CurrencyCode)"
        >
          <option
            v-for="option in currencies"
            :key="option.code"
            :value="option.code"
          >
            {{ option.label }}
          </option>
        </select>
      </label>
    </div>
  </header>
</template>