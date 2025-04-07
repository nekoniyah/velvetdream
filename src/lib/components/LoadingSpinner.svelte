<script lang="ts">
	export let size = '1rem';
	export let color = 'currentColor';
</script>

<div class="spinner" style="width: {size}; height: {size}; border-color: {color};">
	<slot>
		<span class="sr-only">Loading...</span>
	</slot>
</div>

<style>
	.spinner {
		display: inline-block;
		border: 2px solid transparent;
		border-top-color: currentColor;
		border-radius: 50%;
		animation: spin 1s linear infinite;
	}

	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}

	.sr-only {
		position: absolute;
		width: 1px;
		height: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		white-space: nowrap;
		border: 0;
	}
</style>
