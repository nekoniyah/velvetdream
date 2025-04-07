<script lang="ts">
	import { fade, scale } from 'svelte/transition';

	export let title: string;
	export let content: string;
	let isHovered = false;
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	class="hover-card"
	on:mouseenter={() => (isHovered = true)}
	on:mouseleave={() => (isHovered = false)}
>
	<div class="trigger">
		<slot name="trigger">
			{title}
		</slot>
	</div>

	{#if isHovered}
		<div class="content" transition:fade|scale={{ duration: 200, start: 0.95 }}>
			<slot name="content">
				{content}
			</slot>
		</div>
	{/if}
</div>

<style>
	.hover-card {
		position: relative;
		display: inline-block;
	}

	.content {
		position: absolute;
		top: 100%;
		left: 50%;
		transform: translateX(-50%);
		background: white;
		padding: 1rem;
		border-radius: 0.5rem;
		box-shadow:
			0 4px 6px -1px rgb(0 0 0 / 0.1),
			0 2px 4px -2px rgb(0 0 0 / 0.1);
		min-width: 200px;
		z-index: 50;
		margin-top: 0.5rem;
	}

	.trigger {
		cursor: pointer;
	}
</style>
