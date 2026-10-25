<script lang="ts">
	import Footer from '$lib/components/Footer.svelte';
	import Header from '$lib/components/Header.svelte';

	let { data, children } = $props();
</script>

<div class="page">
	<Header
		serverName={data.serverName}
		online={data.status.online}
		playersOnline={data.status.playersOnline}
		loggedIn={!!data.account}
	/>
	<div class="content">
		{@render children()}
	</div>
	<Footer serverName={data.serverName} theme={data.theme} />
</div>

<style>
	.page {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
	}

	.content {
		flex: 1;
		display: flex;
		flex-direction: column;
	}
</style>
