<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { fade } from 'svelte/transition';

	export let value = '';
	export let options: { value: string; label: string }[] = [];
	export let placeholder = 'Select an option';
	export let label = '';
	export let error = '';
	export let disabled = false;
	export let required = false;
	export let name: string | undefined = undefined;
	export let id: string | undefined = undefined;
	export let size: 'sm' | 'md' | 'lg' = 'md';

	const dispatch = createEventDispatcher();

	function handleChange(event: Event) {
		const target = event.target as HTMLSelectElement;
		value = target.value;
		dispatch('change', { value });
	}

	function handleFocus(event: FocusEvent) {
		dispatch('focus', event);
	}

	function handleBlur(event: FocusEvent) {
		dispatch('blur', event);
	}
</script>

<div class="select-wrapper {size}">
	{#if label}
		<label for={id} class="label">
			{label}
			{#if required}
				<span class="required">*</span>
			{/if}
		</label>
	{/if}
	<div class="select-container">
		<select
			{value}
			{disabled}
			{required}
			{name}
			{id}
			class="select"
			class:error
			on:change={handleChange}
			on:focus={handleFocus}
			on:blur={handleBlur}
			aria-invalid={!!error}
			aria-describedby={error ? `${id}-error` : undefined}
		>
			<option value="" disabled selected>{placeholder}</option>
			{#each options as option}
				<option value={option.value}>{option.label}</option>
			{/each}
		</select>
		<div class="select-icon">
			<svg
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
			>
				<polyline points="6 9 12 15 18 9" />
			</svg>
		</div>
		{#if error}
			<div class="error-message" id="{id}-error" transition:fade={{ duration: 150 }}>
				{error}
			</div>
		{/if}
	</div>
</div>

<style>
	.select-wrapper {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		width: 100%;
		font-family: 'Dosis', sans-serif;
	}

	.label {
		font-size: 0.875rem;
		font-weight: 500;
		color: var(--black);
	}

	.required {
		color: var(--secondary-red);
		margin-left: 0.25rem;
	}

	.select-container {
		position: relative;
		width: 100%;
	}

	.select {
		width: 100%;
		border: 1px solid rgba(15, 15, 15, 0.2);
		border-radius: 0.375rem;
		background-color: var(--primary);
		color: var(--black);
		transition: all 0.2s ease;
		font-family: 'Dosis', sans-serif;
		appearance: none;
		-webkit-appearance: none;
		-moz-appearance: none;
		padding-right: 2.5rem;
	}

	.select:focus {
		outline: none;
		border-color: var(--secondary-gold);
		box-shadow: 0 0 0 2px rgba(212, 175, 55, 0.2);
	}

	.select:disabled {
		opacity: 0.6;
		cursor: not-allowed;
		background-color: rgba(15, 15, 15, 0.05);
	}

	.select.error {
		border-color: var(--secondary-red);
	}

	.select.error:focus {
		box-shadow: 0 0 0 2px rgba(164, 22, 35, 0.2);
	}

	.select-icon {
		position: absolute;
		right: 0.75rem;
		top: 50%;
		transform: translateY(-50%);
		pointer-events: none;
		color: var(--black);
		opacity: 0.5;
	}

	.error-message {
		position: absolute;
		top: 100%;
		left: 0;
		margin-top: 0.25rem;
		font-size: 0.75rem;
		color: var(--secondary-red);
	}

	/* Sizes */
	.select-wrapper.sm .select {
		padding: 0.375rem 0.75rem;
		font-size: 0.875rem;
	}

	.select-wrapper.md .select {
		padding: 0.5rem 1rem;
		font-size: 1rem;
	}

	.select-wrapper.lg .select {
		padding: 0.75rem 1.25rem;
		font-size: 1.125rem;
	}
</style>
