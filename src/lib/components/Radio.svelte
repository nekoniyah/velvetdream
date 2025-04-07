<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { fade } from 'svelte/transition';

	export let value: string;
	export let checked = false;
	export let label = '';
	export let error = '';
	export let disabled = false;
	export let required = false;
	export let name: string | undefined = undefined;
	export let id: string | undefined = undefined;
	export let size: 'sm' | 'md' | 'lg' = 'md';

	const dispatch = createEventDispatcher();

	function handleChange(event: Event) {
		const target = event.target as HTMLInputElement;
		checked = target.checked;
		dispatch('change', { value, checked });
	}

	function handleFocus(event: FocusEvent) {
		dispatch('focus', event);
	}

	function handleBlur(event: FocusEvent) {
		dispatch('blur', event);
	}
</script>

<div class="radio-wrapper {size}">
	<label class="radio-label" class:error>
		<input
			type="radio"
			{value}
			{checked}
			{disabled}
			{required}
			{name}
			{id}
			class="radio-input"
			on:change={handleChange}
			on:focus={handleFocus}
			on:blur={handleBlur}
			aria-invalid={!!error}
			aria-describedby={error ? `${id}-error` : undefined}
		/>
		<span class="radio-custom" />
		{#if label}
			<span class="label-text">
				{label}
				{#if required}
					<span class="required">*</span>
				{/if}
			</span>
		{/if}
	</label>
	{#if error}
		<div class="error-message" id="{id}-error" transition:fade={{ duration: 150 }}>
			{error}
		</div>
	{/if}
</div>

<style>
	.radio-wrapper {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
		font-family: 'Dosis', sans-serif;
	}

	.radio-label {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		cursor: pointer;
		position: relative;
	}

	.radio-label.error .label-text {
		color: var(--secondary-red);
	}

	.radio-input {
		position: absolute;
		opacity: 0;
		cursor: pointer;
		height: 0;
		width: 0;
	}

	.radio-custom {
		position: relative;
		display: inline-block;
		width: 1.25rem;
		height: 1.25rem;
		background-color: var(--primary);
		border: 1px solid rgba(15, 15, 15, 0.2);
		border-radius: 50%;
		transition: all 0.2s ease;
	}

	.radio-input:checked ~ .radio-custom {
		border-color: var(--secondary-gold);
	}

	.radio-input:checked ~ .radio-custom:after {
		content: '';
		position: absolute;
		display: block;
		top: 0.25rem;
		left: 0.25rem;
		width: 0.75rem;
		height: 0.75rem;
		border-radius: 50%;
		background: var(--secondary-gold);
	}

	.radio-input:focus ~ .radio-custom {
		box-shadow: 0 0 0 2px rgba(212, 175, 55, 0.2);
	}

	.radio-input:focus:not(:checked) ~ .radio-custom {
		border-color: var(--secondary-gold);
	}

	.radio-input:disabled ~ .radio-custom {
		opacity: 0.6;
		cursor: not-allowed;
		background-color: rgba(15, 15, 15, 0.05);
	}

	.radio-input:disabled ~ .label-text {
		opacity: 0.6;
		cursor: not-allowed;
	}

	.label-text {
		font-size: 0.875rem;
		color: var(--black);
	}

	.required {
		color: var(--secondary-red);
		margin-left: 0.25rem;
	}

	.error-message {
		font-size: 0.75rem;
		color: var(--secondary-red);
	}

	/* Sizes */
	.radio-wrapper.sm .radio-custom {
		width: 1rem;
		height: 1rem;
	}

	.radio-wrapper.sm .radio-input:checked ~ .radio-custom:after {
		top: 0.2rem;
		left: 0.2rem;
		width: 0.6rem;
		height: 0.6rem;
	}

	.radio-wrapper.sm .label-text {
		font-size: 0.75rem;
	}

	.radio-wrapper.lg .radio-custom {
		width: 1.5rem;
		height: 1.5rem;
	}

	.radio-wrapper.lg .radio-input:checked ~ .radio-custom:after {
		top: 0.3rem;
		left: 0.3rem;
		width: 0.9rem;
		height: 0.9rem;
	}

	.radio-wrapper.lg .label-text {
		font-size: 1rem;
	}
</style>
