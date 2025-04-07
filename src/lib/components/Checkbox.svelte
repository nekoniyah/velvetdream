<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { fade } from 'svelte/transition';

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
		dispatch('change', { checked });
	}

	function handleFocus(event: FocusEvent) {
		dispatch('focus', event);
	}

	function handleBlur(event: FocusEvent) {
		dispatch('blur', event);
	}
</script>

<div class="checkbox-wrapper {size}">
	<label class="checkbox-label" class:error>
		<input
			type="checkbox"
			{checked}
			{disabled}
			{required}
			{name}
			{id}
			class="checkbox-input"
			on:change={handleChange}
			on:focus={handleFocus}
			on:blur={handleBlur}
			aria-invalid={!!error}
			aria-describedby={error ? `${id}-error` : undefined}
		/>
		<span class="checkbox-custom" />
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
	.checkbox-wrapper {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
		font-family: 'Dosis', sans-serif;
	}

	.checkbox-label {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		cursor: pointer;
		position: relative;
	}

	.checkbox-label.error .label-text {
		color: var(--secondary-red);
	}

	.checkbox-input {
		position: absolute;
		opacity: 0;
		cursor: pointer;
		height: 0;
		width: 0;
	}

	.checkbox-custom {
		position: relative;
		display: inline-block;
		width: 1.25rem;
		height: 1.25rem;
		background-color: var(--primary);
		border: 1px solid rgba(15, 15, 15, 0.2);
		border-radius: 0.25rem;
		transition: all 0.2s ease;
	}

	.checkbox-input:checked ~ .checkbox-custom {
		background-color: var(--secondary-gold);
		border-color: var(--secondary-gold);
	}

	.checkbox-input:focus ~ .checkbox-custom {
		box-shadow: 0 0 0 2px rgba(212, 175, 55, 0.2);
	}

	.checkbox-input:focus:not(:checked) ~ .checkbox-custom {
		border-color: var(--secondary-gold);
	}

	.checkbox-input:disabled ~ .checkbox-custom {
		opacity: 0.6;
		cursor: not-allowed;
		background-color: rgba(15, 15, 15, 0.05);
	}

	.checkbox-input:disabled ~ .label-text {
		opacity: 0.6;
		cursor: not-allowed;
	}

	.checkbox-custom:after {
		content: '';
		position: absolute;
		display: none;
		left: 0.4rem;
		top: 0.2rem;
		width: 0.4rem;
		height: 0.7rem;
		border: solid var(--black);
		border-width: 0 2px 2px 0;
		transform: rotate(45deg);
	}

	.checkbox-input:checked ~ .checkbox-custom:after {
		display: block;
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
	.checkbox-wrapper.sm .checkbox-custom {
		width: 1rem;
		height: 1rem;
	}

	.checkbox-wrapper.sm .checkbox-custom:after {
		left: 0.3rem;
		top: 0.1rem;
		width: 0.3rem;
		height: 0.6rem;
	}

	.checkbox-wrapper.sm .label-text {
		font-size: 0.75rem;
	}

	.checkbox-wrapper.lg .checkbox-custom {
		width: 1.5rem;
		height: 1.5rem;
	}

	.checkbox-wrapper.lg .checkbox-custom:after {
		left: 0.5rem;
		top: 0.25rem;
		width: 0.5rem;
		height: 0.8rem;
	}

	.checkbox-wrapper.lg .label-text {
		font-size: 1rem;
	}
</style>
