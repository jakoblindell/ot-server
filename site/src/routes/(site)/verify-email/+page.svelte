<script lang="ts">
	let { data } = $props();
</script>

<svelte:head>
	<title>Confirm email · {data.serverName}</title>
</svelte:head>

<main class="wrap page">
	<section class="card">
		<div class="card-head"><h1>Confirm email</h1></div>
		<div class="card-body">
			{#if data.ok}
				<p class="notice" role="status">Thank you: your email address is confirmed. <a href="/account">Back to your account</a></p>
			{:else}
				<p class="notice error">This link is not valid any more. Send a new one from <a href="/account">your account</a>.</p>
			{/if}
		</div>
	</section>
</main>

<style>
	.page {
		width: 100%;
		max-width: 600px;
		padding-top: 56px;
		padding-bottom: 72px;
	}

	p {
		margin: 0;
	}
</style>
