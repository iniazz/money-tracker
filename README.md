# Mint — Money Tracker

Mint is a local-first personal finance tracker built with Vue 3 and TypeScript. It provides a focused overview of recorded income and expenses, with browser persistence and a responsive layout for desktop and mobile screens.

## Screenshot

_Screenshot coming soon._

## Live demo

Not publicly deployed yet. A live demo URL will be added here when deployment is available.

## Current features

- Add income and expense transactions with a description, amount, category, and date.
- View total balance across all transactions.
- View current-month income and spending totals with transaction counts.
- Search transactions by description or category.
- Filter transactions by type: all, income, or expense.
- Sort visible transactions newest first.
- Delete transactions.
- Choose a display currency from USD, SGD, EUR, GBP, AUD, CAD, INR, JPY, and MYR.
- Receive feedback for successful actions and browser storage errors.
- Validate transaction data before it is accepted or loaded from storage.

## Technology stack

- Vue 3 with the Composition API and `<script setup lang="ts">`
- TypeScript with strict compiler settings
- Vite
- Vitest
- ESLint with Vue and TypeScript support
- Browser `localStorage` for client-side persistence

## Architecture

```text
.
├── src/
│   ├── components/       Vue UI components
│   ├── composables/      Application state and interaction logic
│   ├── domain/           Transaction models, validation, calculations, categories, currencies
│   ├── services/         Persistence boundary for browser storage
│   ├── App.vue           Application composition root
│   ├── main.ts           Vue application entry point
│   └── styles.css        Global responsive styles
├── tests/
│   ├── persistence.spec.ts
│   └── transactions.spec.ts
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

The domain layer contains the rules for transaction validation, summary calculations, and filtering. `useMoneyTracker` coordinates reactive UI state and persistence, while components focus on rendering and user interaction. Keeping storage behind `services/persistence.ts` leaves room for a future backend without coupling the UI to `localStorage`.

## Money representation

Monetary values are represented internally as integer cents. For example, `$100.50` is stored in application state as `10050`. Summary calculations therefore use integer arithmetic instead of relying on floating-point values for financial operations.

The current persistence format retains the existing decimal `amount` field for browser-storage compatibility. Values are converted between that format and integer cents at the persistence boundary, and older stored records are validated before being loaded.

## Local development

### Prerequisites

- Node.js `22.12+` or a supported Node.js `24+` / `26+` release
- npm

### Setup

```bash
npm install
npm run dev
```

Vite will print the local development URL in the terminal.

## Available commands

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server. |
| `npm run build` | Type-check the project and create a production build. |
| `npm run typecheck` | Run `vue-tsc` without emitting files. |
| `npm run lint` | Run ESLint across the repository. |
| `npm test` | Run the Vitest test suite once. |

## Testing

The test suite currently covers:

- Balance, income, and expense calculations for the current month.
- Transaction search, type filtering, and date ordering.
- Transaction validation.
- Loading and validating stored data.
- Conversion between internal integer cents and the persisted decimal amount format.

Run the tests with:

```bash
npm test
```

## Responsive and mobile design

The interface adapts across desktop, tablet, and mobile widths. The desktop sidebar becomes a compact header on smaller screens, summary cards reflow into a mobile grid, the transaction form moves above the list, and less essential table columns are hidden on narrow screens. Form controls include labels and keyboard-accessible native inputs, selects, and buttons.

## Local browser persistence

Transactions and the selected currency are saved in the browser's `localStorage` on the current device. No account or server is required. Invalid records are ignored during loading, malformed stored data is handled gracefully, and the interface reports when storage is unavailable or a save fails.

## Current limitations

- Data is available only in the current browser profile and device.
- There is no backend, authentication, cloud sync, or multi-device access.
- Transactions can be added and deleted, but not edited after creation.
- There is no import, export, recurring transaction, budget, chart, or reporting workflow.
- Currency selection changes display formatting; exchange-rate conversion is not implemented.
- There is currently one overview workspace rather than multiple accounts or ledgers.

## Future improvement ideas

- Add transaction editing and undo for accidental deletion.
- Add import/export, such as JSON or CSV, with clear validation and error reporting.
- Add recurring transactions, budgets, and category-level spending insights.
- Add optional backend sync and authentication while preserving the local-first experience.
- Add broader component and accessibility tests, including responsive interaction coverage.
- Deploy a public demo and include a product screenshot in this README.

## Learning and engineering focus

This project focuses on building a maintainable frontend with clear boundaries between UI, application state, domain rules, and persistence. Key engineering areas include strict TypeScript modeling, deterministic money calculations with integer cents, runtime validation for untrusted browser data, responsive accessible UI, and focused unit tests for business logic.
