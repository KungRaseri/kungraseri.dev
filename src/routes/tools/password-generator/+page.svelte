<script lang="ts">
  import { KeyRoundIcon, CopyIcon, CheckIcon, RefreshCwIcon } from 'lucide-svelte';
  
  let password = $state('');
  let length = $state(16);
  let includeUppercase = $state(true);
  let includeLowercase = $state(true);
  let includeNumbers = $state(true);
  let includeSymbols = $state(true);
  let copied = $state(false);
  
  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowercase = 'abcdefghijklmnopqrstuvwxyz';
  const numbers = '0123456789';
  const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';
  
  function generatePassword() {
    let charset = '';
    if (includeUppercase) charset += uppercase;
    if (includeLowercase) charset += lowercase;
    if (includeNumbers) charset += numbers;
    if (includeSymbols) charset += symbols;
    
    if (charset === '') {
      password = 'Please select at least one character type';
      return;
    }
    
    let newPassword = '';
    const array = new Uint32Array(length);
    crypto.getRandomValues(array);
    
    for (let i = 0; i < length; i++) {
      newPassword += charset[array[i] % charset.length];
    }
    
    password = newPassword;
    copied = false;
  }
  
  async function copyToClipboard() {
    if (!password || password === 'Please select at least one character type') return;
    
    try {
      await navigator.clipboard.writeText(password);
      copied = true;
      setTimeout(() => copied = false, 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  }
  
  // Generate initial password
  $effect(() => {
    if (!password) {
      generatePassword();
    }
  });
  
  // Strength indicator
  let strength = $derived(() => {
    if (!password || password === 'Please select at least one character type') return 0;
    
    let score = 0;
    if (password.length >= 12) score += 25;
    if (password.length >= 16) score += 25;
    if (/[A-Z]/.test(password)) score += 15;
    if (/[a-z]/.test(password)) score += 15;
    if (/[0-9]/.test(password)) score += 10;
    if (/[^A-Za-z0-9]/.test(password)) score += 10;
    
    return Math.min(score, 100);
  });
  
  let strengthLabel = $derived(() => {
    const s = strength();
    if (s >= 80) return { text: 'Strong', color: 'success' };
    if (s >= 50) return { text: 'Moderate', color: 'warning' };
    return { text: 'Weak', color: 'error' };
  });
</script>

<svelte:head>
  <title>Password Generator - Tools</title>
  <meta name="description" content="Generate secure passwords with customizable options" />
</svelte:head>

<div class="container mx-auto px-4 py-8 max-w-2xl space-y-8">
  <!-- Header -->
  <div class="space-y-4">
    <a href="/tools" class="anchor flex items-center gap-2 w-fit">
      ← Back to Tools
    </a>
    <div class="flex items-center gap-3">
      <KeyRoundIcon class="size-10 text-primary-500" />
      <h1 class="text-4xl font-bold">Password Generator</h1>
    </div>
    <p class="text-xl text-surface-700 dark:text-surface-300">
      Generate secure passwords with customizable length and character types
    </p>
  </div>

  <!-- Password Display -->
  <div class="card preset-outlined-surface-200 p-6 space-y-4">
    <div class="space-y-2">
      <label class="label">
        <span class="font-semibold">Generated Password</span>
      </label>
      <div class="flex gap-2">
        <input 
          type="text" 
          class="input flex-1 font-mono text-lg"
          value={password}
          readonly
        />
        <button 
          class="btn-icon btn-icon-lg preset-filled-primary flex items-center gap-2"
          onclick={copyToClipboard}
          aria-label="Copy password"
        >
          {#if copied}
            <CheckIcon class="size-5" />
          {:else}
            <CopyIcon class="size-5" />
          {/if}
        </button>
        <button 
          class="btn-icon btn-icon-lg preset-tonal flex items-center gap-2"
          onclick={generatePassword}
          aria-label="Generate new password"
        >
          <RefreshCwIcon class="size-5" />
        </button>
      </div>
    </div>
    
    <!-- Strength Indicator -->
    <div class="space-y-2">
      <div class="flex items-center justify-between">
        <span class="text-sm font-semibold">Password Strength</span>
        <span class="text-sm font-semibold text-{strengthLabel().color}-500">
          {strengthLabel().text}
        </span>
      </div>
      <div class="w-full bg-surface-200 dark:bg-surface-800 rounded-full h-2">
        <div 
          class="bg-{strengthLabel().color}-500 h-2 rounded-full transition-all duration-300"
          style="width: {strength()}%"
        ></div>
      </div>
    </div>
  </div>

  <!-- Options -->
  <div class="card preset-outlined-surface-200 p-6 space-y-6">
    <h2 class="text-2xl font-bold">Options</h2>
    
    <!-- Length Slider -->
    <div class="space-y-2">
      <div class="flex items-center justify-between">
        <label class="label">
          <span class="font-semibold">Password Length</span>
        </label>
        <span class="text-lg font-bold text-primary-500">{length}</span>
      </div>
      <input 
        type="range" 
        min="8" 
        max="64" 
        bind:value={length}
        class="w-full"
        oninput={generatePassword}
      />
      <div class="flex justify-between text-sm text-surface-600 dark:text-surface-400">
        <span>8</span>
        <span>64</span>
      </div>
    </div>
    
    <!-- Character Type Checkboxes -->
    <div class="space-y-3">
      <label class="flex items-center gap-3">
        <input 
          type="checkbox" 
          class="checkbox"
          bind:checked={includeUppercase}
          onchange={generatePassword}
        />
        <span>Uppercase Letters (A-Z)</span>
      </label>
      
      <label class="flex items-center gap-3">
        <input 
          type="checkbox" 
          class="checkbox"
          bind:checked={includeLowercase}
          onchange={generatePassword}
        />
        <span>Lowercase Letters (a-z)</span>
      </label>
      
      <label class="flex items-center gap-3">
        <input 
          type="checkbox" 
          class="checkbox"
          bind:checked={includeNumbers}
          onchange={generatePassword}
        />
        <span>Numbers (0-9)</span>
      </label>
      
      <label class="flex items-center gap-3">
        <input 
          type="checkbox" 
          class="checkbox"
          bind:checked={includeSymbols}
          onchange={generatePassword}
        />
        <span>Symbols (!@#$%^&*)</span>
      </label>
    </div>
  </div>

  <!-- Tips -->
  <div class="card preset-tonal-primary p-6 space-y-3">
    <h3 class="text-lg font-bold">💡 Password Security Tips</h3>
    <ul class="list-disc list-inside space-y-2 text-surface-700 dark:text-surface-300">
      <li>Use at least 12 characters for better security</li>
      <li>Include a mix of uppercase, lowercase, numbers, and symbols</li>
      <li>Never reuse passwords across different sites</li>
      <li>Consider using a password manager</li>
      <li>Change passwords regularly for important accounts</li>
    </ul>
  </div>
</div>
