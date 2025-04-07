<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { fade } from 'svelte/transition';

	export let variant: 'primary' | 'secondary' | 'outline' | 'ghost' | 'link' = 'primary';
	export let size: 'sm' | 'md' | 'lg' = 'md';
	export let disabled = false;
	export let loading = false;
	export let fullWidth = false;
	export let type: 'button' | 'submit' | 'reset' = 'button';

	const dispatch = createEventDispatcher();

	function handleClick(event: MouseEvent) {
		if (!disabled && !loading) {
			dispatch('click', event);
		}
	}
</script>

<button
	{type}
	class="btn {variant} {size} {fullWidth ? 'full-width' : ''}"
	{disabled}
	on:click={handleClick}
	aria-disabled={disabled || loading}
>
	{#if loading}
		<span class="spinner" transition:fade={{ duration: 150 }} />
	{/if}
	<span class="content" class:loading>
		<slot />
	</span>
</button>

<style>
	.btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		border-radius: 0.375rem;
		font-weight: 500;
		transition: all 0.2s ease;
		cursor: pointer;
		border: none;
		outline: none;
		position: relative;
		overflow: hidden;
		font-family: 'Dosis', sans-serif;
	}

	.btn:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}

	.btn.full-width {
		width: 100%;
	}

	/* Sizes */
	.btn.sm {
		padding: 0.5rem 0.75rem;
		font-size: 0.875rem;
	}

	.btn.md {
		padding: 0.625rem 1rem;
		font-size: 1rem;
	}

	.btn.lg {
		padding: 0.75rem 1.5rem;
		font-size: 1.125rem;
	}

	/* Variants */
	.btn.primary {
		background: var(--secondary-gold);
		color: var(--black);
	}

	.btn.primary:hover:not(:disabled) {
		background: var(--secondary-gold-light);
	}

	.btn.secondary {
		background: var(--secondary-red);
		color: var(--primary);
	}

	.btn.secondary:hover:not(:disabled) {
		background: var(--secondary-red-light);
	}

	.btn.outline {
		background: transparent;
		border: 1px solid var(--secondary-gold);
		color: var(--black);
	}

	.btn.outline:hover:not(:disabled) {
		background: rgba(212, 175, 55, 0.1);
		border-color: var(--secondary-gold-light);
	}

	.btn.ghost {
		background: transparent;
		color: var(--black);
	}

	.btn.ghost:hover:not(:disabled) {
		background: rgba(15, 15, 15, 0.05);
	}

	.btn.link {
		background: transparent;
		color: var(--secondary-gold);
		padding: 0;
	}

	.btn.link:hover:not(:disabled) {
		color: var(--secondary-gold-light);
		text-decoration: underline;
	}

	/* Loading state */
	.spinner {
		width: 1em;
		height: 1em;
		border: 2px solid currentColor;
		border-right-color: transparent;
		border-radius: 50%;
		animation: spin 0.75s linear infinite;
	}

	.content.loading {
		opacity: 0.7;
	}

	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}
</style>
