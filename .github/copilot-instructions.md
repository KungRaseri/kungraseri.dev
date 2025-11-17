# GitHub Copilot Instructions for KungRaseri.dev

## Project Overview
This is a personal portfolio and content website built with:
- **SvelteKit** - Meta-framework
- **Skeleton v4** - Design system and component library
- **Tailwind CSS v4** - Utility-first CSS framework
- **TypeScript** - Type-safe development

## Core Principles

### 1. Embrace Web Standards
- Use semantic HTML elements (`<nav>`, `<main>`, `<article>`, etc.)
- Leverage native browser APIs whenever possible
- Prefer standard attributes over custom abstractions

### 2. Utility-First Styling
- Use Tailwind CSS utilities for all styling
- Apply Skeleton preset classes for consistent theming
- Avoid inline styles except for dynamic CSS variables

### 3. Component Composition
- Break complex UIs into smaller, reusable components
- Use Svelte's composition patterns (slots, snippets)
- Keep components focused and single-purpose

## Skeleton v4 Design System

### Color System
Skeleton uses a semantic color palette with the following keys:
- `primary`, `secondary`, `tertiary` - Brand colors
- `success`, `warning`, `error` - Semantic colors
- `surface` - Background and UI surfaces (50-900 shades)

Colors are accessed via Tailwind utilities:
```svelte
<div class="bg-primary-500 text-primary-contrast-500">
<div class="bg-surface-100 dark:bg-surface-900">
<div class="text-surface-900 dark:text-surface-100">
```

### Dark Mode
Always implement dark mode variants using Tailwind's dark variant:
```svelte
<div class="bg-surface-100 dark:bg-surface-900 text-surface-900 dark:text-surface-100">
```

### Preset Classes
Skeleton provides reusable preset styles for common UI patterns:

**Filled Presets:**
```svelte
<!-- Neutral -->
<button class="preset-filled">Button</button>

<!-- With specific color and shades -->
<button class="preset-filled-primary-500">Button</button>
<button class="preset-filled-secondary-500">Button</button>
```

**Tonal Presets:**
```svelte
<!-- Neutral -->
<button class="preset-tonal">Button</button>

<!-- With color -->
<button class="preset-tonal-primary">Button</button>
<button class="preset-tonal-surface">Button</button>
```

**Outlined Presets:**
```svelte
<button class="preset-outlined">Button</button>
<button class="preset-outlined-primary-500">Button</button>
```

### Button Patterns
```svelte
<!-- Standard button -->
<button class="btn preset-filled-primary">Click Me</button>

<!-- Icon button -->
<button class="btn-icon hover:preset-tonal">
  <IconComponent class="size-5" />
</button>

<!-- Icon button with size -->
<button class="btn-icon btn-icon-lg preset-filled">
  <IconComponent class="size-6" />
</button>
```

### Chips and Badges
```svelte
<!-- Chip -->
<button class="chip preset-filled">
  <span>Label</span>
  <XIcon class="size-4" />
</button>

<!-- Chip icon -->
<button class="chip-icon preset-tonal">
  <CheckIcon class="size-4" />
</button>

<!-- Badge -->
<span class="badge preset-filled-primary">99+</span>
```

### Card Pattern
```svelte
<!-- Basic card -->
<div class="card p-4 preset-tonal-surface">
  <h3>Card Title</h3>
  <p>Card content...</p>
</div>

<!-- With specific background -->
<div class="card preset-outlined-surface-200-800 bg-surface-50-950 p-4">
  Content
</div>
```

## Skeleton v4 Components

### Component Import Pattern
```svelte
<script lang="ts">
  import { ComponentName } from '@skeletonlabs/skeleton-svelte';
</script>
```

### Composed Component Pattern
All Skeleton components use granular composition:
```svelte
<Avatar class="size-16">
  <Avatar.Image src="/avatar.jpg" alt="User" />
  <Avatar.Fallback>UN</Avatar.Fallback>
</Avatar>
```

### Common Components

**AppBar:**
```svelte
<AppBar>
  <AppBar.Toolbar class="grid-cols-[auto_1fr_auto]">
    <AppBar.Lead>
      <a href="/">Logo</a>
    </AppBar.Lead>
    <AppBar.Headline>
      <h1>Title</h1>
    </AppBar.Headline>
    <AppBar.Trail>
      <button class="btn-icon hover:preset-tonal">
        <MenuIcon />
      </button>
    </AppBar.Trail>
  </AppBar.Toolbar>
</AppBar>
```

**Navigation (Custom Implementation):**
For this project, use standard HTML with Tailwind classes instead of the Skeleton Navigation component:
```svelte
<nav class="w-full bg-surface-100 dark:bg-surface-900 border-b border-surface-300 dark:border-surface-700">
  <div class="container mx-auto px-4 h-16 flex items-center justify-between">
    <a href="/">Logo</a>
    <div class="flex gap-2">
      <a href="/projects" class="preset-tonal-surface px-4 py-2 rounded-lg">
        Projects
      </a>
    </div>
  </div>
</nav>
```

**Dialog:**
```svelte
<script>
  import { Dialog, Portal } from '@skeletonlabs/skeleton-svelte';
</script>

<Dialog>
  <Dialog.Trigger class="btn preset-filled">Open</Dialog.Trigger>
  <Portal>
    <Dialog.Backdrop class="fixed inset-0 z-50 bg-surface-50-950/50" />
    <Dialog.Positioner class="fixed inset-0 z-50 flex justify-center items-center">
      <Dialog.Content class="card bg-surface-100-900 w-md p-4 space-y-2 shadow-xl">
        <Dialog.Title class="text-2xl font-bold">Title</Dialog.Title>
        <Dialog.Description>Description text</Dialog.Description>
        <Dialog.CloseTrigger class="btn preset-tonal">Close</Dialog.CloseTrigger>
      </Dialog.Content>
    </Dialog.Positioner>
  </Portal>
</Dialog>
```

**Tabs:**
```svelte
<Tabs defaultValue="tab1">
  <Tabs.List>
    <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
    <Tabs.Trigger value="tab2">Tab 2</Tabs.Trigger>
    <Tabs.Indicator />
  </Tabs.List>
  <Tabs.Content value="tab1">Content 1</Tabs.Content>
  <Tabs.Content value="tab2">Content 2</Tabs.Content>
</Tabs>
```

## Typography

Use Tailwind typography utilities with Skeleton's semantic color system:
```svelte
<!-- Headings -->
<h1 class="text-4xl font-bold text-primary-500">Title</h1>
<h2 class="text-3xl font-bold">Subtitle</h2>

<!-- Body text with dark mode -->
<p class="text-surface-700 dark:text-surface-300">
  Body text that adapts to theme
</p>

<!-- Anchor links -->
<a href="/" class="anchor">Link</a>
```

## Forms and Inputs

Always pair form inputs with proper labels and error handling:
```svelte
<label class="label">
  <span>Email</span>
  <input 
    type="email" 
    class="input"
    placeholder="user@example.com"
    bind:value={email}
  />
</label>
```

## State Management

Use Svelte 5 runes for reactive state:
```svelte
<script lang="ts">
  let count = $state(0);
  let doubled = $derived(count * 2);
  
  $effect(() => {
    console.log('Count changed:', count);
  });
</script>
```

## Accessibility

Always include:
- Proper ARIA labels
- Keyboard navigation support
- Focus indicators
- Semantic HTML structure

```svelte
<button 
  aria-label="Close dialog"
  class="btn-icon hover:preset-tonal"
>
  <XIcon />
</button>
```

## File Organization

```
src/
├── lib/
│   ├── components/     # Reusable components
│   ├── stores/         # Svelte stores
│   ├── types/          # TypeScript types
│   └── utils/          # Utility functions
├── routes/             # SvelteKit routes
│   ├── +layout.svelte  # Root layout
│   ├── +page.svelte    # Homepage
│   └── [route]/        # Feature routes
└── app.css             # Global styles
```

## Common Patterns

### Layout with Header and Footer
```svelte
<div class="flex flex-col h-full">
  <Navigation />
  <main class="flex-1 overflow-y-auto">
    <slot />
  </main>
  <footer class="w-full bg-surface-100 dark:bg-surface-900 border-t border-surface-300 dark:border-surface-700">
    <!-- Footer content -->
  </footer>
</div>
```

### Responsive Grid
```svelte
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <!-- Cards -->
</div>
```

### Hover States
Use Tailwind hover variants with Skeleton presets:
```svelte
<a href="/" class="preset-outlined hover:preset-tonal-primary transition-all duration-200">
  Hover Me
</a>
```

## Don'ts

❌ **Don't** use old Skeleton v2/v3 syntax like `variant-filled-primary`
❌ **Don't** use classes like `bg-surface-100-900` (these don't exist in Tailwind v4)
❌ **Don't** use `@apply` directive in `<style>` tags
❌ **Don't** import components from `@skeletonlabs/skeleton` (use `/skeleton-svelte`)
❌ **Don't** use the old `card` utility class without proper presets

## Do's

✅ **Do** use preset classes: `preset-filled`, `preset-tonal`, `preset-outlined`
✅ **Do** implement dark mode with `dark:` variants
✅ **Do** use semantic HTML elements
✅ **Do** compose components with sub-components
✅ **Do** use Svelte 5 syntax (runes, snippets)
✅ **Do** leverage Tailwind utilities for spacing, sizing, layout

## Testing Changes

Always verify:
1. Light and dark mode rendering
2. Responsive behavior on mobile/tablet/desktop
3. Keyboard navigation works
4. ARIA labels are present
5. No console errors or warnings

## Resources

- [Skeleton Docs](https://www.skeleton.dev/docs/svelte)
- [Tailwind CSS v4 Docs](https://tailwindcss.com/docs)
- [Svelte 5 Docs](https://svelte.dev/docs/svelte/overview)
- [SvelteKit Docs](https://svelte.dev/docs/kit)