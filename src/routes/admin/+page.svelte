<script lang="ts">
	import AdminDashboard from '$lib/components/AdminDashboard.svelte';
</script>

<div class="admin-page">
	<h1>Admin Dashboard</h1>
	<AdminDashboard />
</div>

<style>
	.admin-page {
		padding: 2rem;
		max-width: 1200px;
		margin: 0 auto;
	}

	h1 {
		margin-bottom: 2rem;
	}
</style>
