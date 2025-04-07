<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { fade } from 'svelte/transition';

	export let value = '';
	export let placeholder = '';
	export let label = '';
	export let error = '';
	export let disabled = false;
	export let required = false;
	export let name: string | undefined = undefined;
	export let id: string | undefined = undefined;
	export let rows = 4;
	export let resize: 'none' | 'vertical' | 'horizontal' | 'both' = 'vertical';

	const dispatch = createEventDispatcher();

	function handleInput(event: Event) {
		const target = event.target as HTMLTextAreaElement;
		value = target.value;
		dispatch('input', { value });
	}

	function handleFocus(event: FocusEvent) {
		dispatch('focus', event);
	}

	function handleBlur(event: FocusEvent) {
		dispatch('blur', event);
	}
</script>

<div class="textarea-wrapper">
	{#if label}
		<label for={id} class="label">
			{label}
			{#if required}
				<span class="required">*</span>
			{/if}
		</label>
	{/if}
	<div class="textarea-container">
		<textarea
			{value}
			{placeholder}
			{disabled}
			{required}
			{name}
			{id}
			{rows}
			class="textarea"
			class:error
			style="resize: {resize};"
			on:input={handleInput}
			on:focus={handleFocus}
			on:blur={handleBlur}
			aria-invalid={!!error}
			aria-describedby={error ? `${id}-error` : undefined}
		/>
		{#if error}
			<div class="error-message" id="{id}-error" transition:fade={{ duration: 150 }}>
				{error}
			</div>
		{/if}
	</div>
</div>

<style>
	.textarea-wrapper {
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

	.textarea-container {
		position: relative;
		width: 100%;
	}

	.textarea {
		width: 100%;
		border: 1px solid rgba(15, 15, 15, 0.2);
		border-radius: 0.375rem;
		background-color: var(--primary);
		color: var(--black);
		transition: all 0.2s ease;
		font-family: 'Dosis', sans-serif;
		padding: 0.75rem 1rem;
		font-size: 1rem;
		line-height: 1.5;
	}

	.textarea:focus {
		outline: none;
		border-color: var(--secondary-gold);
		box-shadow: 0 0 0 2px rgba(212, 175, 55, 0.2);
	}

	.textarea:disabled {
		opacity: 0.6;
		cursor: not-allowed;
		background-color: rgba(15, 15, 15, 0.05);
	}

	.textarea.error {
		border-color: var(--secondary-red);
	}

	.textarea.error:focus {
		box-shadow: 0 0 0 2px rgba(164, 22, 35, 0.2);
	}

	.error-message {
		position: absolute;
		top: 100%;
		left: 0;
		margin-top: 0.25rem;
		font-size: 0.75rem;
		color: var(--secondary-red);
	}
</style>
