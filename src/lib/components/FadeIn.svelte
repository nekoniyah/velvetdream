<script lang="ts">
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	export let delay = 0;
	export let duration = 400;
	let visible = false;

	onMount(() => {
		setTimeout(() => {
			visible = true;
		}, delay);
	});
</script>

{#if visible}
	<div transition:fade={{ duration }}>
		<slot />
	</div>
{/if}

<style>
	div {
		width: 100%;
		height: 100%;
	}
</style>
