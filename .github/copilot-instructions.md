# Project Instructions

## Project purpose

This repository is a personal portfolio and learning project.

The goals are to:

- Build production-quality software rather than a throwaway demo.
- Improve my software engineering knowledge.
- Practise effective AI-assisted development with GitHub Copilot.
- Keep the code understandable so I can learn from every implementation.
- Produce a polished project suitable for publishing on GitHub.

Do not optimise for generating the maximum amount of code as quickly as possible.
Optimise for maintainability, clarity, learning value, and appropriate engineering practices.

## Developer context

The developer is an experienced frontend engineer who has worked professionally since 2018.

Primary professional experience:
- Vue 3
- TypeScript
- JavaScript
- HTML
- CSS / SCSS
- Pinia
- REST APIs

The developer also works with applications backed by .NET.

Do not explain basic frontend concepts unless requested.
When introducing an unfamiliar pattern, library, architecture, or API, briefly explain why it is being used.

## Technology

For this project use:

- Vue 3
- TypeScript
- Composition API
- `<script setup lang="ts">`
- Vite
- Pinia when shared application state is justified
- Vitest for unit tests
- npm for package management

Do not introduce additional libraries unless they provide meaningful value.

Prefer browser APIs and small utilities over installing packages for trivial functionality.

## Vue conventions

- Use Vue 3 Composition API.
- Use `<script setup lang="ts">`.
- Prefer composables for reusable stateful logic.
- Keep components focused on a clear responsibility.
- Extract components when doing so improves readability or reuse.
- Do not split components simply to make files smaller.
- Keep business logic out of templates.
- Prefer computed values over duplicated derived state.
- Avoid watchers when a computed value or explicit event can solve the problem more clearly.
- Use Pinia only for genuinely shared application state.

## TypeScript conventions

- Use strict TypeScript.
- Avoid `any`.
- Prefer explicit domain types/interfaces for application data.
- Use union types where they model domain constraints better than generic strings.
- Avoid unnecessary type assertions.
- Let TypeScript infer obvious local types.
- Explicitly type public boundaries, domain models, and complex functions.

## Code quality

- Prefer simple, readable solutions over clever abstractions.
- Avoid premature abstraction.
- Avoid duplicated business logic.
- Use descriptive naming.
- Keep functions focused.
- Remove unused code.
- Do not leave commented-out implementation code.
- Do not create unnecessary wrapper functions or layers.

## Styling and UI

- Build responsive interfaces mobile-first.
- Maintain accessible semantic HTML.
- Ensure interactive controls are keyboard accessible.
- Use appropriate labels for form fields.
- Maintain sufficient contrast.
- Avoid unnecessary inline styles.
- Keep styling organised and maintainable.
- Preserve the existing visual direction unless asked to redesign it.

## Money and calculations

- Never use floating-point arithmetic carelessly for monetary calculations.
- Store monetary values using a consistent representation.
- Keep transaction calculations deterministic and testable.
- Do not silently mix currencies.
- Currency selection is display/configuration only unless actual exchange-rate conversion is explicitly implemented.

## Data

For the initial version:

- Store transactions locally in the browser.
- No backend is required.
- Keep persistence logic separated from UI components so a backend can be introduced later.
- Validate persisted data before trusting it.
- Handle empty and invalid stored data gracefully.

## Testing

Add tests for meaningful application logic, especially:

- balance calculations
- income totals
- expense totals
- monthly totals
- filtering
- transaction validation
- persistence utilities where appropriate

Do not write tests solely to increase test count.

## AI working style

Before making a significant change:

1. Inspect the existing implementation.
2. Understand the relevant files.
3. Briefly state the proposed approach.
4. Make the smallest coherent change.
5. Run appropriate checks.
6. Fix issues introduced by the change.
7. Summarise what changed.

Do not rewrite unrelated code while implementing a feature.

Do not change architecture, dependencies, or established conventions without explaining why.

When multiple reasonable solutions exist, prefer the simplest one that satisfies the current requirement.

## Learning requirement

The developer should remain able to understand and maintain the codebase.

When introducing:
- an unfamiliar design pattern,
- an important architectural decision,
- a new dependency,
- a non-obvious TypeScript technique,

briefly explain the reasoning.

Do not generate complexity purely to make the project appear more advanced.

## Git and scope

- Keep changes scoped to the requested task.
- Do not modify unrelated files.
- Do not commit secrets or environment files.
- Keep generated artifacts out of source control where appropriate.
- Use clear commit-friendly changes.
- Suggest logical commit boundaries for substantial work.

## Documentation

Keep the README accurate as the project develops.

The final README should eventually include:
- project purpose
- screenshots
- features
- technology stack
- architecture overview
- local setup
- testing instructions
- learning highlights
- future improvements