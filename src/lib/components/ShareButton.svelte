<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { fade, scale } from 'svelte/transition';
	import { clickOutside } from '$lib/actions/clickOutside';

	export let url: string;
	export let title: string;

	let isOpen = false;
	const dispatch = createEventDispatcher();

	const shareOptions = [
		{
			name: 'Copy Link',
			icon: 'link',
			action: async () => {
				try {
					await navigator.clipboard.writeText(url);
					dispatch('share', { type: 'copy', success: true });
				} catch (error) {
					dispatch('share', { type: 'copy', success: false, error });
				}
			}
		},
		{
			name: 'Twitter',
			icon: 'twitter',
			action: () => {
				const text = encodeURIComponent(title);
				const shareUrl = encodeURIComponent(url);
				window.open(`https://twitter.com/intent/tweet?text=${text}&url=${shareUrl}`, '_blank');
				dispatch('share', { type: 'twitter' });
			}
		},
		{
			name: 'Facebook',
			icon: 'facebook',
			action: () => {
				const shareUrl = encodeURIComponent(url);
				window.open(`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`, '_blank');
				dispatch('share', { type: 'facebook' });
			}
		}
	];

	function handleClick() {
		isOpen = !isOpen;
	}

	function handleClickOutside() {
		isOpen = false;
	}
</script>

<div class="share-button" use:clickOutside={handleClickOutside}>
	<button class="trigger" on:click={handleClick} aria-expanded={isOpen} aria-label="Share">
		<svg
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
		>
			<circle cx="18" cy="5" r="3" />
			<circle cx="6" cy="12" r="3" />
			<circle cx="18" cy="19" r="3" />
			<line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
			<line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
		</svg>
	</button>

	{#if isOpen}
		<div class="menu" transition:fade|scale={{ duration: 200 }}>
			{#each shareOptions as option}
				<button class="option" on:click={option.action}>
					<svg
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						{#if option.icon === 'link'}
							<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
							<path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
						{:else if option.icon === 'twitter'}
							<path
								d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"
							/>
						{:else if option.icon === 'facebook'}
							<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
						{/if}
					</svg>
					{option.name}
				</button>
			{/each}
		</div>
	{/if}
</div>

<style>
	.share-button {
		position: relative;
		display: inline-block;
	}

	.trigger {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		padding: 0.5rem;
		border: none;
		background: transparent;
		color: var(--black);
		cursor: pointer;
		border-radius: 9999px;
		transition: all 0.2s ease;
		font-family: 'Dosis', sans-serif;
	}

	.trigger:hover {
		background: rgba(15, 15, 15, 0.05);
		color: var(--secondary-gold);
	}

	.trigger svg {
		width: 1.25rem;
		height: 1.25rem;
	}

	.menu {
		position: absolute;
		top: 100%;
		right: 0;
		margin-top: 0.5rem;
		background: var(--primary);
		border-radius: 0.5rem;
		box-shadow:
			0 4px 6px -1px rgb(0 0 0 / 0.1),
			0 2px 4px -2px rgb(0 0 0 / 0.1);
		min-width: 200px;
		z-index: 50;
		border: 1px solid rgba(15, 15, 15, 0.1);
	}

	.option {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		width: 100%;
		padding: 0.75rem 1rem;
		border: none;
		background: transparent;
		color: var(--black);
		cursor: pointer;
		transition: all 0.2s ease;
		font-family: 'Dosis', sans-serif;
	}

	.option:hover {
		background: rgba(212, 175, 55, 0.1);
		color: var(--secondary-gold);
	}

	.option svg {
		width: 1.25rem;
		height: 1.25rem;
	}
</style>
