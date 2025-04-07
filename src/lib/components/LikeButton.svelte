<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { spring } from 'svelte/motion';
	import { fade, scale } from 'svelte/transition';

	export let count = 0;
	export let liked = false;
	export let disabled = false;

	const dispatch = createEventDispatcher();
	const scaleSpring = spring(1, {
		stiffness: 0.2,
		damping: 0.4
	});

	function handleClick() {
		if (!disabled) {
			liked = !liked;
			count += liked ? 1 : -1;
			scaleSpring.set(1.3);
			setTimeout(() => scaleSpring.set(1), 150);
			dispatch('change', { liked, count });
		}
	}
</script>

<button
	class="like-button"
	class:liked
	class:disabled
	on:click={handleClick}
	aria-pressed={liked}
	aria-label={liked ? 'Unlike' : 'Like'}
>
	<div class="heart-container" style="transform: scale({$scaleSpring})">
		<svg
			class="heart"
			viewBox="0 0 24 24"
			fill={liked ? 'currentColor' : 'none'}
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
		>
			<path
				d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
			/>
		</svg>
	</div>
	{#if count > 0}
		<span class="count" transition:fade|scale={{ duration: 200 }}>
			{count}
		</span>
	{/if}
</button>

<style>
	.like-button {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.5rem;
		border: none;
		background: transparent;
		color: var(--black);
		cursor: pointer;
		border-radius: 9999px;
		transition: all 0.2s ease;
		font-family: 'Dosis', sans-serif;
	}

	.like-button:not(.disabled):hover {
		background: rgba(15, 15, 15, 0.05);
		color: var(--secondary-red);
	}

	.like-button.liked {
		color: var(--secondary-red);
	}

	.like-button.disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.heart-container {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.heart {
		width: 1.5rem;
		height: 1.5rem;
		transition: all 0.2s ease;
	}

	.count {
		font-size: 0.875rem;
		font-weight: 500;
		min-width: 1.5rem;
		text-align: center;
	}
</style>
